import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
    IHttpRequestOptions,
    NodeOperationError,
    NodeConnectionType,
} from 'n8n-workflow';

// Centralisation des constantes
const LINKUP_API_BASE_URL = 'https://api.linkupapi.com/v1';
const NODE_VERSION = '1.1.0';

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
                        description: 'Authentifier votre compte LinkedIn via Linkup',
                        action: 'Login to LinkedIn',
                    },
                    {
                        name: 'Verify Code',
                        value: 'verifyCode',
                        description: 'Vérifier le code de sécurité reçu par email',
                        action: 'Verify security code',
                    },
                    {
                        name: 'Get My Profile',
                        value: 'getMyProfile',
                        description: 'Récupérer le profil LinkedIn lié au login_token',
                        action: 'Get my LinkedIn profile',
                    },
                    {
                        name: 'Extract Profile Information',
                        value: 'extractProfileInfo',
                        description: 'Extraire les infos d\'un profil LinkedIn public',
                        action: 'Extract LinkedIn profile info',
                    },
                    {
                        name: 'Search Profile',
                        value: 'searchProfile',
                        description: 'Rechercher des profils LinkedIn',
                        action: 'Search LinkedIn profiles',
                    },
                    {
                        name: 'Search Companies',
                        value: 'searchCompanies',
                        description: 'Rechercher des entreprises LinkedIn',
                        action: 'Search LinkedIn companies',
                    },
                    {
                        name: 'Get Company Information',
                        value: 'getCompanyInfo',
                        description: 'Obtenir les infos d\'une entreprise LinkedIn',
                        action: 'Get LinkedIn company info',
                    },
                    {
                        name: 'Send Connection Request',
                        value: 'sendConnectionRequest',
                        description: 'Envoyer une invitation LinkedIn',
                        action: 'Send LinkedIn connection request',
                    },
                ],
                default: 'login',
            },
            {
                displayName: 'Utiliser des credentials personnalisées',
                name: 'useCustomCredentials',
                type: 'boolean',
                default: false,
                description: 'Utiliser des credentials personnalisées au lieu de celles sauvegardées (option de secours)',
            },
            // Credentials personnalisées (fallback)
            {
                displayName: 'LINKUP API Key',
                name: 'customApiKey',
                type: 'string',
                typeOptions: { password: true },
                displayOptions: {
                    show: {
                        useCustomCredentials: [true],
                    },
                },
                default: '',
                required: true,
                placeholder: 'Clé API LINKUP',
                description: 'Votre clé API LINKUP depuis le dashboard linkupapi.com',
            },
            {
                displayName: 'Email LinkedIn',
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
                placeholder: 'votre@email.com',
                description: 'Adresse email de votre compte LinkedIn',
            },
            {
                displayName: 'Mot de passe LinkedIn',
                name: 'customLinkedinPassword',
                type: 'string',
                typeOptions: { password: true },
                displayOptions: {
                    show: {
                        useCustomCredentials: [true],
                        operation: ['login'],
                    },
                },
                default: '',
                required: true,
                placeholder: 'Mot de passe LinkedIn',
                description: 'Mot de passe de votre compte LinkedIn',
            },
            {
                displayName: 'Login Token (optionnel)',
                name: 'customLoginToken',
                type: 'string',
                typeOptions: { password: true },
                displayOptions: {
                    show: {
                        useCustomCredentials: [true],
                        operation: ['login'],
                    },
                },
                default: '',
                placeholder: 'Token d\'authentification LinkedIn',
                description: 'Token d\'authentification LinkedIn si vous en avez un',
            },
            {
                displayName: 'Pays',
                name: 'customCountry',
                type: 'options',
                options: [
                    {
                        name: 'France',
                        value: 'FR',
                    },
                    {
                        name: 'États-Unis',
                        value: 'US',
                    },
                    {
                        name: 'Royaume-Uni',
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
                description: 'Code pays pour la sélection du proxy',
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
                placeholder: 'votre@email.com',
                description: 'Adresse email utilisée pour la connexion',
            },
            {
                displayName: 'Code de vérification',
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
                description: 'Code de sécurité reçu par email',
            },
            // Champs pour Get My Profile
            {
                displayName: 'Login Token',
                name: 'getMyProfileLoginToken',
                type: 'string',
                typeOptions: { password: true },
                displayOptions: {
                    show: {
                        operation: ['getMyProfile'],
                        useCustomCredentials: [true],
                    },
                },
                default: '',
                required: true,
                placeholder: 'Token d\'authentification LinkedIn',
                description: 'Token d\'authentification LinkedIn obtenu après login/verify',
            },
            {
                displayName: 'Pays',
                name: 'getMyProfileCountry',
                type: 'options',
                options: [
                    { name: 'France', value: 'FR' },
                    { name: 'États-Unis', value: 'US' },
                    { name: 'Royaume-Uni', value: 'UK' },
                ],
                displayOptions: {
                    show: {
                        operation: ['getMyProfile'],
                        useCustomCredentials: [true],
                    },
                },
                default: 'FR',
                description: 'Code pays pour la sélection du proxy',
            },
            // Champs pour Extract Profile Information
            {
                displayName: 'URL du profil LinkedIn',
                name: 'linkedinUrl',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['extractProfileInfo'],
                    },
                },
                default: '',
                required: true,
                placeholder: 'https://www.linkedin.com/in/xxx',
                description: 'URL du profil LinkedIn à extraire',
            },
            {
                displayName: 'Login Token',
                name: 'extractProfileLoginToken',
                type: 'string',
                typeOptions: { password: true },
                displayOptions: {
                    show: {
                        operation: ['extractProfileInfo'],
                        useCustomCredentials: [true],
                    },
                },
                default: '',
                required: true,
                placeholder: 'Token d\'authentification LinkedIn',
                description: 'Token d\'authentification LinkedIn obtenu après login/verify',
            },
            {
                displayName: 'Pays',
                name: 'extractProfileCountry',
                type: 'options',
                options: [
                    { name: 'France', value: 'FR' },
                    { name: 'États-Unis', value: 'US' },
                    { name: 'Royaume-Uni', value: 'UK' },
                ],
                displayOptions: {
                    show: {
                        operation: ['extractProfileInfo'],
                        useCustomCredentials: [true],
                    },
                },
                default: 'FR',
                description: 'Code pays pour la sélection du proxy',
            },
            // Champs pour Search Profile (nouvelle structure)
            {
                displayName: 'Login Token',
                name: 'searchProfileLoginToken',
                type: 'string',
                typeOptions: { password: true },
                displayOptions: {
                    show: {
                        operation: ['searchProfile'],
                        useCustomCredentials: [true],
                    },
                },
                default: '',
                required: true,
                placeholder: 'Token d\'authentification LinkedIn',
                description: 'Token d\'authentification LinkedIn obtenu après login/verify',
            },
            {
                displayName: 'Pays',
                name: 'searchProfileCountry',
                type: 'options',
                options: [
                    { name: 'France', value: 'FR' },
                    { name: 'États-Unis', value: 'US' },
                    { name: 'Royaume-Uni', value: 'UK' },
                ],
                displayOptions: {
                    show: {
                        operation: ['searchProfile'],
                    },
                },
                default: 'FR',
                description: 'Code pays pour la sélection du proxy',
            },
            {
                displayName: 'Options avancées',
                name: 'searchProfileOptions',
                type: 'collection',
                placeholder: 'Ajouter une option',
                displayOptions: {
                    show: {
                        operation: ['searchProfile'],
                    },
                },
                default: {},
                options: [
                    {
                        displayName: 'Company URL(s)',
                        name: 'company_url',
                        type: 'string',
                        placeholder: 'google;microsoft;apple',
                        description: 'URL(s) ou identifiant(s) d\'entreprise LinkedIn (séparés par ;)',
                        default: '',
                    },
                    {
                        displayName: 'Location(s)',
                        name: 'location',
                        type: 'string',
                        placeholder: 'Paris;London;New York',
                        description: 'Lieu(x) géographique(s) (séparés par ;)',
                        default: '',
                    },
                    {
                        displayName: 'School URL(s)',
                        name: 'school_url',
                        type: 'string',
                        placeholder: 'harvard;stanford;mit',
                        description: 'URL(s) ou identifiant(s) d\'école LinkedIn (séparés par ;)',
                        default: '',
                    },
                    {
                        displayName: 'Network',
                        name: 'network',
                        type: 'string',
                        placeholder: 'F;S;O',
                        description: 'Niveau de connexion (F=1er, S=2e, O=hors réseau, séparés par ;)',
                        default: '',
                    },
                    {
                        displayName: 'Keyword',
                        name: 'keyword',
                        type: 'string',
                        description: 'Mot-clé de recherche',
                        default: '',
                    },
                    {
                        displayName: 'Nombre de résultats',
                        name: 'total_results',
                        type: 'number',
                        default: 10,
                        description: 'Nombre de profils à récupérer',
                    },
                    {
                        displayName: 'Page de début',
                        name: 'start_page',
                        type: 'number',
                        default: 1,
                        description: 'Première page à récupérer (pagination)',
                    },
                    {
                        displayName: 'Page de fin',
                        name: 'end_page',
                        type: 'number',
                        default: 1,
                        description: 'Dernière page à récupérer (pagination)',
                    },
                    {
                        displayName: 'Prénom',
                        name: 'first_name',
                        type: 'string',
                        description: 'Filtrer par prénom',
                        default: '',
                    },
                    {
                        displayName: 'Nom',
                        name: 'last_name',
                        type: 'string',
                        description: 'Filtrer par nom',
                        default: '',
                    },
                    {
                        displayName: 'Titre',
                        name: 'title',
                        type: 'string',
                        description: 'Filtrer par titre',
                        default: '',
                    },
                    {
                        displayName: 'Afficher l\'état d\'invitation',
                        name: 'fetch_invitation_state',
                        type: 'boolean',
                        default: true,
                        description: 'Inclure l\'état d\'invitation/connexion pour chaque profil',
                    },
                ],
            },
            // Champs pour Search Companies (nouvelle structure)
            {
                displayName: 'Login Token',
                name: 'searchCompaniesLoginToken',
                type: 'string',
                typeOptions: { password: true },
                displayOptions: {
                    show: {
                        operation: ['searchCompanies'],
                        useCustomCredentials: [true],
                    },
                },
                default: '',
                required: true,
                placeholder: 'Token d\'authentification LinkedIn',
                description: 'Token d\'authentification LinkedIn obtenu après login/verify',
            },
            {
                displayName: 'Pays',
                name: 'searchCompaniesCountry',
                type: 'options',
                options: [
                    { name: 'France', value: 'FR' },
                    { name: 'États-Unis', value: 'US' },
                    { name: 'Royaume-Uni', value: 'UK' },
                ],
                displayOptions: {
                    show: {
                        operation: ['searchCompanies'],
                    },
                },
                default: 'FR',
                description: 'Code pays pour la sélection du proxy',
            },
            {
                displayName: 'Options avancées',
                name: 'searchCompaniesOptions',
                type: 'collection',
                placeholder: 'Ajouter une option',
                displayOptions: {
                    show: {
                        operation: ['searchCompanies'],
                    },
                },
                default: {},
                options: [
                    {
                        displayName: 'Location(s)',
                        name: 'location',
                        type: 'string',
                        placeholder: 'Paris;France;Europe',
                        description: 'Lieu(x) géographique(s) (séparés par ;)',
                        default: '',
                    },
                    {
                        displayName: 'Secteur(s)',
                        name: 'sector',
                        type: 'string',
                        placeholder: 'Software;Finance;Marketing',
                        description: 'Secteur(s) d\'activité (séparés par ;)',
                        default: '',
                    },
                    {
                        displayName: 'Mot-clé',
                        name: 'keyword',
                        type: 'string',
                        description: 'Mot-clé de recherche',
                        default: '',
                    },
                    {
                        displayName: 'Taille de l\'entreprise',
                        name: 'company_size',
                        type: 'string',
                        placeholder: '1-10;11-50;51-200',
                        description: 'Plage de taille d\'entreprise (séparées par ;)',
                        default: '',
                    },
                    {
                        displayName: 'Nombre de résultats',
                        name: 'total_results',
                        type: 'number',
                        default: 10,
                        description: 'Nombre d\'entreprises à récupérer',
                    },
                    {
                        displayName: 'Page de début',
                        name: 'start_page',
                        type: 'number',
                        default: 1,
                        description: 'Première page à récupérer (pagination)',
                    },
                    {
                        displayName: 'Page de fin',
                        name: 'end_page',
                        type: 'number',
                        default: 1,
                        description: 'Dernière page à récupérer (pagination)',
                    },
                ],
            },
            // Champs pour Get Company Information
            {
                displayName: 'URL de l\'entreprise',
                name: 'getCompanyInfoUrl',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['getCompanyInfo'],
                    },
                },
                default: '',
                required: true,
                placeholder: 'https://www.linkedin.com/company/stripe/',
                description: 'URL de l\'entreprise LinkedIn',
            },
            {
                displayName: 'Pays',
                name: 'getCompanyInfoCountry',
                type: 'options',
                options: [
                    { name: 'France', value: 'FR' },
                    { name: 'États-Unis', value: 'US' },
                    { name: 'Royaume-Uni', value: 'UK' },
                ],
                displayOptions: {
                    show: {
                        operation: ['getCompanyInfo'],
                    },
                },
                default: 'FR',
                description: 'Code pays pour la sélection du proxy',
            },
            {
                displayName: 'Login Token',
                name: 'getCompanyInfoLoginToken',
                type: 'string',
                typeOptions: { password: true },
                displayOptions: {
                    show: {
                        operation: ['getCompanyInfo'],
                        useCustomCredentials: [true],
                    },
                },
                default: '',
                required: true,
                placeholder: 'Token d\'authentification LinkedIn',
                description: 'Token d\'authentification LinkedIn obtenu après login/verify',
            },
            // Champs pour Send Connection Request
            {
                displayName: 'URL du profil LinkedIn',
                name: 'sendConnectionLinkedinUrl',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['sendConnectionRequest'],
                    },
                },
                default: '',
                required: true,
                placeholder: 'https://www.linkedin.com/in/username',
                description: 'URL du profil LinkedIn à connecter',
            },
            {
                displayName: 'Message',
                name: 'sendConnectionMessage',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['sendConnectionRequest'],
                    },
                },
                default: '',
                description: 'Message personnalisé à envoyer avec l\'invitation',
            },
            {
                displayName: 'Pays',
                name: 'sendConnectionCountry',
                type: 'options',
                options: [
                    { name: 'France', value: 'FR' },
                    { name: 'États-Unis', value: 'US' },
                    { name: 'Royaume-Uni', value: 'UK' },
                ],
                displayOptions: {
                    show: {
                        operation: ['sendConnectionRequest'],
                    },
                },
                default: 'FR',
                description: 'Code pays pour la sélection du proxy',
            },
            {
                displayName: 'Login Token',
                name: 'sendConnectionLoginToken',
                type: 'string',
                typeOptions: { password: true },
                displayOptions: {
                    show: {
                        operation: ['sendConnectionRequest'],
                        useCustomCredentials: [true],
                    },
                },
                default: '',
                required: true,
                placeholder: 'Token d\'authentification LinkedIn',
                description: 'Token d\'authentification LinkedIn obtenu après login/verify',
            },
            // Additional options
            {
                displayName: 'Options avancées',
                name: 'additionalFields',
                type: 'collection',
                placeholder: 'Ajouter une option',
                default: {},
                options: [
                    {
                        displayName: 'Timeout',
                        name: 'timeout',
                        type: 'number',
                        default: 30000,
                        description: 'Timeout de la requête en millisecondes',
                    },
                    {
                        displayName: 'Nombre de tentatives',
                        name: 'retryCount',
                        type: 'number',
                        default: 3,
                        description: 'Nombre de tentatives en cas d\'échec',
                    },
                ],
            },
        ],
    };

    // Fonction pour détecter et gérer les valeurs BLANK
    static sanitizeCredentialValue(value: string): string | null {
        if (!value || value.includes('__n8n_BLANK_VALUE_')) {
            return null;
        }
        return value;
    }

    // Fonction pour obtenir les credentials avec fallback
    private async getCredentialsWithFallback(
        context: IExecuteFunctions,
        itemIndex: number,
        operation: string
    ): Promise<{
        apiKey: string;
        email: string;
        password: string;
        country: string;
        loginToken?: string;
    }> {
        const useCustomCredentials = context.getNodeParameter('useCustomCredentials', itemIndex) as boolean;

        if (useCustomCredentials) {
            // Utiliser les credentials personnalisées
            const apiKey = context.getNodeParameter('customApiKey', itemIndex) as string;
            const email = operation === 'login' 
                ? context.getNodeParameter('customLinkedinEmail', itemIndex) as string
                : context.getNodeParameter('verifyEmail', itemIndex) as string;
            const password = operation === 'login' 
                ? context.getNodeParameter('customLinkedinPassword', itemIndex) as string
                : '';
            const country = context.getNodeParameter('customCountry', itemIndex) as string;
            const loginToken = operation === 'login' 
                ? context.getNodeParameter('customLoginToken', itemIndex) as string
                : '';

            return { apiKey, email, password, country, loginToken };
        } else {
            // Utiliser les credentials sauvegardées
            const credentials = await context.getCredentials('linkupApi');
            
            const apiKey = Linkup.sanitizeCredentialValue(credentials.apiKey as string);
            const email = operation === 'login' 
                ? Linkup.sanitizeCredentialValue(credentials.linkedinEmail as string)
                : context.getNodeParameter('verifyEmail', itemIndex) as string;
            const password = operation === 'login' 
                ? Linkup.sanitizeCredentialValue(credentials.linkedinPassword as string)
                : '';
            const country = Linkup.sanitizeCredentialValue(credentials.country as string);
            const loginToken = Linkup.sanitizeCredentialValue(credentials.loginToken as string);

            // Vérifier si les credentials sont corrompues
            if (!apiKey || (operation === 'login' && (!email || !password))) {
                throw new NodeOperationError(
                    context.getNode(),
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

    // Factorisation de la création des options de requête HTTP
    private buildRequestOptions(
        endpoint: string,
        method: 'POST' | 'GET',
        apiKey: string,
        body: Record<string, any>,
        timeout: number
    ): IHttpRequestOptions {
        return {
            method,
            url: `${LINKUP_API_BASE_URL}${endpoint}`,
            headers: {
                'x-api-key': apiKey,
                'Content-Type': 'application/json',
            },
            body,
            timeout,
        };
    }

    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: INodeExecutionData[] = [];

        for (let i = 0; i < items.length; i++) {
            const operation = this.getNodeParameter('operation', i) as string;
            const additionalFields = this.getNodeParameter('additionalFields', i) as any;

            try {
                let response: any;
                const timeout = additionalFields.timeout || 30000;

                if (operation === 'login') {
                    const creds = await Linkup.prototype.getCredentialsWithFallback.call(this, this, i, 'login');
                    const body = {
                        email: creds.email,
                        password: creds.password,
                        country: creds.country,
                        ...(creds.loginToken && { token: creds.loginToken }),
                    };
                    const requestOptions = Linkup.prototype.buildRequestOptions.call(this,
                        '/auth/login',
                        'POST',
                        creds.apiKey,
                        body,
                        timeout
                    );
                    response = await this.helpers.httpRequest(requestOptions);
                } else if (operation === 'verifyCode') {
                    const creds = await Linkup.prototype.getCredentialsWithFallback.call(this, this, i, 'verifyCode');
                    const verificationCode = this.getNodeParameter('verificationCode', i) as string;
                    const body = {
                        email: creds.email,
                        code: verificationCode,
                        country: creds.country,
                    };
                    const requestOptions = Linkup.prototype.buildRequestOptions.call(this,
                        '/auth/verify',
                        'POST',
                        creds.apiKey,
                        body,
                        timeout
                    );
                    response = await this.helpers.httpRequest(requestOptions);
                } else if (operation === 'getMyProfile') {
                    // Gestion des credentials (toujours via getCredentialsWithFallback pour la clé API)
                    const creds = await Linkup.prototype.getCredentialsWithFallback.call(this, this, i, 'login');
                    // login_token et country peuvent venir soit des credentials, soit des params custom
                    let loginToken = creds.loginToken;
                    let country = creds.country;
                    if (this.getNodeParameter('useCustomCredentials', i)) {
                        loginToken = this.getNodeParameter('getMyProfileLoginToken', i) as string;
                        country = this.getNodeParameter('getMyProfileCountry', i) as string;
                    }
                    const body = {
                        country,
                        login_token: loginToken,
                    };
                    const requestOptions = Linkup.prototype.buildRequestOptions.call(this,
                        '/profile/me',
                        'POST',
                        creds.apiKey,
                        body,
                        timeout
                    );
                    response = await this.helpers.httpRequest(requestOptions);
                } else if (operation === 'extractProfileInfo') {
                    const creds = await Linkup.prototype.getCredentialsWithFallback.call(this, this, i, 'login');
                    let loginToken = creds.loginToken;
                    let country = creds.country;
                    if (this.getNodeParameter('useCustomCredentials', i)) {
                        loginToken = this.getNodeParameter('extractProfileLoginToken', i) as string;
                        country = this.getNodeParameter('extractProfileCountry', i) as string;
                    }
                    const linkedinUrl = this.getNodeParameter('linkedinUrl', i) as string;
                    const body = {
                        linkedin_url: linkedinUrl,
                        country,
                        login_token: loginToken,
                    };
                    const requestOptions = Linkup.prototype.buildRequestOptions.call(this,
                        '/profile/info',
                        'POST',
                        creds.apiKey,
                        body,
                        timeout
                    );
                    response = await this.helpers.httpRequest(requestOptions);
                } else if (operation === 'searchProfile') {
                    const creds = await Linkup.prototype.getCredentialsWithFallback.call(this, this, i, 'login');
                    let loginToken = creds.loginToken;
                    let country = creds.country;
                    if (this.getNodeParameter('useCustomCredentials', i)) {
                        loginToken = this.getNodeParameter('searchProfileLoginToken', i) as string;
                        country = this.getNodeParameter('searchProfileCountry', i) as string;
                    }
                    // Champs obligatoires
                    const body: any = {
                        login_token: loginToken,
                        country,
                    };
                    // Champs optionnels (collection)
                    const options = this.getNodeParameter('searchProfileOptions', i, {}) as Record<string, any>;
                    // Gestion spéciale pagination/total_results
                    let hasPagination = false;
                    if (options.start_page !== undefined && options.start_page !== null && options.start_page !== 1) {
                        body.start_page = options.start_page;
                        hasPagination = true;
                    }
                    if (options.end_page !== undefined && options.end_page !== null && options.end_page !== 1) {
                        body.end_page = options.end_page;
                        hasPagination = true;
                    }
                    // Toujours envoyer total_results (10 par défaut) si pas de pagination et pas explicitement renseigné
                    if (!hasPagination) {
                        if (options.total_results !== undefined && options.total_results !== null && options.total_results !== 10) {
                            body.total_results = options.total_results;
                        } else {
                            body.total_results = 10;
                        }
                    }
                    // Autres champs optionnels
                    const skipFields = ['start_page', 'end_page', 'total_results'];
                    for (const [key, value] of Object.entries(options)) {
                        if (skipFields.includes(key)) continue;
                        if (value !== undefined && value !== null && value !== '') {
                            body[key] = value;
                        }
                    }
                    const requestOptions = Linkup.prototype.buildRequestOptions.call(this,
                        '/profile/search',
                        'POST',
                        creds.apiKey,
                        body,
                        timeout
                    );
                    try {
                        response = await this.helpers.httpRequest(requestOptions);
                        // Ajout du body envoyé et de la réponse brute pour debug
                        returnData.push({
                            json: {
                                _debug: {
                                    requestBody: body,
                                    apiResponse: response,
                                },
                                ...response,
                                _meta: {
                                    operation,
                                    timestamp: new Date().toISOString(),
                                    nodeVersion: NODE_VERSION,
                                },
                            },
                            pairedItem: { item: i },
                        });
                        continue;
                    } catch (error: any) {
                        // Affiche le message d'erreur complet de l'API
                        throw new NodeOperationError(this.getNode(), error.response?.data?.message || error.message || 'Erreur inconnue', { description: JSON.stringify(error.response?.data) });
                    }
                } else if (operation === 'searchCompanies') {
                    const creds = await Linkup.prototype.getCredentialsWithFallback.call(this, this, i, 'login');
                    let loginToken = creds.loginToken;
                    let country = creds.country;
                    if (this.getNodeParameter('useCustomCredentials', i)) {
                        loginToken = this.getNodeParameter('searchCompaniesLoginToken', i) as string;
                        country = this.getNodeParameter('searchCompaniesCountry', i) as string;
                    }
                    const body: any = {
                        location: this.getNodeParameter('searchCompaniesLocation', i) as string,
                        sector: this.getNodeParameter('searchCompaniesSector', i) as string,
                        keyword: this.getNodeParameter('searchCompaniesKeyword', i) as string,
                        company_size: this.getNodeParameter('searchCompaniesSize', i) as string,
                        total_results: this.getNodeParameter('searchCompaniesTotalResults', i) as number,
                        start_page: this.getNodeParameter('searchCompaniesStartPage', i) as number,
                        end_page: this.getNodeParameter('searchCompaniesEndPage', i) as number,
                        country,
                        login_token: loginToken,
                    };
                    const requestOptions = Linkup.prototype.buildRequestOptions.call(this,
                        '/companies/search',
                        'POST',
                        creds.apiKey,
                        body,
                        timeout
                    );
                    response = await this.helpers.httpRequest(requestOptions);
                } else if (operation === 'getCompanyInfo') {
                    const creds = await Linkup.prototype.getCredentialsWithFallback.call(this, this, i, 'login');
                    let loginToken = creds.loginToken;
                    let country = creds.country;
                    if (this.getNodeParameter('useCustomCredentials', i)) {
                        loginToken = this.getNodeParameter('getCompanyInfoLoginToken', i) as string;
                        country = this.getNodeParameter('getCompanyInfoCountry', i) as string;
                    }
                    const body: any = {
                        company_url: this.getNodeParameter('getCompanyInfoUrl', i) as string,
                        country,
                        login_token: loginToken,
                    };
                    const requestOptions = Linkup.prototype.buildRequestOptions.call(this,
                        '/companies/info',
                        'POST',
                        creds.apiKey,
                        body,
                        timeout
                    );
                    response = await this.helpers.httpRequest(requestOptions);
                } else if (operation === 'sendConnectionRequest') {
                    const creds = await Linkup.prototype.getCredentialsWithFallback.call(this, this, i, 'login');
                    let loginToken = creds.loginToken;
                    let country = creds.country;
                    if (this.getNodeParameter('useCustomCredentials', i)) {
                        loginToken = this.getNodeParameter('sendConnectionLoginToken', i) as string;
                        country = this.getNodeParameter('sendConnectionCountry', i) as string;
                    }
                    const body: any = {
                        linkedin_url: this.getNodeParameter('sendConnectionLinkedinUrl', i) as string,
                        message: this.getNodeParameter('sendConnectionMessage', i) as string,
                        country,
                        login_token: loginToken,
                    };
                    const requestOptions = Linkup.prototype.buildRequestOptions.call(this,
                        '/network/connect',
                        'POST',
                        creds.apiKey,
                        body,
                        timeout
                    );
                    response = await this.helpers.httpRequest(requestOptions);
                }

                // Ajout de métadonnées utiles
                const executionData: INodeExecutionData = {
                    json: {
                        ...response,
                        _meta: {
                            operation,
                            timestamp: new Date().toISOString(),
                            nodeVersion: NODE_VERSION,
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

                // Amélioration des messages d'erreur
                if (error.response?.status === 401) {
                    throw new NodeOperationError(
                        this.getNode(),
                        'Clé API ou credentials invalides. Vérifiez votre clé API LINKUP et vos identifiants LinkedIn.'
                    );
                } else if (error.response?.status === 429) {
                    throw new NodeOperationError(
                        this.getNode(),
                        'Limite de requêtes atteinte. Veuillez réessayer plus tard.'
                    );
                } else if (error.response?.status === 400) {
                    throw new NodeOperationError(
                        this.getNode(),
                        `Requête invalide : ${error.response?.data?.message || error.message || 'Erreur inconnue'}`
                    );
                } else {
                    throw new NodeOperationError(this.getNode(), error.message || 'Erreur inconnue');
                }
            }
        }

        return [returnData];
    }
}