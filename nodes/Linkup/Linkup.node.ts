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
        displayName: 'Linkup API for LinkedIn',
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
                    // --- AUTHENTICATION ---
                    { name: '🔑 AUTH | Login to LinkedIn', value: 'login', description: 'Authentifier votre compte LinkedIn via Linkup', action: 'Login to LinkedIn' },
                    { name: '🔑 AUTH | Verify security code', value: 'verifyCode', description: 'Valider le code de sécurité reçu par email', action: 'Verify security code' },

                    // --- PROFILE ---
                    { name: '👤 PROFILE | Get my LinkedIn profile', value: 'getMyProfile', description: 'Récupérer les infos de votre profil LinkedIn', action: 'Get my LinkedIn profile' },
                    { name: '👤 PROFILE | Extract LinkedIn profile info', value: 'extractProfileInfo', description: 'Extraire les infos d’un profil LinkedIn public', action: 'Extract LinkedIn profile info' },
                    { name: '👤 PROFILE | Search LinkedIn profiles', value: 'searchProfile', description: 'Rechercher des profils LinkedIn', action: 'Search LinkedIn profiles' },

                    // --- COMPANIES ---
                    { name: '🏢 COMPANIES | Search LinkedIn companies', value: 'searchCompanies', description: 'Rechercher des entreprises LinkedIn', action: 'Search LinkedIn companies' },
                    { name: '🏢 COMPANIES | Get LinkedIn company info', value: 'getCompanyInfo', description: 'Obtenir les infos d’une entreprise LinkedIn', action: 'Get LinkedIn company info' },

                    // --- NETWORK ---
                    { name: '🤝 NETWORK | Send LinkedIn connection request', value: 'sendConnectionRequest', description: 'Envoyer une invitation LinkedIn', action: 'Send LinkedIn connection request' },
                    { name: '🤝 NETWORK | Get LinkedIn connections', value: 'getConnections', description: 'Récupérer la liste de vos connexions LinkedIn', action: 'Get LinkedIn connections' },
                    { name: '🤝 NETWORK | Accept LinkedIn connection invitation', value: 'acceptConnectionInvitation', description: 'Accepter une invitation LinkedIn reçue', action: 'Accept LinkedIn connection invitation' },
                    { name: '🤝 NETWORK | Get LinkedIn received invitations', value: 'getReceivedInvitations', description: 'Lister les invitations LinkedIn reçues', action: 'Get LinkedIn received invitations' },
                    { name: '🤝 NETWORK | Get LinkedIn sent invitations', value: 'getSentInvitations', description: 'Lister les invitations LinkedIn envoyées', action: 'Get LinkedIn sent invitations' },
                    { name: '🤝 NETWORK | Withdraw LinkedIn invitation', value: 'withdrawInvitation', description: 'Annuler une invitation LinkedIn envoyée', action: 'Withdraw LinkedIn invitation' },
                    { name: '🤝 NETWORK | Get LinkedIn network recommendations', value: 'getNetworkRecommendations', description: 'Obtenir des recommandations de profils à ajouter', action: 'Get LinkedIn network recommendations' },
                    { name: '🤝 NETWORK | Get LinkedIn invitation status', value: 'getInvitationStatus', description: 'Vérifier le statut d’une invitation LinkedIn', action: 'Get LinkedIn invitation status' },

                    // --- MESSAGES ---
                    { name: '💬 MESSAGES | Send LinkedIn message', value: 'sendMessage', description: 'Envoyer un message LinkedIn', action: 'Send LinkedIn message' },
                    { name: '💬 MESSAGES | Get LinkedIn message inbox', value: 'getMessageInbox', description: 'Récupérer la liste des conversations LinkedIn', action: 'Get LinkedIn message inbox' },
                    { name: '💬 MESSAGES | Get LinkedIn conversation messages', value: 'getConversationMessages', description: 'Récupérer l’historique d’une conversation LinkedIn', action: 'Get LinkedIn conversation messages' },

                    // --- RECRUITER ---
                    { name: '🧑‍💼 RECRUITER | Get LinkedIn candidates', value: 'getCandidates', description: 'Lister les candidats d’une offre LinkedIn Recruiter', action: 'Get LinkedIn candidates' },
                    { name: '🧑‍💼 RECRUITER | Get LinkedIn candidate CV', value: 'getCandidateCV', description: 'Télécharger le CV d’un candidat LinkedIn Recruiter', action: 'Get LinkedIn candidate CV' },
                    { name: '🧑‍💼 RECRUITER | Get LinkedIn job posts', value: 'getJobPosts', description: 'Lister les offres d’emploi LinkedIn Recruiter', action: 'Get LinkedIn job posts' },
                    { name: '🧑‍💼 RECRUITER | Publish LinkedIn job', value: 'publishJob', description: 'Publier une offre d’emploi LinkedIn Recruiter', action: 'Publish LinkedIn job' },
                    { name: '🧑‍💼 RECRUITER | Close LinkedIn job', value: 'closeJob', description: 'Fermer une offre d’emploi LinkedIn Recruiter', action: 'Close LinkedIn job' },
                    { name: '🧑‍💼 RECRUITER | Create LinkedIn job', value: 'createJob', description: 'Créer une nouvelle offre d’emploi LinkedIn Recruiter', action: 'Create LinkedIn job' },

                    // --- DATA ---
                    { name: '📊 DATA | Search companies (Data)', value: 'searchCompaniesData', description: 'Recherche avancée d’entreprises (Data/Enrichment)', action: 'Search companies (Data)' },
                    { name: '📊 DATA | Search profiles (Data)', value: 'searchProfilesData', description: 'Recherche avancée de profils (Data/Enrichment)', action: 'Search profiles (Data)' },
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
                type: 'string',
                default: '',
                required: false,
                placeholder: 'FR, US, UK, ...',
                description: 'Code pays pour la sélection du proxy (optionnel, texte libre)',
                displayOptions: {
                    show: {
                        operation: ['searchProfile'],
                    },
                },
            },
            {
                displayName: 'Paramètres Linkup',
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
                displayName: 'Paramètres Linkup',
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
            // 2. Ajout des champs pour l'opération acceptConnectionInvitation
            {
                displayName: 'Shared Secret',
                name: 'acceptConnectionSharedSecret',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        operation: ['acceptConnectionInvitation'],
                    },
                },
                default: '',
                placeholder: 'Shared secret de l\'invitation',
                description: 'Shared secret de l\'invitation',
            },
            {
                displayName: 'Entity URN',
                name: 'acceptConnectionEntityUrn',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        operation: ['acceptConnectionInvitation'],
                    },
                },
                default: '',
                placeholder: 'URN de l\'invitation',
                description: 'URN de l\'invitation',
            },
            {
                displayName: 'Login Token',
                name: 'acceptConnectionLoginToken',
                type: 'string',
                typeOptions: { password: true },
                required: true,
                displayOptions: {
                    show: {
                        operation: ['acceptConnectionInvitation'],
                    },
                },
                default: '',
                placeholder: 'Token d\'authentification LinkedIn',
                description: 'Token d\'authentification LinkedIn obtenu après login/verify',
            },
            {
                displayName: 'Pays',
                name: 'acceptConnectionCountry',
                type: 'string',
                default: '',
                required: false,
                placeholder: 'FR, US, UK, ...',
                description: 'Code pays pour la sélection du proxy (optionnel, texte libre)',
                displayOptions: {
                    show: {
                        operation: ['acceptConnectionInvitation'],
                    },
                },
            },
            // 3. Ajout des champs pour l'opération getReceivedInvitations
            {
                displayName: 'Login Token',
                name: 'getReceivedInvitationsLoginToken',
                type: 'string',
                typeOptions: { password: true },
                required: true,
                displayOptions: {
                    show: {
                        operation: ['getReceivedInvitations'],
                    },
                },
                default: '',
                placeholder: 'Token d\'authentification LinkedIn',
                description: 'Token d\'authentification LinkedIn obtenu après login/verify',
            },
            {
                displayName: 'Pays',
                name: 'getReceivedInvitationsCountry',
                type: 'string',
                default: '',
                required: false,
                placeholder: 'FR, US, UK, ...',
                description: 'Code pays pour la sélection du proxy (optionnel, texte libre)',
                displayOptions: {
                    show: {
                        operation: ['getReceivedInvitations'],
                    },
                },
            },
            {
                displayName: 'Paramètres Linkup',
                name: 'getReceivedInvitationsOptions',
                type: 'collection',
                placeholder: 'Ajouter une option',
                displayOptions: {
                    show: {
                        operation: ['getReceivedInvitations'],
                    },
                },
                default: {},
                options: [
                    {
                        displayName: 'Page de début',
                        name: 'start_page',
                        type: 'number',
                        default: undefined,
                        description: 'Première page à récupérer (pagination)',
                    },
                    {
                        displayName: 'Page de fin',
                        name: 'end_page',
                        type: 'number',
                        default: undefined,
                        description: 'Dernière page à récupérer (pagination)',
                    },
                    {
                        displayName: 'Nombre de résultats',
                        name: 'total_results',
                        type: 'number',
                        default: undefined,
                        description: 'Nombre d\'invitations à récupérer',
                    },
                    {
                        displayName: 'Type d\'invitation',
                        name: 'invitation_type',
                        type: 'string',
                        default: '',
                        description: 'Filtrer par type d\'invitation (CONNECTION, ORGANIZATION, CONTENT_SERIES)',
                    },
                ],
            },
            // 2. Ajout des champs pour l'opération getSentInvitations
            {
                displayName: 'Login Token',
                name: 'getSentInvitationsLoginToken',
                type: 'string',
                typeOptions: { password: true },
                required: true,
                displayOptions: {
                    show: {
                        operation: ['getSentInvitations'],
                    },
                },
                default: '',
                placeholder: 'Token d\'authentification LinkedIn',
                description: 'Token d\'authentification LinkedIn obtenu après login/verify',
            },
            {
                displayName: 'Pays',
                name: 'getSentInvitationsCountry',
                type: 'string',
                default: '',
                required: false,
                placeholder: 'FR, US, UK, ...',
                description: 'Code pays pour la sélection du proxy (optionnel, texte libre)',
                displayOptions: {
                    show: {
                        operation: ['getSentInvitations'],
                    },
                },
            },
            {
                displayName: 'Paramètres Linkup',
                name: 'getSentInvitationsOptions',
                type: 'collection',
                placeholder: 'Ajouter une option',
                displayOptions: {
                    show: {
                        operation: ['getSentInvitations'],
                    },
                },
                default: {},
                options: [
                    {
                        displayName: 'Page de début',
                        name: 'start_page',
                        type: 'number',
                        default: undefined,
                        description: 'Première page à récupérer (pagination)',
                    },
                    {
                        displayName: 'Page de fin',
                        name: 'end_page',
                        type: 'number',
                        default: undefined,
                        description: 'Dernière page à récupérer (pagination)',
                    },
                    {
                        displayName: 'Nombre de résultats',
                        name: 'total_results',
                        type: 'number',
                        default: undefined,
                        description: 'Nombre d\'invitations à récupérer',
                    },
                    {
                        displayName: 'Type d\'invitation',
                        name: 'invitation_type',
                        type: 'string',
                        default: '',
                        description: 'Filtrer par type d\'invitation (CONNECTION, ORGANIZATION, CONTENT_SERIES)',
                    },
                ],
            },
            // 2. Ajout des champs pour l'opération withdrawInvitation
            {
                displayName: 'Invitation ID',
                name: 'withdrawInvitationId',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        operation: ['withdrawInvitation'],
                    },
                },
                default: '',
                placeholder: 'ID de l\'invitation',
                description: 'ID de l\'invitation à retirer',
            },
            {
                displayName: 'Login Token',
                name: 'withdrawInvitationLoginToken',
                type: 'string',
                typeOptions: { password: true },
                required: true,
                displayOptions: {
                    show: {
                        operation: ['withdrawInvitation'],
                    },
                },
                default: '',
                placeholder: 'Token d\'authentification LinkedIn',
                description: 'Token d\'authentification LinkedIn obtenu après login/verify',
            },
            {
                displayName: 'Pays',
                name: 'withdrawInvitationCountry',
                type: 'string',
                default: '',
                required: false,
                placeholder: 'FR, US, UK, ...',
                description: 'Code pays pour la sélection du proxy (optionnel, texte libre)',
                displayOptions: {
                    show: {
                        operation: ['withdrawInvitation'],
                    },
                },
            },
            // 2. Ajout des champs pour l'opération getNetworkRecommendations
            {
                displayName: 'Login Token',
                name: 'getNetworkRecommendationsLoginToken',
                type: 'string',
                typeOptions: { password: true },
                required: true,
                displayOptions: {
                    show: {
                        operation: ['getNetworkRecommendations'],
                    },
                },
                default: '',
                placeholder: 'Token d\'authentification LinkedIn',
                description: 'Token d\'authentification LinkedIn obtenu après login/verify',
            },
            {
                displayName: 'Pays',
                name: 'getNetworkRecommendationsCountry',
                type: 'string',
                default: '',
                required: false,
                placeholder: 'FR, US, UK, ...',
                description: 'Code pays pour la sélection du proxy (optionnel, texte libre)',
                displayOptions: {
                    show: {
                        operation: ['getNetworkRecommendations'],
                    },
                },
            },
            {
                displayName: 'Paramètres Linkup',
                name: 'getNetworkRecommendationsOptions',
                type: 'collection',
                placeholder: 'Ajouter une option',
                displayOptions: {
                    show: {
                        operation: ['getNetworkRecommendations'],
                    },
                },
                default: {},
                options: [
                    {
                        displayName: 'Page de début',
                        name: 'start_page',
                        type: 'number',
                        default: undefined,
                        description: 'Première page à récupérer (pagination)',
                    },
                    {
                        displayName: 'Page de fin',
                        name: 'end_page',
                        type: 'number',
                        default: undefined,
                        description: 'Dernière page à récupérer (pagination)',
                    },
                    {
                        displayName: 'Nombre de résultats',
                        name: 'total_results',
                        type: 'number',
                        default: undefined,
                        description: 'Nombre de recommandations à récupérer',
                    },
                ],
            },
            // 2. Ajout des champs pour l'opération getInvitationStatus
            {
                displayName: 'URL du profil LinkedIn',
                name: 'getInvitationStatusLinkedinUrl',
                type: 'string',
                required: true,
                displayOptions: {
                    show: {
                        operation: ['getInvitationStatus'],
                    },
                },
                default: '',
                placeholder: 'https://www.linkedin.com/in/username',
                description: 'URL du profil LinkedIn à vérifier',
            },
            {
                displayName: 'Login Token',
                name: 'getInvitationStatusLoginToken',
                type: 'string',
                typeOptions: { password: true },
                required: true,
                displayOptions: {
                    show: {
                        operation: ['getInvitationStatus'],
                    },
                },
                default: '',
                placeholder: 'Token d\'authentification LinkedIn',
                description: 'Token d\'authentification LinkedIn obtenu après login/verify',
            },
            {
                displayName: 'Pays',
                name: 'getInvitationStatusCountry',
                type: 'string',
                default: '',
                required: false,
                placeholder: 'FR, US, UK, ...',
                description: 'Code pays pour la sélection du proxy (optionnel, texte libre)',
                displayOptions: {
                    show: {
                        operation: ['getInvitationStatus'],
                    },
                },
            },
            {
                displayName: 'Paramètres Linkup',
                name: 'getConnectionsOptions',
                type: 'collection',
                placeholder: 'Ajouter un paramètre',
                displayOptions: {
                    show: {
                        operation: ['getConnections'],
                    },
                },
                default: {},
                options: [
                    { displayName: 'Pays', name: 'country', type: 'string', default: 'FR', description: 'Code pays (FR, US, UK, ...)' },
                    { displayName: 'Page de début', name: 'start_page', type: 'number', default: 1, description: 'Pagination - début' },
                    { displayName: 'Page de fin', name: 'end_page', type: 'number', default: 1, description: 'Pagination - fin' },
                    { displayName: 'Nombre de résultats', name: 'total_results', type: 'number', default: 10, description: 'Nombre de résultats' },
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
                'User-Agent': 'curl/7.68.0',
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
                    const creds = await Linkup.prototype.getCredentialsWithFallback.call(this, this, i, 'login');
                    let loginToken = creds.loginToken;
                    if (this.getNodeParameter('useCustomCredentials', i)) {
                        loginToken = this.getNodeParameter('getMyProfileLoginToken', i) as string;
                    }
                    const body: any = {
                        login_token: loginToken,
                    };
                    // Ajout dynamique de country si présent
                    const country = this.getNodeParameter('getMyProfileCountry', i, '');
                    if (country) {
                        body.country = country;
                    }
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
                    if (this.getNodeParameter('useCustomCredentials', i)) {
                        loginToken = this.getNodeParameter('extractProfileLoginToken', i) as string;
                    }
                    const linkedinUrl = this.getNodeParameter('linkedinUrl', i) as string;
                    const body: any = {
                        linkedin_url: linkedinUrl,
                        login_token: loginToken,
                    };
                    // Ajout dynamique de country si présent
                    const country = this.getNodeParameter('extractProfileCountry', i, '');
                    if (country) {
                        body.country = country;
                    }
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
                    if (this.getNodeParameter('useCustomCredentials', i)) {
                        loginToken = this.getNodeParameter('searchProfileLoginToken', i) as string;
                    }
                    // Champs obligatoires
                    const body: any = {
                        login_token: loginToken,
                    };
                    // Champs optionnels (collection)
                    const options = this.getNodeParameter('searchProfileOptions', i, {}) as Record<string, any>;
                    // Gestion spéciale pagination/total_results (identique à searchCompanies)
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
                        // Ajout du body envoyé, des headers et de la réponse brute pour debug
                        returnData.push({
                            json: {
                                _debug: {
                                    requestBody: body,
                                    requestHeaders: requestOptions.headers,
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
                    // Champs obligatoires
                    const body: any = {
                        login_token: loginToken,
                        country,
                    };
                    // Champs optionnels (collection)
                    const options = this.getNodeParameter('searchCompaniesOptions', i, {}) as Record<string, any>;
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
                        '/companies/search',
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
                        throw new NodeOperationError(this.getNode(), error.response?.data?.message || error.message || 'Erreur inconnue', { description: JSON.stringify(error.response?.data) });
                    }
                } else if (operation === 'getCompanyInfo') {
                    const creds = await Linkup.prototype.getCredentialsWithFallback.call(this, this, i, 'login');
                    let loginToken = creds.loginToken;
                    if (this.getNodeParameter('useCustomCredentials', i)) {
                        loginToken = this.getNodeParameter('getCompanyInfoLoginToken', i) as string;
                    }
                    const body: any = {
                        company_url: this.getNodeParameter('getCompanyInfoUrl', i) as string,
                        login_token: loginToken,
                    };
                    // Ajout dynamique de country si présent
                    const country = this.getNodeParameter('getCompanyInfoCountry', i, '');
                    if (country) {
                        body.country = country;
                    }
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
                    if (this.getNodeParameter('useCustomCredentials', i)) {
                        loginToken = this.getNodeParameter('sendConnectionLoginToken', i) as string;
                    }
                    const body: any = {
                        linkedin_url: this.getNodeParameter('sendConnectionLinkedinUrl', i) as string,
                        message: this.getNodeParameter('sendConnectionMessage', i) as string,
                        login_token: loginToken,
                    };
                    // Ajout dynamique de country si présent
                    const country = this.getNodeParameter('sendConnectionCountry', i, '');
                    if (country) {
                        body.country = country;
                    }
                    const requestOptions = Linkup.prototype.buildRequestOptions.call(this,
                        '/network/connect',
                        'POST',
                        creds.apiKey,
                        body,
                        timeout
                    );
                    response = await this.helpers.httpRequest(requestOptions);
                } else if (operation === 'getConnections') {
                    const creds = await Linkup.prototype.getCredentialsWithFallback.call(this, this, i, 'login');
                    let loginToken = creds.loginToken;
                    if (this.getNodeParameter('useCustomCredentials', i)) {
                        loginToken = this.getNodeParameter('getConnectionsLoginToken', i) as string;
                    }
                    const body: any = {
                        login_token: loginToken,
                    };
                    // Ajout dynamique de country si présent
                    const country = this.getNodeParameter('getConnectionsCountry', i, '');
                    if (country) {
                        body.country = country;
                    }
                    // Gestion spéciale pagination/total_results
                    const options = this.getNodeParameter('getConnectionsOptions', i, {}) as Record<string, any>;
                    let hasPagination = false;
                    if (options.start_page !== undefined && options.start_page !== null) {
                        body.start_page = options.start_page;
                        hasPagination = true;
                    }
                    if (options.end_page !== undefined && options.end_page !== null) {
                        body.end_page = options.end_page;
                        hasPagination = true;
                    }
                    if (!hasPagination) {
                        if (options.total_results !== undefined && options.total_results !== null) {
                            body.total_results = options.total_results;
                        } else {
                            body.total_results = 10;
                        }
                    }
                    const requestOptions = Linkup.prototype.buildRequestOptions.call(this,
                        '/network/connections',
                        'POST',
                        creds.apiKey,
                        body,
                        timeout
                    );
                    try {
                        response = await this.helpers.httpRequest(requestOptions);
                        returnData.push({
                            json: {
                                _debug: {
                                    requestBody: body,
                                    requestHeaders: requestOptions.headers,
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
                        throw new NodeOperationError(this.getNode(), error.response?.data?.message || error.message || 'Erreur inconnue', { description: JSON.stringify(error.response?.data) });
                    }
                } else if (operation === 'acceptConnectionInvitation') {
                    const body: any = {};
                    const sharedSecret = this.getNodeParameter('acceptConnectionSharedSecret', i) as string;
                    const entityUrn = this.getNodeParameter('acceptConnectionEntityUrn', i) as string;
                    const loginToken = this.getNodeParameter('acceptConnectionLoginToken', i) as string;
                    const country = this.getNodeParameter('acceptConnectionCountry', i, '');
                    if (sharedSecret) body.shared_secret = sharedSecret;
                    if (entityUrn) body.entity_urn = entityUrn;
                    if (loginToken) body.login_token = loginToken;
                    if (country) body.country = country;
                    const creds = await Linkup.prototype.getCredentialsWithFallback.call(this, this, i, 'login');
                    const requestOptions = Linkup.prototype.buildRequestOptions.call(this,
                        '/network/accept-invitations',
                        'POST',
                        creds.apiKey,
                        body,
                        timeout
                    );
                    try {
                        response = await this.helpers.httpRequest(requestOptions);
                        returnData.push({
                            json: {
                                _debug: {
                                    requestBody: body,
                                    requestHeaders: requestOptions.headers,
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
                        throw new NodeOperationError(this.getNode(), error.response?.data?.message || error.message || 'Erreur inconnue', { description: JSON.stringify(error.response?.data) });
                    }
                } else if (operation === 'getReceivedInvitations') {
                    const body: any = {};
                    const loginToken = this.getNodeParameter('getReceivedInvitationsLoginToken', i) as string;
                    const country = this.getNodeParameter('getReceivedInvitationsCountry', i, '');
                    if (loginToken) body.login_token = loginToken;
                    if (country) body.country = country;
                    const options = this.getNodeParameter('getReceivedInvitationsOptions', i, {}) as Record<string, any>;
                    let hasPagination = false;
                    if (options.start_page !== undefined && options.start_page !== null) {
                        body.start_page = options.start_page;
                        hasPagination = true;
                    }
                    if (options.end_page !== undefined && options.end_page !== null) {
                        body.end_page = options.end_page;
                        hasPagination = true;
                    }
                    if (!hasPagination) {
                        if (options.total_results !== undefined && options.total_results !== null) {
                            body.total_results = options.total_results;
                        } else {
                            body.total_results = 10;
                        }
                    }
                    if (options.invitation_type) {
                        body.invitation_type = options.invitation_type;
                    }
                    const creds = await Linkup.prototype.getCredentialsWithFallback.call(this, this, i, 'login');
                    const requestOptions = Linkup.prototype.buildRequestOptions.call(this,
                        '/network/invitations',
                        'POST',
                        creds.apiKey,
                        body,
                        timeout
                    );
                    try {
                        response = await this.helpers.httpRequest(requestOptions);
                        returnData.push({
                            json: {
                                _debug: {
                                    requestBody: body,
                                    requestHeaders: requestOptions.headers,
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
                        throw new NodeOperationError(this.getNode(), error.response?.data?.message || error.message || 'Erreur inconnue', { description: JSON.stringify(error.response?.data) });
                    }
                } else if (operation === 'getSentInvitations') {
                    const body: any = {};
                    const loginToken = this.getNodeParameter('getSentInvitationsLoginToken', i) as string;
                    const country = this.getNodeParameter('getSentInvitationsCountry', i, '');
                    if (loginToken) body.login_token = loginToken;
                    if (country) body.country = country;
                    const options = this.getNodeParameter('getSentInvitationsOptions', i, {}) as Record<string, any>;
                    let hasPagination = false;
                    if (options.start_page !== undefined && options.start_page !== null) {
                        body.start_page = options.start_page;
                        hasPagination = true;
                    }
                    if (options.end_page !== undefined && options.end_page !== null) {
                        body.end_page = options.end_page;
                        hasPagination = true;
                    }
                    if (!hasPagination) {
                        if (options.total_results !== undefined && options.total_results !== null) {
                            body.total_results = options.total_results;
                        } else {
                            body.total_results = 10;
                        }
                    }
                    if (options.invitation_type) {
                        body.invitation_type = options.invitation_type;
                    }
                    const creds = await Linkup.prototype.getCredentialsWithFallback.call(this, this, i, 'login');
                    const requestOptions = Linkup.prototype.buildRequestOptions.call(this,
                        '/network/sent-invitations',
                        'POST',
                        creds.apiKey,
                        body,
                        timeout
                    );
                    try {
                        response = await this.helpers.httpRequest(requestOptions);
                        returnData.push({
                            json: {
                                _debug: {
                                    requestBody: body,
                                    requestHeaders: requestOptions.headers,
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
                        throw new NodeOperationError(this.getNode(), error.response?.data?.message || error.message || 'Erreur inconnue', { description: JSON.stringify(error.response?.data) });
                    }
                } else if (operation === 'withdrawInvitation') {
                    const body: any = {};
                    const invitationId = this.getNodeParameter('withdrawInvitationId', i) as string;
                    const loginToken = this.getNodeParameter('withdrawInvitationLoginToken', i) as string;
                    const country = this.getNodeParameter('withdrawInvitationCountry', i, '');
                    if (invitationId) body.invitation_id = invitationId;
                    if (loginToken) body.login_token = loginToken;
                    if (country) body.country = country;
                    const creds = await Linkup.prototype.getCredentialsWithFallback.call(this, this, i, 'login');
                    const requestOptions = Linkup.prototype.buildRequestOptions.call(this,
                        '/network/withdraw-invitation',
                        'POST',
                        creds.apiKey,
                        body,
                        timeout
                    );
                    try {
                        response = await this.helpers.httpRequest(requestOptions);
                        returnData.push({
                            json: {
                                _debug: {
                                    requestBody: body,
                                    requestHeaders: requestOptions.headers,
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
                        throw new NodeOperationError(this.getNode(), error.response?.data?.message || error.message || 'Erreur inconnue', { description: JSON.stringify(error.response?.data) });
                    }
                } else if (operation === 'getNetworkRecommendations') {
                    const body: any = {};
                    const loginToken = this.getNodeParameter('getNetworkRecommendationsLoginToken', i) as string;
                    const country = this.getNodeParameter('getNetworkRecommendationsCountry', i, '');
                    if (loginToken) body.login_token = loginToken;
                    if (country) body.country = country;
                    const options = this.getNodeParameter('getNetworkRecommendationsOptions', i, {}) as Record<string, any>;
                    let hasPagination = false;
                    if (options.start_page !== undefined && options.start_page !== null) {
                        body.start_page = options.start_page;
                        hasPagination = true;
                    }
                    if (options.end_page !== undefined && options.end_page !== null) {
                        body.end_page = options.end_page;
                        hasPagination = true;
                    }
                    if (!hasPagination) {
                        if (options.total_results !== undefined && options.total_results !== null) {
                            body.total_results = options.total_results;
                        } else {
                            body.total_results = 10;
                        }
                    }
                    const creds = await Linkup.prototype.getCredentialsWithFallback.call(this, this, i, 'login');
                    const requestOptions = Linkup.prototype.buildRequestOptions.call(this,
                        '/network/recommendations',
                        'POST',
                        creds.apiKey,
                        body,
                        timeout
                    );
                    try {
                        response = await this.helpers.httpRequest(requestOptions);
                        returnData.push({
                            json: {
                                _debug: {
                                    requestBody: body,
                                    requestHeaders: requestOptions.headers,
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
                        throw new NodeOperationError(this.getNode(), error.response?.data?.message || error.message || 'Erreur inconnue', { description: JSON.stringify(error.response?.data) });
                    }
                } else if (operation === 'getInvitationStatus') {
                    const body: any = {};
                    const linkedinUrl = this.getNodeParameter('getInvitationStatusLinkedinUrl', i) as string;
                    const loginToken = this.getNodeParameter('getInvitationStatusLoginToken', i) as string;
                    const country = this.getNodeParameter('getInvitationStatusCountry', i, '');
                    if (linkedinUrl) body.linkedin_url = linkedinUrl;
                    if (loginToken) body.login_token = loginToken;
                    if (country) body.country = country;
                    const creds = await Linkup.prototype.getCredentialsWithFallback.call(this, this, i, 'login');
                    const requestOptions = Linkup.prototype.buildRequestOptions.call(this,
                        '/network/invitation-status',
                        'POST',
                        creds.apiKey,
                        body,
                        timeout
                    );
                    try {
                        response = await this.helpers.httpRequest(requestOptions);
                        returnData.push({
                            json: {
                                _debug: {
                                    requestBody: body,
                                    requestHeaders: requestOptions.headers,
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
                        throw new NodeOperationError(this.getNode(), error.response?.data?.message || error.message || 'Erreur inconnue', { description: JSON.stringify(error.response?.data) });
                    }
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