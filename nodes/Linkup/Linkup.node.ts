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

            // === PARAMÈTRES LINKUP (TOUS NON-OBLIGATOIRES) ===
            {
                displayName: 'Paramètres Linkup',
                name: 'linkupParams',
                type: 'collection',
                placeholder: 'Ajouter un paramètre',
                default: {},
                options: [
                    // AUTH & VERIFICATION
                    {
                        displayName: 'Code de vérification',
                        name: 'verificationCode',
                        type: 'string',
                        default: '',
                        description: 'Code de sécurité reçu par email (verifyCode)',
                    },

                    // URLS
                    {
                        displayName: 'URL profil LinkedIn',
                        name: 'profileUrl',
                        type: 'string',
                        default: '',
                        placeholder: 'https://www.linkedin.com/in/username',
                        description: 'URL du profil LinkedIn (extractProfileInfo, sendConnectionRequest, getInvitationStatus)',
                    },
                    {
                        displayName: 'URL entreprise LinkedIn',
                        name: 'companyUrl',
                        type: 'string',
                        default: '',
                        placeholder: 'https://www.linkedin.com/company/stripe/',
                        description: 'URL de l\'entreprise LinkedIn (getCompanyInfo)',
                    },
                    {
                        displayName: 'URL post LinkedIn',
                        name: 'postUrl',
                        type: 'string',
                        default: '',
                        placeholder: 'https://www.linkedin.com/feed/update/xxx',
                        description: 'URL du post LinkedIn (getPostReactions, reactToPost, repost, commentPost, extractComments, timeSpent)',
                    },
                    {
                        displayName: 'URL destinataire message',
                        name: 'messageRecipientUrl',
                        type: 'string',
                        default: '',
                        placeholder: 'https://www.linkedin.com/in/username',
                        description: 'URL du profil LinkedIn du destinataire (sendMessage)',
                    },

                    // IDENTIFIANTS
                    {
                        displayName: 'Conversation ID',
                        name: 'conversationId',
                        type: 'string',
                        default: '',
                        description: 'Identifiant unique de la conversation LinkedIn (getConversationMessages)',
                    },
                    {
                        displayName: 'Invitation ID',
                        name: 'invitationId',
                        type: 'string',
                        default: '',
                        description: 'ID de l\'invitation à retirer (withdrawInvitation)',
                    },
                    {
                        displayName: 'Shared Secret',
                        name: 'sharedSecret',
                        type: 'string',
                        default: '',
                        description: 'Shared secret de l\'invitation (acceptConnectionInvitation)',
                    },
                    {
                        displayName: 'Entity URN',
                        name: 'entityUrn',
                        type: 'string',
                        default: '',
                        description: 'URN de l\'invitation (acceptConnectionInvitation)',
                    },

                    // POSTS - Champs spécifiques
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
                        description: 'Type de réaction à appliquer (reactToPost)',
                    },
                    {
                        displayName: 'Message/Texte',
                        name: 'messageText',
                        type: 'string',
                        default: '',
                        description: 'Texte du message, commentaire ou post (sendMessage, commentPost, createPost)',
                    },
                    {
                        displayName: 'Lien média',
                        name: 'mediaLink',
                        type: 'string',
                        default: '',
                        description: 'URL directe d\'un média à joindre (sendMessage)',
                    },

                    // ANSWER COMMENT - Champs spécifiques
                    {
                        displayName: 'Tracking ID',
                        name: 'trackingId',
                        type: 'string',
                        default: '',
                        description: 'Tracking ID du post (answerComment)',
                    },
                    {
                        displayName: 'Profile URN',
                        name: 'profileUrn',
                        type: 'string',
                        default: '',
                        description: 'URN du profil qui répond (answerComment)',
                    },
                    {
                        displayName: 'Comment URN',
                        name: 'commentUrn',
                        type: 'string',
                        default: '',
                        description: 'URN du commentaire parent (answerComment)',
                    },
                    {
                        displayName: 'Texte du commentaire',
                        name: 'commentText',
                        type: 'string',
                        default: '',
                        description: 'Texte de la réponse au commentaire (answerComment)',
                    },
                    {
                        displayName: 'Mentionner l\'utilisateur',
                        name: 'mentionUser',
                        type: 'boolean',
                        default: false,
                        description: 'Mentionner l\'utilisateur dans la réponse (answerComment)',
                    },
                    {
                        displayName: 'Nom du commentateur',
                        name: 'commenterName',
                        type: 'string',
                        default: '',
                        description: 'Nom du commentateur original (answerComment)',
                    },

                    // TIME SPENT
                    {
                        displayName: 'Durée (secondes)',
                        name: 'duration',
                        type: 'number',
                        default: 30,
                        description: 'Durée passée sur le post en secondes (timeSpent)',
                    },
                    {
                        displayName: 'Heure de début (timestamp)',
                        name: 'durationStartTime',
                        type: 'number',
                        default: '',
                        description: 'Timestamp Unix du début de visualisation en millisecondes (timeSpent)',
                    },

                    // RECHERCHE & FILTRES
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
                        displayName: 'Type d\'invitation',
                        name: 'invitation_type',
                        type: 'string',
                        default: '',
                        description: 'Type d\'invitation (CONNECTION, ORGANIZATION, etc.)',
                    },

                    // PAGINATION
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

                    // OPTIONS DIVERSES
                    {
                        displayName: 'Afficher état invitation',
                        name: 'fetch_invitation_state',
                        type: 'boolean',
                        default: true,
                        description: 'Inclure l\'état d\'invitation pour chaque profil',
                    },
                    {
                        displayName: 'Message connexion',
                        name: 'connectionMessage',
                        type: 'string',
                        default: '',
                        description: 'Message personnalisé pour invitation (sendConnectionRequest)',
                    },

                    // CHAMPS DATA
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

                    // CHAMPS RECRUITER - Complets
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

                    // CHAMPS CREATE JOB - Complets
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

                    // FICHIER
                    {
                        displayName: 'Fichier',
                        name: 'file',
                        type: 'string',
                        default: '',
                        description: 'Fichier à joindre (createPost, etc.)',
                    },

                    // POSTS RECHERCHE
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

                    // PAYS
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
        
        // Récupérer tous les paramètres Linkup
        const linkupParams = context.getNodeParameter('linkupParams', itemIndex, {}) as Record<string, any>;
        
        // Ajouter le login token si nécessaire (depuis les credentials)
        if (loginToken && !['login', 'verifyCode', 'searchCompaniesData', 'searchProfilesData'].includes(operation)) {
            body.login_token = loginToken;
        }

        // Champs spécifiques par opération avec fallback sur linkupParams
        switch (operation) {
            case 'login':
                const creds = await context.getCredentials('linkupApi');
                if (creds) {
                    body.email = creds.linkedinEmail;
                    body.password = creds.linkedinPassword;
                    body.country = linkupParams.country || creds.country || 'FR';
                }
                break;

            case 'verifyCode':
                const credsVerify = await context.getCredentials('linkupApi');
                if (credsVerify) {
                    body.email = credsVerify.linkedinEmail;
                    body.code = linkupParams.verificationCode;
                    body.country = linkupParams.country || credsVerify.country || 'FR';
                }
                break;

            case 'extractProfileInfo':
                body.linkedin_url = linkupParams.profileUrl;
                break;

            case 'getCompanyInfo':
                body.company_url = linkupParams.companyUrl;
                break;

            case 'sendConnectionRequest':
                body.linkedin_url = linkupParams.profileUrl;
                if (linkupParams.connectionMessage) body.message = linkupParams.connectionMessage;
                break;

            case 'acceptConnectionInvitation':
                body.shared_secret = linkupParams.sharedSecret;
                body.entity_urn = linkupParams.entityUrn;
                break;

            case 'withdrawInvitation':
                body.invitation_id = linkupParams.invitationId;
                break;

            case 'getInvitationStatus':
                body.linkedin_url = linkupParams.profileUrl;
                break;

            case 'sendMessage':
                body.linkedin_url = linkupParams.messageRecipientUrl;
                body.message_text = linkupParams.messageText;
                if (linkupParams.mediaLink) body.media_link = linkupParams.mediaLink;
                break;

            case 'getConversationMessages':
                body.conversation_id = linkupParams.conversationId;
                break;

            case 'getPostReactions':
            case 'repost':
            case 'extractComments':
                body.post_url = linkupParams.postUrl;
                break;

            case 'reactToPost':
                body.post_url = linkupParams.postUrl;
                body.reaction_type = linkupParams.reactionType || 'LIKE';
                break;

            case 'commentPost':
                body.post_url = linkupParams.postUrl;
                body.message = linkupParams.messageText;
                break;

            case 'answerComment':
                body.tracking_id = linkupParams.trackingId;
                body.profile_urn = linkupParams.profileUrn;
                body.comment_urn = linkupParams.commentUrn;
                body.comment_text = linkupParams.commentText;
                body.mention_user = linkupParams.mentionUser || false;
                if (linkupParams.commenterName) body.commenter_name = linkupParams.commenterName;
                break;

            case 'createPost':
                body.message = linkupParams.messageText;
                if (linkupParams.file) body.file = linkupParams.file;
                break;

            case 'timeSpent':
                body.post_url = linkupParams.postUrl;
                body.duration = linkupParams.duration || 30;
                body.duration_start_time = linkupParams.durationStartTime || Date.now();
                break;

            // Opérations RECRUITER
            case 'getCandidates':
                if (linkupParams.yearsOfExperience) body.yearsOfExperience = linkupParams.yearsOfExperience;
                if (linkupParams.sortType) body.sortType = linkupParams.sortType;
                if (linkupParams.sortOrder) body.sortOrder = linkupParams.sortOrder;
                if (linkupParams.ratings) body.ratings = linkupParams.ratings;
                if (linkupParams.start) body.start = linkupParams.start;
                break;

            case 'createJob':
                if (linkupParams.jobTitle) body.title = linkupParams.jobTitle;
                if (linkupParams.place) body.place = linkupParams.place;
                if (linkupParams.html_description) body.html_description = linkupParams.html_description;
                if (linkupParams.employment_status) body.employment_status = linkupParams.employment_status;
                if (linkupParams.workplace) body.workplace = linkupParams.workplace;
                if (linkupParams.skills) {
                    try {
                        body.skills = JSON.parse(linkupParams.skills);
                    } catch {
                        body.skills = linkupParams.skills;
                    }
                }
                if (linkupParams.screening_questions) {
                    try {
                        body.screening_questions = JSON.parse(linkupParams.screening_questions);
                    } catch {
                        body.screening_questions = linkupParams.screening_questions;
                    }
                }
                if (linkupParams.auto_rejection_template) body.auto_rejection_template = linkupParams.auto_rejection_template;
                if (linkupParams.contact_email) body.contact_email = linkupParams.contact_email;
                break;
        }

        // Ajouter tous les autres paramètres de linkupParams (recherche, pagination, etc.)
        for (const [key, value] of Object.entries(linkupParams)) {
            if (value !== undefined && value !== null && value !== '' && !body.hasOwnProperty(key)) {
                body[key] = value;
            }
        }

        // Gestion spéciale pagination vs total_results
        let hasPagination = false;
        if (linkupParams.start_page && linkupParams.start_page !== 1) {
            body.start_page = linkupParams.start_page;
            hasPagination = true;
        }
        if (linkupParams.end_page && linkupParams.end_page !== 1) {
            body.end_page = linkupParams.end_page;
            hasPagination = true;
        }

        // Si pas de pagination explicite, utiliser total_results
        if (!hasPagination && linkupParams.total_results) {
            body.total_results = linkupParams.total_results;
        } else if (!hasPagination && !linkupParams.total_results) {
            // Valeur par défaut seulement pour les opérations qui en ont besoin
            const needsResults = [
                'searchProfile', 'searchCompanies', 'getConnections', 'getReceivedInvitations', 
                'getSentInvitations', 'getNetworkRecommendations', 'getMessageInbox', 
                'getConversationMessages', 'getPostReactions', 'extractComments', 'searchPosts', 
                'getFeed', 'getCandidates', 'getJobPosts', 'searchCompaniesData', 'searchProfilesData'
            ];
            if (needsResults.includes(operation)) {
                body.total_results = 10;
            }
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
                const additionalFields = this.getNodeParameter('additionalFields', i) as any;
                const timeout = additionalFields.timeout || 30000;

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