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
                required: true,
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
            // Login operation fields
            {
                displayName: 'Use Custom Credentials',
                name: 'useCustomCredentials',
                type: 'boolean',
                displayOptions: {
                    show: {
                        operation: ['login'],
                    },
                },
                default: false,
                description: 'Use custom credentials instead of stored ones (workaround for password issues)',
            },
            {
                displayName: 'API Key',
                name: 'customApiKey',
                type: 'string',
                typeOptions: {
                    password: true,
                },
                displayOptions: {
                    show: {
                        operation: ['login'],
                        useCustomCredentials: [true],
                    },
                },
                default: '',
                placeholder: 'Your LINKUP API key',
                description: 'Your LINKUP API key',
            },
            {
                displayName: 'Email',
                name: 'customEmail',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['login'],
                        useCustomCredentials: [true],
                    },
                },
                default: '',
                placeholder: 'your@email.com',
                description: 'LinkedIn email address',
            },
            {
                displayName: 'Password',
                name: 'customPassword',
                type: 'string',
                typeOptions: {
                    password: true,
                },
                displayOptions: {
                    show: {
                        operation: ['login'],
                        useCustomCredentials: [true],
                    },
                },
                default: '',
                description: 'LinkedIn password',
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
                        operation: ['login'],
                        useCustomCredentials: [true],
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

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: INodeExecutionData[] = [];

        const credentials = await this.getCredentials('linkupApi');

        for (let i = 0; i < items.length; i++) {
            const operation = this.getNodeParameter('operation', i) as string;
            const additionalFields = this.getNodeParameter('additionalFields', i) as any;

            try {
                let response: any;

                if (operation === 'login') {
                    const useCustomCredentials = this.getNodeParameter('useCustomCredentials', i) as boolean;
                    
                    let email: string;
                    let password: string;
                    let country: string;
                    let apiKey: string;

                    if (useCustomCredentials) {
                        apiKey = this.getNodeParameter('customApiKey', i) as string;
                        email = this.getNodeParameter('customEmail', i) as string;
                        password = this.getNodeParameter('customPassword', i) as string;
                        country = this.getNodeParameter('customCountry', i) as string;
                    } else {
                        apiKey = credentials.apiKey as string;
                        email = credentials.linkedinEmail as string;
                        password = credentials.linkedinPassword as string;
                        country = credentials.country as string;
                        
                        // Gérer le problème des valeurs BLANK de n8n
                        if ((password && password.includes('__n8n_BLANK_VALUE_')) || 
                            (apiKey && apiKey.includes('__n8n_BLANK_VALUE_'))) {
                            throw new NodeOperationError(
                                this.getNode(),
                                'Credentials not saved correctly due to n8n bug. Please use "Use Custom Credentials" option and enter your API key and password directly in the node.'
                            );
                        }
                    }

                    // Validation
                    if (!email || !password || !apiKey) {
                        throw new NodeOperationError(
                            this.getNode(),
                            'API key, email and password are required for login'
                        );
                    }

                    const requestOptions: IHttpRequestOptions = {
                        method: 'POST',
                        url: 'https://api.linkupapi.com/v1/auth/login',
                        headers: {
                            'x-api-key': apiKey,
                            'Content-Type': 'application/json',
                        },
                        body: {
                            email,
                            password,
                            country,
                        },
                        timeout: additionalFields.timeout || 30000,
                    };

                    response = await this.helpers.httpRequest(requestOptions);

                } else if (operation === 'verifyCode') {
                    const email = this.getNodeParameter('verifyEmail', i) as string;
                    const verificationCode = this.getNodeParameter('verificationCode', i) as string;
                    
                    // Pour verify-code, on utilise toujours l'API key des credentials
                    let apiKey = credentials.apiKey as string;
                    
                    // Vérifier si l'API key est corrompue
                    if (apiKey && apiKey.includes('__n8n_BLANK_VALUE_')) {
                        throw new NodeOperationError(
                            this.getNode(),
                            'API key not saved correctly. Please recreate your LINKUP credentials or use a Login node with "Use Custom Credentials" first.'
                        );
                    }

                    // Validation
                    if (!email || !verificationCode || !apiKey) {
                        throw new NodeOperationError(
                            this.getNode(),
                            'Email, verification code and API key are required'
                        );
                    }

                    const requestOptions: IHttpRequestOptions = {
                        method: 'POST',
                        url: 'https://api.linkupapi.com/v1/auth/verify-code',
                        headers: {
                            'x-api-key': apiKey,
                            'Content-Type': 'application/json',
                        },
                        body: {
                            email,
                            verification_code: verificationCode,
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
                            nodeVersion: '1.0.0',
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
                        'Invalid API key or credentials'
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