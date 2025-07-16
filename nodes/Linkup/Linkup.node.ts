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
        requestDefaults: {
            baseURL: 'https://api.linkupapi.com/v1',
            headers: {
                'Content-Type': 'application/json',
            },
        },
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
                description: 'Whether to use custom credentials instead of stored ones',
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

                    if (useCustomCredentials) {
                        email = this.getNodeParameter('customEmail', i) as string;
                        password = this.getNodeParameter('customPassword', i) as string;
                        country = this.getNodeParameter('customCountry', i) as string;
                    } else {
                        email = credentials.linkedinEmail as string;
                        password = credentials.linkedinPassword as string;
                        country = credentials.country as string;
                    }

                    // Validation
                    if (!email || !password) {
                        throw new NodeOperationError(
                            this.getNode(),
                            'Email and password are required for login'
                        );
                    }

                    const requestOptions: IHttpRequestOptions = {
                        method: 'POST',
                        url: '/auth/login',
                        headers: {
                            'x-api-key': credentials.apiKey,
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

                    // Validation
                    if (!email || !verificationCode) {
                        throw new NodeOperationError(
                            this.getNode(),
                            'Email and verification code are required'
                        );
                    }

                    const requestOptions: IHttpRequestOptions = {
                        method: 'POST',
                        url: '/auth/verify-code',
                        headers: {
                            'x-api-key': credentials.apiKey,
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
                            nodeVersion: this.description.version,
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