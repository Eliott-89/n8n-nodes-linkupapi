import {
    IAuthenticateGeneric,
    ICredentialTestRequest,
    ICredentialType,
    INodeProperties,
} from 'n8n-workflow';

export class LinkupApi implements ICredentialType {
    name = 'linkupApi';
    displayName = 'LINKUP API';
    documentationUrl = 'https://docs.linkupapi.com/';
    icon = 'file:linkup.svg';
    
    properties: INodeProperties[] = [
        {
            displayName: 'LINKUP API Key',
            name: 'apiKey',
            type: 'string',
            default: '',
            required: true,
            description: 'Your LINKUP API key from linkupapi.com dashboard',
        },
        {
            displayName: 'LinkedIn Email',
            name: 'linkedinEmail',
            type: 'string',
            default: '',
            required: true,
            description: 'Your LinkedIn email address',
        },
        {
            displayName: 'LinkedIn Password',
            name: 'linkedinPassword',
            type: 'string',
            default: '',
            required: true,
            description: 'Your LinkedIn password',
        },
        {
            displayName: 'Login Token (Optional)',
            name: 'loginToken',
            type: 'string',
            default: '',
            description: 'LinkedIn authentication token if you have one',
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
            default: 'FR',
            description: 'Country code for proxy selection',
        },
    ];

    // Test de connexion
    test: ICredentialTestRequest = {
        request: {
            baseURL: 'https://api.linkupapi.com/v1',
            url: '/auth/login',
            method: 'POST',
            headers: {
                'x-api-key': '={{$credentials.apiKey}}',
                'Content-Type': 'application/json',
            },
            body: {
                email: '={{$credentials.linkedinEmail}}',
                password: '={{$credentials.linkedinPassword}}',
                country: '={{$credentials.country}}',
            },
        },
        rules: [
            {
                type: 'responseSuccessBody',
                properties: {
                    key: 'status',
                    value: 'success',
                },
            },
        ],
    };

    // Authentification générique
    authenticate: IAuthenticateGeneric = {
        type: 'generic',
        properties: {
            headers: {
                'x-api-key': '={{$credentials.apiKey}}',
            },
        },
    };
}