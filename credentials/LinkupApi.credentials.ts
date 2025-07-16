import {
    ICredentialType,
    INodeProperties,
} from 'n8n-workflow';

export class LinkupApi implements ICredentialType {
    name = 'linkupApi';
    displayName = 'LINKUP API';
    documentationUrl = 'https://docs.linkupapi.com/';
    properties: INodeProperties[] = [
        {
            displayName: 'API Key',
            name: 'apiKey',
            type: 'string',
            typeOptions: {
                password: true,
            },
            default: '',
            required: true,
            description: 'Your LINKUP API key',
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
            typeOptions: {
                password: true,
            },
            default: '',
            required: true,
            description: 'Your LinkedIn password',
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
}