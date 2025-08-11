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

	properties: INodeProperties[] = [
		{
			displayName: 'LINKUP API Key',
			name: 'apiKey',
			type: 'string',
			default: '',
			required: true,
			description:
				'Your LINKUP API key from [linkupapi.com](https://linkupapi.com) dashboard',
			typeOptions: {
				password: true,
			},
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
			typeOptions: {
				password: true,
			},
		},
		{
			displayName: 'Login Token (Optional)',
			name: 'loginToken',
			type: 'string',
			default: '',
			description: 'LinkedIn authentication token if you have one',
			typeOptions: {
				password: true,
			},
		},
		{
			displayName: 'Country Code',
			name: 'country',
			type: 'string',
			default: 'FR',
			placeholder: 'FR, US, UK, DE, ES, IT, CA, AU, etc.',
			description:
				'Country code for proxy selection (e.g., FR for France, US for United States)',
		},
	];

	// This credential is currently not used by any node directly
	// but the HTTP Request node can use it to make requests.
	// The credential is also testable due to the `test` property below
	authenticate: IAuthenticateGeneric = {
		type: 'generic',
		properties: {
			headers: {
				'x-api-key': '={{ $credentials.apiKey }}',
				'Content-Type': 'application/json',
			},
		},
	};

	// The block below tells how this credential can be tested
	test: ICredentialTestRequest = {
		request: {
			url: 'https://api.linkupapi.com/v1/auth/login',
			method: 'POST',
			body: {
				email: '={{ $credentials.linkedinEmail }}',
				password: '={{ $credentials.linkedinPassword }}',
				country: '={{ $credentials.country || "FR" }}',
			},
		},
	};
}
