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
            // API Key direct dans le node
            {
                displayName: 'LINKUP API Key',
                name: 'apiKey',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['login', 'verifyCode'],
                    },
                },
                default: '',
                required: true,
                placeholder: 'Enter your LINKUP API key',
                description: 'Your LINKUP API key from linkupapi.com dashboard',
            },
            // Login operation fields
            {
                displayName: 'LinkedIn Email',
                name: 'linkedinEmail',
                type: 'string',
                displayOptions: {
                    show: {
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
                name: 'linkedinPassword',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['login'],
                    },
                },
                default: '',
                required: true,
                placeholder: 'Your LinkedIn password',
                description: 'Your LinkedIn password',
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
            {
                displayName: 'Country',
                name: 'country',
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
                        operation: ['login', 'verifyCode'],
                    },
                },
                default: 'FR',
                description: 'Country code for proxy selection',
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

        for (let i = 0; i < items.length; i++) {
            const operation = this.getNodeParameter('operation', i) as string;
            const additionalFields = this.getNodeParameter('additionalFields', i) as any;

            try {
                let response: any;

                if (operation === 'login') {
                    const apiKey = this.getNodeParameter('apiKey', i) as string;
                    const email = this.getNodeParameter('linkedinEmail', i) as string;
                    const password = this.getNodeParameter('linkedinPassword', i) as string;
                    const country = this.getNodeParameter('country', i) as string;

                    // Validation
                    if (!apiKey || !email || !password) {
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
                    const apiKey = this.getNodeParameter('apiKey', i) as string;
                    const email = this.getNodeParameter('verifyEmail', i) as string;
                    const verificationCode = this.getNodeParameter('verificationCode', i) as string;
                    const country = this.getNodeParameter('country', i) as string;

                    // Validation
                    if (!apiKey || !email || !verificationCode) {
                        throw new NodeOperationError(
                            this.getNode(),
                            'API key, email and verification code are required'
                        );
                    }

                    const requestOptions: IHttpRequestOptions = {
                        method: 'POST',
                        url: 'https://api.linkupapi.com/v1/auth/verify',
                        headers: {
                            'x-api-key': apiKey,
                            'Content-Type': 'application/json',
                        },
                        body: {
                            email,
                            code: verificationCode,
                            country,
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
                            nodeVersion: '1.0.4',
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