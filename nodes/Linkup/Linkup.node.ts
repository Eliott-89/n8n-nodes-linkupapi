import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
    IHttpRequestOptions,
    NodeOperationError,
    NodeConnectionType,
} from 'n8n-workflow';

export class Linkup implements INodeType {
    description: INodeTypeDescription = {
        displayName: 'LINKUP',
        name: 'linkup',
        icon: 'file:linkup.svg',
        group: ['transform'],
        version: 1,
        description: 'Interact with LINKUP API for LinkedIn automation',
        defaults: {
            name: 'LINKUP',
            color: '#0077b5',
        },
        inputs: [NodeConnectionType.Main],
        outputs: [NodeConnectionType.Main],
        credentials: [
            {
                name: 'linkupApi',
                required: false,
                displayOptions: {
                    show: {
                        useCustomCredentials: [false],
                    },
                },
            },
        ],
        properties: [
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                options: [
                    {
                        name: 'Login',
                        value: 'login',
                        description: 'Authenticate with LinkedIn credentials',
                        action: 'Login to LinkedIn',
                    },
                    {
                        name: 'Verify Code',
                        value: 'verifyCode',
                        description: 'Verify security code if required',
                        action: 'Verify security code',
                    },
                ],
                default: 'login',
            },
            {
                displayName: 'Use Custom Credentials',
                name: 'useCustomCredentials',
                type: 'boolean',
                default: false,
                description: 'Use custom credentials instead of saved credentials (fallback option)',
            },
            // Credentials personnalisées (fallback)
            {
                displayName: 'LINKUP API Key',
                name: 'customApiKey',
                type: 'string',
                displayOptions: {
                    show: {
                        useCustomCredentials: [true],
                    },
                },
                default: '',
                required: true,
                placeholder: 'Enter your LINKUP API key',
                description: 'Your LINKUP API key from linkupapi.com dashboard',
            },
            {
                displayName: 'LinkedIn Email',
                name: 'customLinkedinEmail',
                type: 'string',
                displayOptions: {
                    show: {
                        useCustomCredentials: [true],
                        operation: ['login'],
                    },
                },
                default: '',
                required: true,
                placeholder: 'your@email.com',
                description: 'Your LinkedIn email address',
            },
            {
                displayName: 'LinkedIn Password',
                name: 'customLinkedinPassword',
                type: 'string',
                displayOptions: {
                    show: {
                        useCustomCredentials: [true],
                        operation: ['login'],
                    },
                },
                default: '',
                required: true,
                placeholder: 'Your LinkedIn password',
                description: 'Your LinkedIn password',
            },
            {
                displayName: 'Login Token (Optional)',
                name: 'customLoginToken',
                type: 'string',
                displayOptions: {
                    show: {
                        useCustomCredentials: [true],
                        operation: ['login'],
                    },
                },
                default: '',
                placeholder: 'LinkedIn authentication token',
                description: 'LinkedIn authentication token if you have one',
            },
            {
                displayName: 'Country',
                name: 'customCountry',
                type: 'options',
                options: [
                    {
                        name: 'France',
                        value: 'FR',
                    },
                    {
                        name: 'United States',
                        value: 'US',
                    },
                    {
                        name: 'United Kingdom',
                        value: 'UK',
                    },
                ],
                displayOptions: {
                    show: {
                        useCustomCredentials: [true],
                        operation: ['login', 'verifyCode'],
                    },
                },
                default: 'FR',
                description: 'Country code for proxy selection',
            },
            // Verify code operation fields
            {
                displayName: 'Email',
                name: 'verifyEmail',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['verifyCode'],
                    },
                },
                default: '',
                required: true,
                placeholder: 'your@email.com',
                description: 'Email address used for login',
            },
            {
                displayName: 'Verification Code',
                name: 'verificationCode',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['verifyCode'],
                    },
                },
                default: '',
                required: true,
                placeholder: '123456',
                description: 'Security code received by email',
            },
            // Additional options
            {
                displayName: 'Additional Fields',
                name: 'additionalFields',
                type: 'collection',
                placeholder: 'Add Field',
                default: {},
                options: [
                    {
                        displayName: 'Timeout',
                        name: 'timeout',
                        type: 'number',
                        default: 30000,
                        description: 'Request timeout in milliseconds',
                    },
                    {
                        displayName: 'Retry Count',
                        name: 'retryCount',
                        type: 'number',
                        default: 3,
                        description: 'Number of retry attempts',
                    },
                ],
            },
        ],
    };

    // Fonction pour détecter et gérer les valeurs BLANK
    private sanitizeCredentialValue(value: string): string | null {
        if (!value || value.includes('__n8n_BLANK_VALUE_')) {
            return null;
        }
        return value;
    }

    // Fonction pour obtenir les credentials avec fallback
    private async getCredentialsWithFallback(
        executeFunctions: IExecuteFunctions,
        itemIndex: number,
        operation: string
    ): Promise<{
        apiKey: string;
        email: string;
        password: string;
        country: string;
        loginToken?: string;
    }> {
        const useCustomCredentials = executeFunctions.getNodeParameter('useCustomCredentials', itemIndex) as boolean;

        if (useCustomCredentials) {
            // Utiliser les credentials personnalisées
            const apiKey = executeFunctions.getNodeParameter('customApiKey', itemIndex) as string;
            const email = operation === 'login' 
                ? executeFunctions.getNodeParameter('customLinkedinEmail', itemIndex) as string
                : executeFunctions.getNodeParameter('verifyEmail', itemIndex) as string;
            const password = operation === 'login' 
                ? executeFunctions.getNodeParameter('customLinkedinPassword', itemIndex) as string
                : '';
            const country = executeFunctions.getNodeParameter('customCountry', itemIndex) as string;
            const loginToken = operation === 'login' 
                ? executeFunctions.getNodeParameter('customLoginToken', itemIndex) as string
                : '';

            return { apiKey, email, password, country, loginToken };
        } else {
            // Utiliser les credentials sauvegardées
            const credentials = await executeFunctions.getCredentials('linkupApi');
            
            const apiKey = this.sanitizeCredentialValue(credentials.apiKey as string);
            const email = operation === 'login' 
                ? this.sanitizeCredentialValue(credentials.linkedinEmail as string)
                : executeFunctions.getNodeParameter('verifyEmail', itemIndex) as string;
            const password = operation === 'login' 
                ? this.sanitizeCredentialValue(credentials.linkedinPassword as string)
                : '';
            const country = this.sanitizeCredentialValue(credentials.country as string);
            const loginToken = this.sanitizeCredentialValue(credentials.loginToken as string);

            // Vérifier si les credentials sont corrompues
            if (!apiKey || (operation === 'login' && (!email || !password))) {
                throw new NodeOperationError(
                    executeFunctions.getNode(),
                    'Credentials are corrupted or incomplete. Please use "Use Custom Credentials" option or recreate your saved credentials.'
                );
            }

            return { 
                apiKey: apiKey!, 
                email: email!, 
                password: password!, 
                country: country || 'FR',
                loginToken: loginToken || ''
            };
        }
    }

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: INodeExecutionData[] = [];

        for (let i = 0; i < items.length; i++) {
            const operation = this.getNodeParameter('operation', i) as string;
            const additionalFields = this.getNodeParameter('additionalFields', i) as any;

            try {
                let response: any;

                if (operation === 'login') {
                    const creds = await this.getCredentialsWithFallback(this, i, 'login');

                    const requestOptions: IHttpRequestOptions = {
                        method: 'POST',
                        url: 'https://api.linkupapi.com/v1/auth/login',
                        headers: {
                            'x-api-key': creds.apiKey,
                            'Content-Type': 'application/json',
                        },
                        body: {
                            email: creds.email,
                            password: creds.password,
                            country: creds.country,
                            ...(creds.loginToken && { token: creds.loginToken }),
                        },
                        timeout: additionalFields.timeout || 30000,
                    };

                    response = await this.helpers.httpRequest(requestOptions);

                } else if (operation === 'verifyCode') {
                    const creds = await this.getCredentialsWithFallback(this, i, 'verifyCode');
                    const verificationCode = this.getNodeParameter('verificationCode', i) as string;

                    const requestOptions: IHttpRequestOptions = {
                        method: 'POST',
                        url: 'https://api.linkupapi.com/v1/auth/verify',
                        headers: {
                            'x-api-key': creds.apiKey,
                            'Content-Type': 'application/json',
                        },
                        body: {
                            email: creds.email,
                            code: verificationCode,
                            country: creds.country,
                        },
                        timeout: additionalFields.timeout || 30000,
                    };

                    response = await this.helpers.httpRequest(requestOptions);
                }

                // Ajouter des métadonnées utiles
                const executionData: INodeExecutionData = {
                    json: {
                        ...response,
                        _meta: {
                            operation,
                            timestamp: new Date().toISOString(),
                            nodeVersion: '1.1.0',
                        },
                    },
                    pairedItem: { item: i },
                };

                returnData.push(executionData);

            } catch (error: any) {
                if (this.continueOnFail()) {
                    returnData.push({
                        json: {
                            error: error.message || 'Unknown error',
                            operation,
                            timestamp: new Date().toISOString(),
                        },
                        pairedItem: { item: i },
                    });
                    continue;
                }

                // Améliorer les messages d'erreur
                if (error.response?.status === 401) {
                    throw new NodeOperationError(
                        this.getNode(),
                        'Invalid API key or credentials. Please check your LINKUP API key and LinkedIn credentials.'
                    );
                } else if (error.response?.status === 429) {
                    throw new NodeOperationError(
                        this.getNode(),
                        'Rate limit exceeded. Please try again later.'
                    );
                } else if (error.response?.status === 400) {
                    throw new NodeOperationError(
                        this.getNode(),
                        `Bad request: ${error.response?.data?.message || error.message || 'Unknown error'}`
                    );
                } else {
                    throw new NodeOperationError(this.getNode(), error.message || 'Unknown error');
                }
            }
        }

        return [returnData];
    }
}