import {
    IExecuteFunctions,
    INodeExecutionData,
    INodeType,
    INodeTypeDescription,
} from 'n8n-workflow';

// Centralisation des constantes
const LINKUP_API_BASE_URL = 'https://api.linkupapi.com/v1';
const NODE_VERSION = '1.2.0';

// Types pour une meilleure organisation
interface LinkupCredentials {
    apiKey: string;
    email?: string;
    password?: string;
    country?: string;
    loginToken?: string;
}

interface RequestBody {
    [key: string]: any;
}

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
        inputs: ['main'],
        outputs: ['main'],
        credentials: [
            {
                name: 'linkupApi',
                required: true,
            },
        ],
        properties: [
            // === OPERATION SELECTOR ===
            {
                displayName: 'Operation',
                name: 'operation',
                type: 'options',
                noDataExpression: true,
                options: [
                    // AUTH
                    { name: '🔑 AUTH | Login to LinkedIn', value: 'login', description: 'Authentifier votre compte LinkedIn via Linkup' },
                    { name: '🔑 AUTH | Verify security code', value: 'verifyCode', description: 'Valider le code de sécurité reçu par email' },

                    // PROFILE
                    { name: '👤 PROFILE | Get my LinkedIn profile', value: 'getMyProfile', description: 'Récupérer les infos de votre profil LinkedIn' },
                    { name: '👤 PROFILE | Extract LinkedIn profile info', value: 'extractProfileInfo', description: 'Extraire les infos d\'un profil LinkedIn public' },
                    { name: '👤 PROFILE | Search LinkedIn profiles', value: 'searchProfile', description: 'Rechercher des profils LinkedIn' },

                    // COMPANIES
                    { name: '🏢 COMPANIES | Search LinkedIn companies', value: 'searchCompanies', description: 'Rechercher des entreprises LinkedIn' },
                    { name: '🏢 COMPANIES | Get LinkedIn company info', value: 'getCompanyInfo', description: 'Obtenir les infos d\'une entreprise LinkedIn' },

                    // NETWORK
                    { name: '🤝 NETWORK | Send LinkedIn connection request', value: 'sendConnectionRequest', description: 'Envoyer une invitation LinkedIn' },
                    { name: '🤝 NETWORK | Get LinkedIn connections', value: 'getConnections', description: 'Récupérer la liste de vos connexions LinkedIn' },
                    { name: '🤝 NETWORK | Accept LinkedIn connection invitation', value: 'acceptConnectionInvitation', description: 'Accepter une invitation LinkedIn reçue' },
                    { name: '🤝 NETWORK | Get LinkedIn received invitations', value: 'getReceivedInvitations', description: 'Lister les invitations LinkedIn reçues' },
                    { name: '🤝 NETWORK | Get LinkedIn sent invitations', value: 'getSentInvitations', description: 'Lister les invitations LinkedIn envoyées' },
                    { name: '🤝 NETWORK | Withdraw LinkedIn invitation', value: 'withdrawInvitation', description: 'Annuler une invitation LinkedIn envoyée' },
                    { name: '🤝 NETWORK | Get LinkedIn network recommendations', value: 'getNetworkRecommendations', description: 'Obtenir des recommandations de profils à ajouter' },
                    { name: '🤝 NETWORK | Get LinkedIn invitation status', value: 'getInvitationStatus', description: 'Vérifier le statut d\'une invitation LinkedIn' },

                    // MESSAGES
                    { name: '💬 MESSAGES | Send LinkedIn message', value: 'sendMessage', description: 'Envoyer un message LinkedIn' },
                    { name: '💬 MESSAGES | Get LinkedIn message inbox', value: 'getMessageInbox', description: 'Récupérer la liste des conversations LinkedIn' },
                    { name: '💬 MESSAGES | Get LinkedIn conversation messages', value: 'getConversationMessages', description: 'Récupérer l\'historique d\'une conversation LinkedIn' },

                    // POSTS
                    { name: '📝 POSTS | Get post reactions', value: 'getPostReactions', description: 'Récupérer les réactions d\'un post' },
                    { name: '📝 POSTS | React to post', value: 'reactToPost', description: 'Réagir à un post' },
                    { name: '📝 POSTS | Repost', value: 'repost', description: 'Reposter un post' },
                    { name: '📝 POSTS | Comment post', value: 'commentPost', description: 'Commenter un post' },
                    { name: '📝 POSTS | Extract comments', value: 'extractComments', description: 'Extraire les commentaires d\'un post' },
                    { name: '📝 POSTS | Answer comment', value: 'answerComment', description: 'Répondre à un commentaire' },
                    { name: '📝 POSTS | Search posts', value: 'searchPosts', description: 'Rechercher des posts' },
                    { name: '📝 POSTS | Create post', value: 'createPost', description: 'Créer un post' },
                    { name: '📝 POSTS | Get feed', value: 'getFeed', description: 'Récupérer le feed' },
                    { name: '📝 POSTS | Time spent on post', value: 'timeSpent', description: 'Enregistrer le temps passé sur un post' },

                    // RECRUITER
                    { name: '🧑‍💼 RECRUITER | Get LinkedIn candidates', value: 'getCandidates', description: 'Lister les candidats d\'une offre LinkedIn Recruiter' },
                    { name: '🧑‍💼 RECRUITER | Get LinkedIn candidate CV', value: 'getCandidateCV', description: 'Télécharger le CV d\'un candidat LinkedIn Recruiter' },
                    { name: '🧑‍💼 RECRUITER | Get LinkedIn job posts', value: 'getJobPosts', description: 'Lister les offres d\'emploi LinkedIn Recruiter' },
                    { name: '🧑‍💼 RECRUITER | Publish LinkedIn job', value: 'publishJob', description: 'Publier une offre d\'emploi LinkedIn Recruiter' },
                    { name: '🧑‍💼 RECRUITER | Close LinkedIn job', value: 'closeJob', description: 'Fermer une offre d\'emploi LinkedIn Recruiter' },
                    { name: '🧑‍💼 RECRUITER | Create LinkedIn job', value: 'createJob', description: 'Créer une nouvelle offre d\'emploi LinkedIn Recruiter' },

                    // DATA (NOUVEAUX)
                    { name: '📊 DATA | Search companies (Data)', value: 'searchCompaniesData', description: 'Recherche avancée d\'entreprises (Data/Enrichment)' },
                    { name: '📊 DATA | Search profiles (Data)', value: 'searchProfilesData', description: 'Recherche avancée de profils (Data/Enrichment)' },
                ],
                default: 'login',
            },

            // === PARAMÈTRES SPÉCIFIQUES PAR OPÉRATION ===
            
            // AUTH - Paramètres Linkup
            {
                displayName: 'Paramètres Linkup',
                name: 'authParams',
                type: 'collection',
                placeholder: 'Ajouter un paramètre',
                displayOptions: {
                    show: {
                        operation: ['verifyCode'],
                    },
                },
                default: {},
                options: [
                    {
                        displayName: 'Code de vérification',
                        name: 'verificationCode',
                        type: 'string',
                        default: '',
                        description: 'Code de sécurité reçu par email',
                    },
                    {
                        displayName: 'Pays',
                        name: 'country',
                        type: 'options',
                        options: [
                            { name: 'France', value: 'FR' },
                            { name: 'États-Unis', value: 'US' },
                            { name: 'Royaume-Uni', value: 'UK' },
                            { name: 'Allemagne', value: 'DE' },
                            { name: 'Espagne', value: 'ES' },
                            { name: 'Italie', value: 'IT' },
                            { name: 'Canada', value: 'CA' },
                            { name: 'Australie', value: 'AU' },
                        ],
                        default: 'FR',
                        description: 'Code pays pour la sélection du proxy',
                    },
                ],
            },

            // PROFILE - Paramètres Linkup
            {
                displayName: 'Paramètres Linkup',
                name: 'profileParams',
                type: 'collection',
                placeholder: 'Ajouter un paramètre',
                displayOptions: {
                    show: {
                        operation: ['extractProfileInfo', 'sendConnectionRequest', 'getInvitationStatus'],
                    },
                },
                default: {},
                options: [
                    {
                        displayName: 'URL profil LinkedIn',
                        name: 'profileUrl',
                        type: 'string',
                        default: '',
                        placeholder: 'https://www.linkedin.com/in/username',
                        description: 'URL du profil LinkedIn',
                    },
                    {
                        displayName: 'Pays',
                        name: 'country',
                        type: 'options',
                        options: [
                            { name: 'France', value: 'FR' },
                            { name: 'États-Unis', value: 'US' },
                            { name: 'Royaume-Uni', value: 'UK' },
                            { name: 'Allemagne', value: 'DE' },
                            { name: 'Espagne', value: 'ES' },
                            { name: 'Italie', value: 'IT' },
                            { name: 'Canada', value: 'CA' },
                            { name: 'Australie', value: 'AU' },
                        ],
                        default: 'FR',
                        description: 'Code pays pour la sélection du proxy',
                    },
                ],
            },

            // COMPANIES - Paramètres Linkup
            {
                displayName: 'Paramètres Linkup',
                name: 'companiesParams',
                type: 'collection',
                placeholder: 'Ajouter un paramètre',
                displayOptions: {
                    show: {
                        operation: ['getCompanyInfo'],
                    },
                },
                default: {},
                options: [
                    {
                        displayName: 'URL entreprise LinkedIn',
                        name: 'companyUrl',
                        type: 'string',
                        default: '',
                        placeholder: 'https://www.linkedin.com/company/stripe/',
                        description: 'URL de l\'entreprise LinkedIn',
                    },
                    {
                        displayName: 'Pays',
                        name: 'country',
                        type: 'options',
                        options: [
                            { name: 'France', value: 'FR' },
                            { name: 'États-Unis', value: 'US' },
                            { name: 'Royaume-Uni', value: 'UK' },
                            { name: 'Allemagne', value: 'DE' },
                            { name: 'Espagne', value: 'ES' },
                            { name: 'Italie', value: 'IT' },
                            { name: 'Canada', value: 'CA' },
                            { name: 'Australie', value: 'AU' },
                        ],
                        default: 'FR',
                        description: 'Code pays pour la sélection du proxy',
                    },
                ],
            },

            // NETWORK - Paramètres Linkup
            {
                displayName: 'Paramètres Linkup',
                name: 'networkParams',
                type: 'collection',
                placeholder: 'Ajouter un paramètre',
                displayOptions: {
                    show: {
                        operation: ['sendConnectionRequest'],
                    },
                },
                default: {},
                options: [
                    {
                        displayName: 'URL profil LinkedIn',
                        name: 'profileUrl',
                        type: 'string',
                        default: '',
                        placeholder: 'https://www.linkedin.com/in/username',
                        description: 'URL du profil LinkedIn',
                    },
                    {
                        displayName: 'Message connexion',
                        name: 'connectionMessage',
                        type: 'string',
                        default: '',
                        description: 'Message personnalisé pour invitation',
                    },
                    {
                        displayName: 'Pays',
                        name: 'country',
                        type: 'options',
                        options: [
                            { name: 'France', value: 'FR' },
                            { name: 'États-Unis', value: 'US' },
                            { name: 'Royaume-Uni', value: 'UK' },
                            { name: 'Allemagne', value: 'DE' },
                            { name: 'Espagne', value: 'ES' },
                            { name: 'Italie', value: 'IT' },
                            { name: 'Canada', value: 'CA' },
                            { name: 'Australie', value: 'AU' },
                        ],
                        default: 'FR',
                        description: 'Code pays pour la sélection du proxy',
                    },
                ],
            },

            // ACCEPT CONNECTION - Paramètres Linkup
            {
                displayName: 'Paramètres Linkup',
                name: 'acceptConnectionParams',
                type: 'collection',
                placeholder: 'Ajouter un paramètre',
                displayOptions: {
                    show: {
                        operation: ['acceptConnectionInvitation'],
                    },
                },
                default: {},
                options: [
                    {
                        displayName: 'Shared Secret',
                        name: 'sharedSecret',
                        type: 'string',
                        default: '',
                        description: 'Shared secret de l\'invitation',
                    },
                    {
                        displayName: 'Entity URN',
                        name: 'entityUrn',
                        type: 'string',
                        default: '',
                        description: 'URN de l\'invitation',
                    },
                    {
                        displayName: 'Pays',
                        name: 'country',
                        type: 'options',
                        options: [
                            { name: 'France', value: 'FR' },
                            { name: 'États-Unis', value: 'US' },
                            { name: 'Royaume-Uni', value: 'UK' },
                            { name: 'Allemagne', value: 'DE' },
                            { name: 'Espagne', value: 'ES' },
                            { name: 'Italie', value: 'IT' },
                            { name: 'Canada', value: 'CA' },
                            { name: 'Australie', value: 'AU' },
                        ],
                        default: 'FR',
                        description: 'Code pays pour la sélection du proxy',
                    },
                ],
            },

            // WITHDRAW INVITATION - Paramètres Linkup
            {
                displayName: 'Paramètres Linkup',
                name: 'withdrawInvitationParams',
                type: 'collection',
                placeholder: 'Ajouter un paramètre',
                displayOptions: {
                    show: {
                        operation: ['withdrawInvitation'],
                    },
                },
                default: {},
                options: [
                    {
                        displayName: 'Invitation ID',
                        name: 'invitationId',
                        type: 'string',
                        default: '',
                        description: 'ID de l\'invitation à retirer',
                    },
                    {
                        displayName: 'Pays',
                        name: 'country',
                        type: 'options',
                        options: [
                            { name: 'France', value: 'FR' },
                            { name: 'États-Unis', value: 'US' },
                            { name: 'Royaume-Uni', value: 'UK' },
                            { name: 'Allemagne', value: 'DE' },
                            { name: 'Espagne', value: 'ES' },
                            { name: 'Italie', value: 'IT' },
                            { name: 'Canada', value: 'CA' },
                            { name: 'Australie', value: 'AU' },
                        ],
                        default: 'FR',
                        description: 'Code pays pour la sélection du proxy',
                    },
                ],
            },

            // GET INVITATION STATUS - Paramètres Linkup
            {
                displayName: 'Paramètres Linkup',
                name: 'getInvitationStatusParams',
                type: 'collection',
                placeholder: 'Ajouter un paramètre',
                displayOptions: {
                    show: {
                        operation: ['getInvitationStatus'],
                    },
                },
                default: {},
                options: [
                    {
                        displayName: 'URL profil LinkedIn',
                        name: 'profileUrl',
                        type: 'string',
                        default: '',
                        placeholder: 'https://www.linkedin.com/in/username',
                        description: 'URL du profil LinkedIn',
                    },
                    {
                        displayName: 'Pays',
                        name: 'country',
                        type: 'options',
                        options: [
                            { name: 'France', value: 'FR' },
                            { name: 'États-Unis', value: 'US' },
                            { name: 'Royaume-Uni', value: 'UK' },
                            { name: 'Allemagne', value: 'DE' },
                            { name: 'Espagne', value: 'ES' },
                            { name: 'Italie', value: 'IT' },
                            { name: 'Canada', value: 'CA' },
                            { name: 'Australie', value: 'AU' },
                        ],
                        default: 'FR',
                        description: 'Code pays pour la sélection du proxy',
                    },
                ],
            },

            // MESSAGES - Paramètres Linkup
            {
                displayName: 'Paramètres Linkup',
                name: 'messagesParams',
                type: 'collection',
                placeholder: 'Ajouter un paramètre',
                displayOptions: {
                    show: {
                        operation: ['sendMessage'],
                    },
                },
                default: {},
                options: [
                    {
                        displayName: 'URL destinataire message',
                        name: 'messageRecipientUrl',
                        type: 'string',
                        default: '',
                        placeholder: 'https://www.linkedin.com/in/username',
                        description: 'URL du profil LinkedIn du destinataire',
                    },
                    {
                        displayName: 'Texte du message',
                        name: 'messageText',
                        type: 'string',
                        default: '',
                        description: 'Contenu du message à envoyer',
                    },
                    {
                        displayName: 'Lien média',
                        name: 'mediaLink',
                        type: 'string',
                        default: '',
                        description: 'URL directe d\'un média à joindre',
                    },
                    {
                        displayName: 'Pays',
                        name: 'country',
                        type: 'options',
                        options: [
                            { name: 'France', value: 'FR' },
                            { name: 'États-Unis', value: 'US' },
                            { name: 'Royaume-Uni', value: 'UK' },
                            { name: 'Allemagne', value: 'DE' },
                            { name: 'Espagne', value: 'ES' },
                            { name: 'Italie', value: 'IT' },
                            { name: 'Canada', value: 'CA' },
                            { name: 'Australie', value: 'AU' },
                        ],
                        default: 'FR',
                        description: 'Code pays pour la sélection du proxy',
                    },
                ],
            },

            // CONVERSATION MESSAGES - Paramètres Linkup
            {
                displayName: 'Paramètres Linkup',
                name: 'conversationMessagesParams',
                type: 'collection',
                placeholder: 'Ajouter un paramètre',
                displayOptions: {
                    show: {
                        operation: ['getConversationMessages'],
                    },
                },
                default: {},
                options: [
                    {
                        displayName: 'Conversation ID',
                        name: 'conversationId',
                        type: 'string',
                        default: '',
                        description: 'Identifiant unique de la conversation LinkedIn',
                    },
                    {
                        displayName: 'Nombre de résultats',
                        name: 'total_results',
                        type: 'number',
                        default: 10,
                        description: 'Nombre de messages à récupérer',
                    },
                    {
                        displayName: 'Page de début',
                        name: 'start_page',
                        type: 'number',
                        default: 1,
                        description: 'Première page à récupérer',
                    },
                    {
                        displayName: 'Page de fin',
                        name: 'end_page',
                        type: 'number',
                        default: 1,
                        description: 'Dernière page à récupérer',
                    },
                    {
                        displayName: 'Pays',
                        name: 'country',
                        type: 'options',
                        options: [
                            { name: 'France', value: 'FR' },
                            { name: 'États-Unis', value: 'US' },
                            { name: 'Royaume-Uni', value: 'UK' },
                            { name: 'Allemagne', value: 'DE' },
                            { name: 'Espagne', value: 'ES' },
                            { name: 'Italie', value: 'IT' },
                            { name: 'Canada', value: 'CA' },
                            { name: 'Australie', value: 'AU' },
                        ],
                        default: 'FR',
                        description: 'Code pays pour la sélection du proxy',
                    },
                ],
            },

            // POSTS - Paramètres Linkup
            {
                displayName: 'Paramètres Linkup',
                name: 'postsParams',
                type: 'collection',
                placeholder: 'Ajouter un paramètre',
                displayOptions: {
                    show: {
                        operation: ['getPostReactions', 'reactToPost', 'repost', 'commentPost', 'extractComments', 'timeSpent'],
                    },
                },
                default: {},
                options: [
                    {
                        displayName: 'URL post LinkedIn',
                        name: 'postUrl',
                        type: 'string',
                        default: '',
                        placeholder: 'https://www.linkedin.com/feed/update/xxx',
                        description: 'URL du post LinkedIn',
                    },
                    {
                        displayName: 'Type de réaction',
                        name: 'reactionType',
                        type: 'options',
                        options: [
                            { name: '👍 Like', value: 'LIKE' },
                            { name: '🎉 Celebrate', value: 'CELEBRATE' },
                            { name: '💪 Support', value: 'SUPPORT' },
                            { name: '❤️ Love', value: 'LOVE' },
                            { name: '💡 Insightful', value: 'INSIGHTFUL' },
                            { name: '🤔 Curious', value: 'CURIOUS' },
                        ],
                        default: 'LIKE',
                        description: 'Type de réaction à appliquer',
                    },
                    {
                        displayName: 'Message/Texte',
                        name: 'messageText',
                        type: 'string',
                        default: '',
                        description: 'Texte du commentaire',
                    },
                    {
                        displayName: 'Durée (secondes)',
                        name: 'duration',
                        type: 'number',
                        default: 30,
                        description: 'Durée passée sur le post en secondes',
                    },
                    {
                        displayName: 'Heure de début (timestamp)',
                        name: 'durationStartTime',
                        type: 'number',
                        default: '',
                        description: 'Timestamp Unix du début de visualisation en millisecondes',
                    },
                    {
                        displayName: 'Nombre de résultats',
                        name: 'total_results',
                        type: 'number',
                        default: 10,
                        description: 'Nombre de résultats à récupérer',
                    },
                    {
                        displayName: 'Page de début',
                        name: 'start_page',
                        type: 'number',
                        default: 1,
                        description: 'Première page à récupérer',
                    },
                    {
                        displayName: 'Page de fin',
                        name: 'end_page',
                        type: 'number',
                        default: 1,
                        description: 'Dernière page à récupérer',
                    },
                    {
                        displayName: 'Pays',
                        name: 'country',
                        type: 'options',
                        options: [
                            { name: 'France', value: 'FR' },
                            { name: 'États-Unis', value: 'US' },
                            { name: 'Royaume-Uni', value: 'UK' },
                            { name: 'Allemagne', value: 'DE' },
                            { name: 'Espagne', value: 'ES' },
                            { name: 'Italie', value: 'IT' },
                            { name: 'Canada', value: 'CA' },
                            { name: 'Australie', value: 'AU' },
                        ],
                        default: 'FR',
                        description: 'Code pays pour la sélection du proxy',
                    },
                ],
            },

            // ANSWER COMMENT - Paramètres Linkup
            {
                displayName: 'Paramètres Linkup',
                name: 'answerCommentParams',
                type: 'collection',
                placeholder: 'Ajouter un paramètre',
                displayOptions: {
                    show: {
                        operation: ['answerComment'],
                    },
                },
                default: {},
                options: [
                    {
                        displayName: 'Tracking ID',
                        name: 'trackingId',
                        type: 'string',
                        default: '',
                        description: 'Tracking ID du post',
                    },
                    {
                        displayName: 'Profile URN',
                        name: 'profileUrn',
                        type: 'string',
                        default: '',
                        description: 'URN du profil qui répond',
                    },
                    {
                        displayName: 'Comment URN',
                        name: 'commentUrn',
                        type: 'string',
                        default: '',
                        description: 'URN du commentaire parent',
                    },
                    {
                        displayName: 'Texte du commentaire',
                        name: 'commentText',
                        type: 'string',
                        default: '',
                        description: 'Texte de la réponse au commentaire',
                    },
                    {
                        displayName: 'Mentionner l\'utilisateur',
                        name: 'mentionUser',
                        type: 'boolean',
                        default: false,
                        description: 'Mentionner l\'utilisateur dans la réponse',
                    },
                    {
                        displayName: 'Nom du commentateur',
                        name: 'commenterName',
                        type: 'string',
                        default: '',
                        description: 'Nom du commentateur original',
                    },
                    {
                        displayName: 'Pays',
                        name: 'country',
                        type: 'options',
                        options: [
                            { name: 'France', value: 'FR' },
                            { name: 'États-Unis', value: 'US' },
                            { name: 'Royaume-Uni', value: 'UK' },
                            { name: 'Allemagne', value: 'DE' },
                            { name: 'Espagne', value: 'ES' },
                            { name: 'Italie', value: 'IT' },
                            { name: 'Canada', value: 'CA' },
                            { name: 'Australie', value: 'AU' },
                        ],
                        default: 'FR',
                        description: 'Code pays pour la sélection du proxy',
                    },
                ],
            },

            // CREATE POST - Paramètres Linkup
            {
                displayName: 'Paramètres Linkup',
                name: 'createPostParams',
                type: 'collection',
                placeholder: 'Ajouter un paramètre',
                displayOptions: {
                    show: {
                        operation: ['createPost'],
                    },
                },
                default: {},
                options: [
                    {
                        displayName: 'Message/Texte',
                        name: 'messageText',
                        type: 'string',
                        default: '',
                        description: 'Texte du post',
                    },
                    {
                        displayName: 'Fichier',
                        name: 'file',
                        type: 'string',
                        default: '',
                        description: 'Fichier à joindre au post',
                    },
                    {
                        displayName: 'Pays',
                        name: 'country',
                        type: 'options',
                        options: [
                            { name: 'France', value: 'FR' },
                            { name: 'États-Unis', value: 'US' },
                            { name: 'Royaume-Uni', value: 'UK' },
                            { name: 'Allemagne', value: 'DE' },
                            { name: 'Espagne', value: 'ES' },
                            { name: 'Italie', value: 'IT' },
                            { name: 'Canada', value: 'CA' },
                            { name: 'Australie', value: 'AU' },
                        ],
                        default: 'FR',
                        description: 'Code pays pour la sélection du proxy',
                    },
                ],
            },

            // SEARCH - Paramètres Linkup
            {
                displayName: 'Paramètres Linkup',
                name: 'searchParams',
                type: 'collection',
                placeholder: 'Ajouter un paramètre',
                displayOptions: {
                    show: {
                        operation: ['searchProfile', 'searchCompanies', 'searchPosts', 'searchCompaniesData', 'searchProfilesData'],
                    },
                },
                default: {},
                options: [
                    {
                        displayName: 'Mot-clé',
                        name: 'keyword',
                        type: 'string',
                        default: '',
                        description: 'Mot-clé de recherche',
                    },
                    {
                        displayName: 'Lieu(x)',
                        name: 'location',
                        type: 'string',
                        default: '',
                        description: 'Lieu(x) géographique(s) (séparés par ;)',
                    },
                    {
                        displayName: 'Entreprise(s)',
                        name: 'company_url',
                        type: 'string',
                        default: '',
                        description: 'URL(s) d\'entreprise LinkedIn (séparées par ;)',
                    },
                    {
                        displayName: 'École(s)',
                        name: 'school_url',
                        type: 'string',
                        default: '',
                        description: 'URL(s) d\'école LinkedIn (séparées par ;)',
                    },
                    {
                        displayName: 'Réseau',
                        name: 'network',
                        type: 'string',
                        default: '',
                        description: 'Niveau de connexion (F=1er, S=2e, O=hors réseau)',
                    },
                    {
                        displayName: 'Secteur(s)',
                        name: 'sector',
                        type: 'string',
                        default: '',
                        description: 'Secteur(s) d\'activité (séparés par ;)',
                    },
                    {
                        displayName: 'Taille entreprise',
                        name: 'company_size',
                        type: 'string',
                        default: '',
                        description: 'Plage de taille d\'entreprise',
                    },
                    {
                        displayName: 'Prénom',
                        name: 'first_name',
                        type: 'string',
                        default: '',
                        description: 'Filtrer par prénom',
                    },
                    {
                        displayName: 'Nom',
                        name: 'last_name',
                        type: 'string',
                        default: '',
                        description: 'Filtrer par nom',
                    },
                    {
                        displayName: 'Titre/Poste',
                        name: 'title',
                        type: 'string',
                        default: '',
                        description: 'Filtrer par titre/poste',
                    },
                    {
                        displayName: 'Afficher état invitation',
                        name: 'fetch_invitation_state',
                        type: 'boolean',
                        default: true,
                        description: 'Inclure l\'état d\'invitation pour chaque profil',
                    },
                    {
                        displayName: 'Secteur d\'activité (Data)',
                        name: 'industry',
                        type: 'string',
                        default: '',
                        description: 'Secteur d\'activité pour recherche Data',
                    },
                    {
                        displayName: 'Taille d\'équipe (Data)',
                        name: 'employee_range',
                        type: 'string',
                        default: '',
                        description: 'Plage d\'employés (ex: 1-10, 11-50, 51-200)',
                    },
                    {
                        displayName: 'Entreprise fondatrice',
                        name: 'founding_company',
                        type: 'boolean',
                        default: false,
                        description: 'Filtrer les entreprises fondatrices (Data)',
                    },
                    {
                        displayName: 'Titre du poste (Data)',
                        name: 'job_title',
                        type: 'string',
                        default: '',
                        description: 'Titre du poste actuel pour recherche Data',
                    },
                    {
                        displayName: 'École (Data)',
                        name: 'school',
                        type: 'string',
                        default: '',
                        description: 'École ou université pour recherche Data',
                    },
                    {
                        displayName: 'Entreprise actuelle (Data)',
                        name: 'current_company',
                        type: 'string',
                        default: '',
                        description: 'Entreprise actuelle pour recherche Data',
                    },
                    {
                        displayName: 'Type de post',
                        name: 'post_type',
                        type: 'string',
                        default: '',
                        description: 'Type de post à rechercher',
                    },
                    {
                        displayName: 'Trier par',
                        name: 'sort_by',
                        type: 'string',
                        default: '',
                        description: 'Critère de tri des posts',
                    },
                    {
                        displayName: 'Date du post',
                        name: 'post_date',
                        type: 'string',
                        default: '',
                        description: 'Date du post pour filtrer',
                    },
                    {
                        displayName: 'URL LinkedIn (recherche)',
                        name: 'linkedin_url',
                        type: 'string',
                        default: '',
                        description: 'URL LinkedIn pour recherche',
                    },
                    {
                        displayName: 'Nombre de résultats',
                        name: 'total_results',
                        type: 'number',
                        default: 10,
                        description: 'Nombre de résultats à récupérer',
                    },
                    {
                        displayName: 'Page de début',
                        name: 'start_page',
                        type: 'number',
                        default: 1,
                        description: 'Première page à récupérer',
                    },
                    {
                        displayName: 'Page de fin',
                        name: 'end_page',
                        type: 'number',
                        default: 1,
                        description: 'Dernière page à récupérer',
                    },
                    {
                        displayName: 'Pays',
                        name: 'country',
                        type: 'options',
                        options: [
                            { name: 'France', value: 'FR' },
                            { name: 'États-Unis', value: 'US' },
                            { name: 'Royaume-Uni', value: 'UK' },
                            { name: 'Allemagne', value: 'DE' },
                            { name: 'Espagne', value: 'ES' },
                            { name: 'Italie', value: 'IT' },
                            { name: 'Canada', value: 'CA' },
                            { name: 'Australie', value: 'AU' },
                        ],
                        default: 'FR',
                        description: 'Code pays pour la sélection du proxy',
                    },
                ],
            },

            // NETWORK LIST - Paramètres Linkup
            {
                displayName: 'Paramètres Linkup',
                name: 'networkListParams',
                type: 'collection',
                placeholder: 'Ajouter un paramètre',
                displayOptions: {
                    show: {
                        operation: ['getConnections', 'getReceivedInvitations', 'getSentInvitations', 'getNetworkRecommendations', 'getMessageInbox', 'getFeed'],
                    },
                },
                default: {},
                options: [
                    {
                        displayName: 'Type d\'invitation',
                        name: 'invitation_type',
                        type: 'string',
                        default: '',
                        description: 'Type d\'invitation (CONNECTION, ORGANIZATION, etc.)',
                    },
                    {
                        displayName: 'Nombre de résultats',
                        name: 'total_results',
                        type: 'number',
                        default: 10,
                        description: 'Nombre de résultats à récupérer',
                    },
                    {
                        displayName: 'Page de début',
                        name: 'start_page',
                        type: 'number',
                        default: 1,
                        description: 'Première page à récupérer',
                    },
                    {
                        displayName: 'Page de fin',
                        name: 'end_page',
                        type: 'number',
                        default: 1,
                        description: 'Dernière page à récupérer',
                    },
                    {
                        displayName: 'Pays',
                        name: 'country',
                        type: 'options',
                        options: [
                            { name: 'France', value: 'FR' },
                            { name: 'États-Unis', value: 'US' },
                            { name: 'Royaume-Uni', value: 'UK' },
                            { name: 'Allemagne', value: 'DE' },
                            { name: 'Espagne', value: 'ES' },
                            { name: 'Italie', value: 'IT' },
                            { name: 'Canada', value: 'CA' },
                            { name: 'Australie', value: 'AU' },
                        ],
                        default: 'FR',
                        description: 'Code pays pour la sélection du proxy',
                    },
                ],
            },

            // RECRUITER - Paramètres Linkup
            {
                displayName: 'Paramètres Linkup',
                name: 'recruiterParams',
                type: 'collection',
                placeholder: 'Ajouter un paramètre',
                displayOptions: {
                    show: {
                        operation: ['getCandidates', 'getJobPosts'],
                    },
                },
                default: {},
                options: [
                    {
                        displayName: 'Années d\'expérience',
                        name: 'yearsOfExperience',
                        type: 'string',
                        default: '',
                        description: 'Années d\'expérience requises (Recruiter)',
                    },
                    {
                        displayName: 'Type de tri',
                        name: 'sortType',
                        type: 'string',
                        default: '',
                        description: 'Type de tri pour les candidats (Recruiter)',
                    },
                    {
                        displayName: 'Ordre de tri',
                        name: 'sortOrder',
                        type: 'string',
                        default: '',
                        description: 'Ordre de tri (ASC/DESC) (Recruiter)',
                    },
                    {
                        displayName: 'Notes',
                        name: 'ratings',
                        type: 'string',
                        default: '',
                        description: 'Filtrer par notes (Recruiter)',
                    },
                    {
                        displayName: 'Début',
                        name: 'start',
                        type: 'string',
                        default: '',
                        description: 'Point de départ pour la pagination (Recruiter)',
                    },
                    {
                        displayName: 'Nombre de résultats',
                        name: 'total_results',
                        type: 'number',
                        default: 10,
                        description: 'Nombre de résultats à récupérer',
                    },
                    {
                        displayName: 'Page de début',
                        name: 'start_page',
                        type: 'number',
                        default: 1,
                        description: 'Première page à récupérer',
                    },
                    {
                        displayName: 'Page de fin',
                        name: 'end_page',
                        type: 'number',
                        default: 1,
                        description: 'Dernière page à récupérer',
                    },
                    {
                        displayName: 'Pays',
                        name: 'country',
                        type: 'options',
                        options: [
                            { name: 'France', value: 'FR' },
                            { name: 'États-Unis', value: 'US' },
                            { name: 'Royaume-Uni', value: 'UK' },
                            { name: 'Allemagne', value: 'DE' },
                            { name: 'Espagne', value: 'ES' },
                            { name: 'Italie', value: 'IT' },
                            { name: 'Canada', value: 'CA' },
                            { name: 'Australie', value: 'AU' },
                        ],
                        default: 'FR',
                        description: 'Code pays pour la sélection du proxy',
                    },
                ],
            },

            // PUBLISH/CLOSE JOB - Paramètres Linkup
            {
                displayName: 'Paramètres Linkup',
                name: 'publishCloseJobParams',
                type: 'collection',
                placeholder: 'Ajouter un paramètre',
                displayOptions: {
                    show: {
                        operation: ['publishJob', 'closeJob'],
                    },
                },
                default: {},
                options: [
                    {
                        displayName: 'Job ID',
                        name: 'jobId',
                        type: 'string',
                        default: '',
                        description: 'Identifiant unique du job à publier/fermer',
                    },
                    {
                        displayName: 'Pays',
                        name: 'country',
                        type: 'options',
                        options: [
                            { name: 'France', value: 'FR' },
                            { name: 'États-Unis', value: 'US' },
                            { name: 'Royaume-Uni', value: 'UK' },
                            { name: 'Allemagne', value: 'DE' },
                            { name: 'Espagne', value: 'ES' },
                            { name: 'Italie', value: 'IT' },
                            { name: 'Canada', value: 'CA' },
                            { name: 'Australie', value: 'AU' },
                        ],
                        default: 'FR',
                        description: 'Code pays pour la sélection du proxy',
                    },
                ],
            },

            // CREATE JOB - Paramètres Linkup
            {
                displayName: 'Paramètres Linkup',
                name: 'createJobParams',
                type: 'collection',
                placeholder: 'Ajouter un paramètre',
                displayOptions: {
                    show: {
                        operation: ['createJob'],
                    },
                },
                default: {},
                options: [
                    {
                        displayName: 'Titre du poste (Job)',
                        name: 'jobTitle',
                        type: 'string',
                        default: '',
                        description: 'Titre du poste à créer (createJob)',
                    },
                    {
                        displayName: 'Lieu du poste (Job)',
                        name: 'place',
                        type: 'string',
                        default: '',
                        description: 'Lieu du poste (createJob)',
                    },
                    {
                        displayName: 'Description HTML',
                        name: 'html_description',
                        type: 'string',
                        default: '',
                        description: 'Description du poste en HTML (createJob)',
                    },
                    {
                        displayName: 'Statut d\'emploi',
                        name: 'employment_status',
                        type: 'string',
                        default: '',
                        description: 'Statut d\'emploi (CDD, CDI, etc.) (createJob)',
                    },
                    {
                        displayName: 'Lieu de travail',
                        name: 'workplace',
                        type: 'string',
                        default: '',
                        description: 'Type de lieu de travail (Bureau, Remote, etc.) (createJob)',
                    },
                    {
                        displayName: 'Compétences (JSON)',
                        name: 'skills',
                        type: 'string',
                        default: '',
                        description: 'Compétences requises au format JSON array (createJob)',
                    },
                    {
                        displayName: 'Questions de présélection (JSON)',
                        name: 'screening_questions',
                        type: 'string',
                        default: '',
                        description: 'Questions de présélection au format JSON array (createJob)',
                    },
                    {
                        displayName: 'Template de rejet automatique',
                        name: 'auto_rejection_template',
                        type: 'string',
                        default: '',
                        description: 'Template de rejet automatique (createJob)',
                    },
                    {
                        displayName: 'Email de contact',
                        name: 'contact_email',
                        type: 'string',
                        default: '',
                        description: 'Email de contact pour le poste (createJob)',
                    },
                    {
                        displayName: 'Pays',
                        name: 'country',
                        type: 'options',
                        options: [
                            { name: 'France', value: 'FR' },
                            { name: 'États-Unis', value: 'US' },
                            { name: 'Royaume-Uni', value: 'UK' },
                            { name: 'Allemagne', value: 'DE' },
                            { name: 'Espagne', value: 'ES' },
                            { name: 'Italie', value: 'IT' },
                            { name: 'Canada', value: 'CA' },
                            { name: 'Australie', value: 'AU' },
                        ],
                        default: 'FR',
                        description: 'Code pays pour la sélection du proxy',
                    },
                ],
            },

            // === GLOBAL OPTIONS ===
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

    // === UTILITY METHODS ===
    static sanitizeCredentialValue(value: string): string | null {
        if (!value || value.includes('__n8n_BLANK_VALUE_')) {
            return null;
        }
        return value;
    }

    private async getCredentialsWithFallback(
        context: IExecuteFunctions,
        _itemIndex: number
    ): Promise<LinkupCredentials> {
        // Toujours utiliser les credentials sauvegardées (plus de custom credentials)
        const credentials = await context.getCredentials('linkupApi');
        
        if (!credentials) {
            throw new Error('Clé API manquante. Veuillez configurer vos credentials LINKUP dans les paramètres du nœud.');
        }
        
        const apiKey = Linkup.sanitizeCredentialValue(credentials.apiKey as string);
        const email = Linkup.sanitizeCredentialValue(credentials.linkedinEmail as string);
        const password = Linkup.sanitizeCredentialValue(credentials.linkedinPassword as string);
        const country = Linkup.sanitizeCredentialValue(credentials.country as string);
        const loginToken = Linkup.sanitizeCredentialValue(credentials.loginToken as string);

        if (!apiKey) {
            throw new Error('Clé API manquante. Veuillez configurer vos credentials LINKUP dans les paramètres du nœud.');
        }

        return { 
            apiKey: apiKey!, 
            email: email || '', 
            password: password || '', 
            country: country || 'FR',
            loginToken: loginToken || ''
        };
    }

    private buildRequestOptions(
        endpoint: string,
        method: 'POST' | 'GET',
        apiKey: string,
        body: RequestBody,
        timeout: number
    ): any {
        return {
            method,
            url: `${LINKUP_API_BASE_URL}${endpoint}`,
            headers: {
                'x-api-key': apiKey,
                'Content-Type': 'application/json',
                'User-Agent': 'n8n-linkup-node/1.2.0',
            },
            body,
            timeout,
        };
    }

    private async buildRequestBody(
        context: IExecuteFunctions,
        itemIndex: number,
        operation: string,
        loginToken?: string
    ): Promise<RequestBody> {
        const body: RequestBody = {};
        
        // Ajouter le login token si nécessaire (depuis les credentials)
        if (loginToken && !['login', 'verifyCode', 'searchCompaniesData', 'searchProfilesData'].includes(operation)) {
            body.login_token = loginToken;
        }

        // Champs spécifiques par opération
        switch (operation) {
            case 'login':
                const creds = await context.getCredentials('linkupApi');
                if (creds) {
                    body.email = creds.linkedinEmail;
                    body.password = creds.linkedinPassword;
                    body.country = 'FR'; // Par défaut
                }
                break;

            case 'verifyCode':
                const credsVerify = await context.getCredentials('linkupApi');
                if (credsVerify) {
                    body.email = credsVerify.linkedinEmail;
                    const authParams = context.getNodeParameter('authParams', itemIndex, {}) as any;
                    if (authParams.verificationCode) body.code = authParams.verificationCode;
                    if (authParams.country) body.country = authParams.country;
                }
                break;

            case 'extractProfileInfo':
            case 'sendConnectionRequest':
            case 'getInvitationStatus':
                const profileParams = context.getNodeParameter('profileParams', itemIndex, {}) as any;
                if (profileParams.profileUrl) body.linkedin_url = profileParams.profileUrl;
                if (profileParams.country) body.country = profileParams.country;
                if (operation === 'sendConnectionRequest' && profileParams.connectionMessage) {
                    body.message = profileParams.connectionMessage;
                }
                break;

            case 'getCompanyInfo':
                const companiesParams = context.getNodeParameter('companiesParams', itemIndex, {}) as any;
                if (companiesParams.companyUrl) body.company_url = companiesParams.companyUrl;
                if (companiesParams.country) body.country = companiesParams.country;
                break;

            case 'acceptConnectionInvitation':
                const acceptConnectionParams = context.getNodeParameter('acceptConnectionParams', itemIndex, {}) as any;
                if (acceptConnectionParams.sharedSecret) body.shared_secret = acceptConnectionParams.sharedSecret;
                if (acceptConnectionParams.entityUrn) body.entity_urn = acceptConnectionParams.entityUrn;
                if (acceptConnectionParams.country) body.country = acceptConnectionParams.country;
                break;

            case 'withdrawInvitation':
                const withdrawInvitationParams = context.getNodeParameter('withdrawInvitationParams', itemIndex, {}) as any;
                if (withdrawInvitationParams.invitationId) body.invitation_id = withdrawInvitationParams.invitationId;
                if (withdrawInvitationParams.country) body.country = withdrawInvitationParams.country;
                break;

            case 'sendMessage':
                const messagesParams = context.getNodeParameter('messagesParams', itemIndex, {}) as any;
                if (messagesParams.messageRecipientUrl) body.linkedin_url = messagesParams.messageRecipientUrl;
                if (messagesParams.messageText) body.message_text = messagesParams.messageText;
                if (messagesParams.mediaLink) body.media_link = messagesParams.mediaLink;
                if (messagesParams.country) body.country = messagesParams.country;
                break;

            case 'getConversationMessages':
                const conversationMessagesParams = context.getNodeParameter('conversationMessagesParams', itemIndex, {}) as any;
                if (conversationMessagesParams.conversationId) body.conversation_id = conversationMessagesParams.conversationId;
                if (conversationMessagesParams.total_results) body.total_results = conversationMessagesParams.total_results;
                if (conversationMessagesParams.start_page) body.start_page = conversationMessagesParams.start_page;
                if (conversationMessagesParams.end_page) body.end_page = conversationMessagesParams.end_page;
                if (conversationMessagesParams.country) body.country = conversationMessagesParams.country;
                break;

            case 'getPostReactions':
            case 'repost':
            case 'extractComments':
            case 'reactToPost':
            case 'commentPost':
            case 'timeSpent':
                const postsParams = context.getNodeParameter('postsParams', itemIndex, {}) as any;
                if (postsParams.postUrl) body.post_url = postsParams.postUrl;
                if (postsParams.country) body.country = postsParams.country;
                
                // Paramètres spécifiques par opération
                if (operation === 'reactToPost' && postsParams.reactionType) {
                    body.reaction_type = postsParams.reactionType;
                }
                if (operation === 'commentPost' && postsParams.messageText) {
                    body.message = postsParams.messageText;
                }
                if (operation === 'timeSpent') {
                    if (postsParams.duration) body.duration = postsParams.duration;
                    if (postsParams.durationStartTime) body.duration_start_time = postsParams.durationStartTime;
                }
                if (operation === 'getPostReactions' || operation === 'extractComments') {
                    if (postsParams.total_results) body.total_results = postsParams.total_results;
                    if (postsParams.start_page) body.start_page = postsParams.start_page;
                    if (postsParams.end_page) body.end_page = postsParams.end_page;
                }
                break;

            case 'answerComment':
                const answerCommentParams = context.getNodeParameter('answerCommentParams', itemIndex, {}) as any;
                if (answerCommentParams.trackingId) body.tracking_id = answerCommentParams.trackingId;
                if (answerCommentParams.profileUrn) body.profile_urn = answerCommentParams.profileUrn;
                if (answerCommentParams.commentUrn) body.comment_urn = answerCommentParams.commentUrn;
                if (answerCommentParams.commentText) body.comment_text = answerCommentParams.commentText;
                if (answerCommentParams.mentionUser !== undefined) body.mention_user = answerCommentParams.mentionUser;
                if (answerCommentParams.commenterName) body.commenter_name = answerCommentParams.commenterName;
                if (answerCommentParams.country) body.country = answerCommentParams.country;
                break;

            case 'createPost':
                const createPostParams = context.getNodeParameter('createPostParams', itemIndex, {}) as any;
                if (createPostParams.messageText) body.message = createPostParams.messageText;
                if (createPostParams.file) body.file = createPostParams.file;
                if (createPostParams.country) body.country = createPostParams.country;
                break;

            case 'searchProfile':
            case 'searchCompanies':
            case 'searchPosts':
            case 'searchCompaniesData':
            case 'searchProfilesData':
                const searchParams = context.getNodeParameter('searchParams', itemIndex, {}) as any;
                if (searchParams.keyword) body.keyword = searchParams.keyword;
                if (searchParams.country) body.country = searchParams.country;
                
                // Paramètres spécifiques par type de recherche
                if (operation === 'searchProfile') {
                    if (searchParams.location) body.location = searchParams.location;
                    if (searchParams.company_url) body.company_url = searchParams.company_url;
                    if (searchParams.school_url) body.school_url = searchParams.school_url;
                    if (searchParams.network) body.network = searchParams.network;
                    if (searchParams.first_name) body.first_name = searchParams.first_name;
                    if (searchParams.last_name) body.last_name = searchParams.last_name;
                    if (searchParams.title) body.title = searchParams.title;
                    if (searchParams.fetch_invitation_state !== undefined) body.fetch_invitation_state = searchParams.fetch_invitation_state;
                }
                if (operation === 'searchCompanies') {
                    if (searchParams.location) body.location = searchParams.location;
                    if (searchParams.sector) body.sector = searchParams.sector;
                    if (searchParams.company_size) body.company_size = searchParams.company_size;
                }
                if (operation === 'searchCompaniesData') {
                    if (searchParams.industry) body.industry = searchParams.industry;
                    if (searchParams.employee_range) body.employee_range = searchParams.employee_range;
                    if (searchParams.founding_company !== undefined) body.founding_company = searchParams.founding_company;
                }
                if (operation === 'searchProfilesData') {
                    if (searchParams.job_title) body.job_title = searchParams.job_title;
                    if (searchParams.school) body.school = searchParams.school;
                    if (searchParams.current_company) body.current_company = searchParams.current_company;
                }
                if (operation === 'searchPosts') {
                    if (searchParams.post_type) body.post_type = searchParams.post_type;
                    if (searchParams.sort_by) body.sort_by = searchParams.sort_by;
                    if (searchParams.post_date) body.post_date = searchParams.post_date;
                    if (searchParams.linkedin_url) body.linkedin_url = searchParams.linkedin_url;
                }
                
                // Pagination commune
                if (searchParams.total_results) body.total_results = searchParams.total_results;
                if (searchParams.start_page) body.start_page = searchParams.start_page;
                if (searchParams.end_page) body.end_page = searchParams.end_page;
                break;

            case 'getConnections':
            case 'getReceivedInvitations':
            case 'getSentInvitations':
            case 'getNetworkRecommendations':
            case 'getMessageInbox':
            case 'getFeed':
                const networkListParams = context.getNodeParameter('networkListParams', itemIndex, {}) as any;
                if (networkListParams.country) body.country = networkListParams.country;
                
                // Paramètres spécifiques par opération
                if (operation === 'getReceivedInvitations' || operation === 'getSentInvitations') {
                    if (networkListParams.invitation_type) body.invitation_type = networkListParams.invitation_type;
                }
                
                // Pagination commune
                if (networkListParams.total_results) body.total_results = networkListParams.total_results;
                if (networkListParams.start_page) body.start_page = networkListParams.start_page;
                if (networkListParams.end_page) body.end_page = networkListParams.end_page;
                break;

            case 'getCandidates':
            case 'getJobPosts':
                const recruiterParams = context.getNodeParameter('recruiterParams', itemIndex, {}) as any;
                if (recruiterParams.country) body.country = recruiterParams.country;
                
                // Paramètres spécifiques par opération
                if (operation === 'getCandidates') {
                    if (recruiterParams.yearsOfExperience) body.yearsOfExperience = recruiterParams.yearsOfExperience;
                    if (recruiterParams.sortType) body.sortType = recruiterParams.sortType;
                    if (recruiterParams.sortOrder) body.sortOrder = recruiterParams.sortOrder;
                    if (recruiterParams.ratings) body.ratings = recruiterParams.ratings;
                    if (recruiterParams.start) body.start = recruiterParams.start;
                }
                
                // Pagination commune
                if (recruiterParams.total_results) body.total_results = recruiterParams.total_results;
                if (recruiterParams.start_page) body.start_page = recruiterParams.start_page;
                if (recruiterParams.end_page) body.end_page = recruiterParams.end_page;
                break;

            case 'getMyProfile':
                // Pas de paramètres spécifiques, juste le login token
                break;

            case 'getCandidateCV':
                // Pas de paramètres spécifiques, juste le login token
                break;

            case 'publishJob':
            case 'closeJob':
                const publishCloseJobParams = context.getNodeParameter('publishCloseJobParams', itemIndex, {}) as any;
                if (publishCloseJobParams.jobId) body.job_id = publishCloseJobParams.jobId;
                if (publishCloseJobParams.country) body.country = publishCloseJobParams.country;
                break;

            case 'createJob':
                const createJobParams = context.getNodeParameter('createJobParams', itemIndex, {}) as any;
                if (createJobParams.country) body.country = createJobParams.country;
                
                if (createJobParams.jobTitle) body.title = createJobParams.jobTitle;
                if (createJobParams.place) body.place = createJobParams.place;
                if (createJobParams.html_description) body.html_description = createJobParams.html_description;
                if (createJobParams.employment_status) body.employment_status = createJobParams.employment_status;
                if (createJobParams.workplace) body.workplace = createJobParams.workplace;
                if (createJobParams.skills) {
                    try {
                        body.skills = JSON.parse(createJobParams.skills);
                    } catch {
                        body.skills = createJobParams.skills;
                    }
                }
                if (createJobParams.screening_questions) {
                    try {
                        body.screening_questions = JSON.parse(createJobParams.screening_questions);
                    } catch {
                        body.screening_questions = createJobParams.screening_questions;
                    }
                }
                if (createJobParams.auto_rejection_template) body.auto_rejection_template = createJobParams.auto_rejection_template;
                if (createJobParams.contact_email) body.contact_email = createJobParams.contact_email;
                break;
        }

        // Ajouter le pays par défaut si pas spécifié
        if (!body.country) {
            body.country = 'FR';
        }

        return body;
    }

    private getEndpointForOperation(operation: string): string {
        const endpointMap: Record<string, string> = {
            // AUTH
            'login': '/auth/login',
            'verifyCode': '/auth/verify',
            
            // PROFILE
            'getMyProfile': '/profile/me',
            'extractProfileInfo': '/profile/info',
            'searchProfile': '/profile/search',
            
            // COMPANIES
            'searchCompanies': '/companies/search',
            'getCompanyInfo': '/companies/info',
            
            // NETWORK
            'sendConnectionRequest': '/network/connect',
            'getConnections': '/network/connections',
            'acceptConnectionInvitation': '/network/accept-invitations',
            'getReceivedInvitations': '/network/invitations',
            'getSentInvitations': '/network/sent-invitations',
            'withdrawInvitation': '/network/withdraw-invitation',
            'getNetworkRecommendations': '/network/recommendations',
            'getInvitationStatus': '/network/invitation-status',
            
            // MESSAGES
            'sendMessage': '/messages/send',
            'getMessageInbox': '/messages/inbox',
            'getConversationMessages': '/messages/conversation-messages',
            
            // POSTS
            'getPostReactions': '/posts/reactions',
            'reactToPost': '/posts/react',
            'repost': '/posts/repost',
            'commentPost': '/posts/comment',
            'extractComments': '/posts/extract-comments',
            'answerComment': '/posts/answer-comment',
            'searchPosts': '/posts/search',
            'createPost': '/posts/create',
            'getFeed': '/posts/feed',
            'timeSpent': '/posts/time-spent',
            
            // RECRUITER
            'getCandidates': '/recruiter/candidates',
            'getCandidateCV': '/recruiter/cv',
            'getJobPosts': '/recruiter/job-posts',
            'publishJob': '/recruiter/publish-job',
            'closeJob': '/recruiter/close-job',
            'createJob': '/recruiter/create-job',
            
            // DATA (nouveaux)
            'searchCompaniesData': '/data/search/companies',
            'searchProfilesData': '/data/search/profiles',
        };

        return endpointMap[operation] || '/unknown';
    }





    // === MAIN EXECUTION METHOD ===
    async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
        const items = this.getInputData();
        const returnData: INodeExecutionData[] = [];

        for (let i = 0; i < items.length; i++) {
            const operation = this.getNodeParameter('operation', i) as string;

            try {
                const timeout = 30000; // Timeout par défaut

                // Obtenir les credentials
                const creds = await Linkup.prototype.getCredentialsWithFallback.call(this, this, i);
                
                // Construire le body de la requête
                const body = await Linkup.prototype.buildRequestBody.call(this, this, i, operation, creds.loginToken);
                
                // Obtenir l'endpoint
                const endpoint = Linkup.prototype.getEndpointForOperation.call(this, operation);
                
                // Construire les options de requête
                const requestOptions = Linkup.prototype.buildRequestOptions.call(this, endpoint, 'POST', creds.apiKey, body, timeout);

                const response = await this.helpers.httpRequest(requestOptions);
                
                const result = {
                    json: {
                        _debug: {
                            requestBody: body,
                            requestHeaders: requestOptions.headers,
                            endpoint: endpoint,
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
                };
                
                returnData.push(result);
            } catch (error: any) {
                returnData.push({
                    json: {
                        error: error.message || 'Unknown error',
                        operation,
                        timestamp: new Date().toISOString(),
                    },
                    pairedItem: { item: i },
                });
            }
        }

        return [returnData];
    }
}