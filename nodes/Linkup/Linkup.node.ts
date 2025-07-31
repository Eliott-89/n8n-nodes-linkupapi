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
            
            // AUTH - Code de vérification
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
                description: 'Code de sécurité reçu par email',
            },

            // PROFILE - URL profil LinkedIn
            {
                displayName: 'URL profil LinkedIn',
                name: 'profileUrl',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['extractProfileInfo', 'sendConnectionRequest', 'getInvitationStatus'],
                    },
                },
                default: '',
                placeholder: 'https://www.linkedin.com/in/username',
                description: 'URL du profil LinkedIn',
            },

            // COMPANIES - URL entreprise LinkedIn
            {
                displayName: 'URL entreprise LinkedIn',
                name: 'companyUrl',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['getCompanyInfo'],
                    },
                },
                default: '',
                placeholder: 'https://www.linkedin.com/company/stripe/',
                description: 'URL de l\'entreprise LinkedIn',
            },

            // NETWORK - Paramètres spécifiques
            {
                displayName: 'Message connexion',
                name: 'connectionMessage',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['sendConnectionRequest'],
                    },
                },
                default: '',
                description: 'Message personnalisé pour invitation',
            },
            {
                displayName: 'Shared Secret',
                name: 'sharedSecret',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['acceptConnectionInvitation'],
                    },
                },
                default: '',
                description: 'Shared secret de l\'invitation',
            },
            {
                displayName: 'Entity URN',
                name: 'entityUrn',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['acceptConnectionInvitation'],
                    },
                },
                default: '',
                description: 'URN de l\'invitation',
            },
            {
                displayName: 'Invitation ID',
                name: 'invitationId',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['withdrawInvitation'],
                    },
                },
                default: '',
                description: 'ID de l\'invitation à retirer',
            },

            // MESSAGES - Paramètres spécifiques
            {
                displayName: 'URL destinataire message',
                name: 'messageRecipientUrl',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['sendMessage'],
                    },
                },
                default: '',
                placeholder: 'https://www.linkedin.com/in/username',
                description: 'URL du profil LinkedIn du destinataire',
            },
            {
                displayName: 'Texte du message',
                name: 'messageText',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['sendMessage'],
                    },
                },
                default: '',
                description: 'Contenu du message à envoyer',
            },
            {
                displayName: 'Lien média',
                name: 'mediaLink',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['sendMessage'],
                    },
                },
                default: '',
                description: 'URL directe d\'un média à joindre',
            },
            {
                displayName: 'Conversation ID',
                name: 'conversationId',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['getConversationMessages'],
                    },
                },
                default: '',
                description: 'Identifiant unique de la conversation LinkedIn',
            },

            // POSTS - Paramètres spécifiques
            {
                displayName: 'URL post LinkedIn',
                name: 'postUrl',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['getPostReactions', 'reactToPost', 'repost', 'commentPost', 'extractComments', 'timeSpent'],
                    },
                },
                default: '',
                placeholder: 'https://www.linkedin.com/feed/update/xxx',
                description: 'URL du post LinkedIn',
            },
            {
                displayName: 'Type de réaction',
                name: 'reactionType',
                type: 'options',
                displayOptions: {
                    show: {
                        operation: ['reactToPost'],
                    },
                },
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
                displayOptions: {
                    show: {
                        operation: ['commentPost', 'createPost'],
                    },
                },
                default: '',
                description: 'Texte du commentaire ou post',
            },

            // ANSWER COMMENT - Paramètres spécifiques
            {
                displayName: 'Tracking ID',
                name: 'trackingId',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['answerComment'],
                    },
                },
                default: '',
                description: 'Tracking ID du post',
            },
            {
                displayName: 'Profile URN',
                name: 'profileUrn',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['answerComment'],
                    },
                },
                default: '',
                description: 'URN du profil qui répond',
            },
            {
                displayName: 'Comment URN',
                name: 'commentUrn',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['answerComment'],
                    },
                },
                default: '',
                description: 'URN du commentaire parent',
            },
            {
                displayName: 'Texte du commentaire',
                name: 'commentText',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['answerComment'],
                    },
                },
                default: '',
                description: 'Texte de la réponse au commentaire',
            },
            {
                displayName: 'Mentionner l\'utilisateur',
                name: 'mentionUser',
                type: 'boolean',
                displayOptions: {
                    show: {
                        operation: ['answerComment'],
                    },
                },
                default: false,
                description: 'Mentionner l\'utilisateur dans la réponse',
            },
            {
                displayName: 'Nom du commentateur',
                name: 'commenterName',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['answerComment'],
                    },
                },
                default: '',
                description: 'Nom du commentateur original',
            },

            // TIME SPENT
            {
                displayName: 'Durée (secondes)',
                name: 'duration',
                type: 'number',
                displayOptions: {
                    show: {
                        operation: ['timeSpent'],
                    },
                },
                default: 30,
                description: 'Durée passée sur le post en secondes',
            },
            {
                displayName: 'Heure de début (timestamp)',
                name: 'durationStartTime',
                type: 'number',
                displayOptions: {
                    show: {
                        operation: ['timeSpent'],
                    },
                },
                default: '',
                description: 'Timestamp Unix du début de visualisation en millisecondes',
            },

            // RECHERCHE & FILTRES - Paramètres communs
            {
                displayName: 'Mot-clé',
                name: 'keyword',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['searchProfile', 'searchCompanies', 'searchPosts', 'searchCompaniesData', 'searchProfilesData'],
                    },
                },
                default: '',
                description: 'Mot-clé de recherche',
            },
            {
                displayName: 'Lieu(x)',
                name: 'location',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['searchProfile', 'searchCompanies'],
                    },
                },
                default: '',
                description: 'Lieu(x) géographique(s) (séparés par ;)',
            },
            {
                displayName: 'Entreprise(s)',
                name: 'company_url',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['searchProfile'],
                    },
                },
                default: '',
                description: 'URL(s) d\'entreprise LinkedIn (séparées par ;)',
            },
            {
                displayName: 'École(s)',
                name: 'school_url',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['searchProfile'],
                    },
                },
                default: '',
                description: 'URL(s) d\'école LinkedIn (séparées par ;)',
            },
            {
                displayName: 'Réseau',
                name: 'network',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['searchProfile'],
                    },
                },
                default: '',
                description: 'Niveau de connexion (F=1er, S=2e, O=hors réseau)',
            },
            {
                displayName: 'Secteur(s)',
                name: 'sector',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['searchCompanies'],
                    },
                },
                default: '',
                description: 'Secteur(s) d\'activité (séparés par ;)',
            },
            {
                displayName: 'Taille entreprise',
                name: 'company_size',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['searchCompanies'],
                    },
                },
                default: '',
                description: 'Plage de taille d\'entreprise',
            },
            {
                displayName: 'Prénom',
                name: 'first_name',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['searchProfile'],
                    },
                },
                default: '',
                description: 'Filtrer par prénom',
            },
            {
                displayName: 'Nom',
                name: 'last_name',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['searchProfile'],
                    },
                },
                default: '',
                description: 'Filtrer par nom',
            },
            {
                displayName: 'Titre/Poste',
                name: 'title',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['searchProfile'],
                    },
                },
                default: '',
                description: 'Filtrer par titre/poste',
            },
            {
                displayName: 'Type d\'invitation',
                name: 'invitation_type',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['getReceivedInvitations', 'getSentInvitations'],
                    },
                },
                default: '',
                description: 'Type d\'invitation (CONNECTION, ORGANIZATION, etc.)',
            },

            // PAGINATION - Paramètres communs
            {
                displayName: 'Nombre de résultats',
                name: 'total_results',
                type: 'number',
                displayOptions: {
                    show: {
                        operation: ['searchProfile', 'searchCompanies', 'getConnections', 'getReceivedInvitations', 
                                   'getSentInvitations', 'getNetworkRecommendations', 'getMessageInbox', 
                                   'getConversationMessages', 'getPostReactions', 'extractComments', 'searchPosts', 
                                   'getFeed', 'getCandidates', 'getJobPosts', 'searchCompaniesData', 'searchProfilesData'],
                    },
                },
                default: 10,
                description: 'Nombre de résultats à récupérer',
            },
            {
                displayName: 'Page de début',
                name: 'start_page',
                type: 'number',
                displayOptions: {
                    show: {
                        operation: ['searchProfile', 'searchCompanies', 'getConnections', 'getReceivedInvitations', 
                                   'getSentInvitations', 'getNetworkRecommendations', 'getMessageInbox', 
                                   'getConversationMessages', 'getPostReactions', 'extractComments', 'searchPosts', 
                                   'getFeed', 'getCandidates', 'getJobPosts', 'searchCompaniesData', 'searchProfilesData'],
                    },
                },
                default: 1,
                description: 'Première page à récupérer',
            },
            {
                displayName: 'Page de fin',
                name: 'end_page',
                type: 'number',
                displayOptions: {
                    show: {
                        operation: ['searchProfile', 'searchCompanies', 'getConnections', 'getReceivedInvitations', 
                                   'getSentInvitations', 'getNetworkRecommendations', 'getMessageInbox', 
                                   'getConversationMessages', 'getPostReactions', 'extractComments', 'searchPosts', 
                                   'getFeed', 'getCandidates', 'getJobPosts', 'searchCompaniesData', 'searchProfilesData'],
                    },
                },
                default: 1,
                description: 'Dernière page à récupérer',
            },

            // OPTIONS DIVERSES
            {
                displayName: 'Afficher état invitation',
                name: 'fetch_invitation_state',
                type: 'boolean',
                displayOptions: {
                    show: {
                        operation: ['searchProfile'],
                    },
                },
                default: true,
                description: 'Inclure l\'état d\'invitation pour chaque profil',
            },

            // CHAMPS DATA
            {
                displayName: 'Secteur d\'activité (Data)',
                name: 'industry',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['searchCompaniesData'],
                    },
                },
                default: '',
                description: 'Secteur d\'activité pour recherche Data',
            },
            {
                displayName: 'Taille d\'équipe (Data)',
                name: 'employee_range',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['searchCompaniesData'],
                    },
                },
                default: '',
                description: 'Plage d\'employés (ex: 1-10, 11-50, 51-200)',
            },
            {
                displayName: 'Entreprise fondatrice',
                name: 'founding_company',
                type: 'boolean',
                displayOptions: {
                    show: {
                        operation: ['searchCompaniesData'],
                    },
                },
                default: false,
                description: 'Filtrer les entreprises fondatrices (Data)',
            },
            {
                displayName: 'Titre du poste (Data)',
                name: 'job_title',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['searchProfilesData'],
                    },
                },
                default: '',
                description: 'Titre du poste actuel pour recherche Data',
            },
            {
                displayName: 'École (Data)',
                name: 'school',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['searchProfilesData'],
                    },
                },
                default: '',
                description: 'École ou université pour recherche Data',
            },
            {
                displayName: 'Entreprise actuelle (Data)',
                name: 'current_company',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['searchProfilesData'],
                    },
                },
                default: '',
                description: 'Entreprise actuelle pour recherche Data',
            },

            // CHAMPS RECRUITER
            {
                displayName: 'Années d\'expérience',
                name: 'yearsOfExperience',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['getCandidates'],
                    },
                },
                default: '',
                description: 'Années d\'expérience requises (Recruiter)',
            },
            {
                displayName: 'Type de tri',
                name: 'sortType',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['getCandidates'],
                    },
                },
                default: '',
                description: 'Type de tri pour les candidats (Recruiter)',
            },
            {
                displayName: 'Ordre de tri',
                name: 'sortOrder',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['getCandidates'],
                    },
                },
                default: '',
                description: 'Ordre de tri (ASC/DESC) (Recruiter)',
            },
            {
                displayName: 'Notes',
                name: 'ratings',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['getCandidates'],
                    },
                },
                default: '',
                description: 'Filtrer par notes (Recruiter)',
            },
            {
                displayName: 'Début',
                name: 'start',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['getCandidates'],
                    },
                },
                default: '',
                description: 'Point de départ pour la pagination (Recruiter)',
            },

            // CHAMPS CREATE JOB
            {
                displayName: 'Titre du poste (Job)',
                name: 'jobTitle',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['createJob'],
                    },
                },
                default: '',
                description: 'Titre du poste à créer (createJob)',
            },
            {
                displayName: 'Lieu du poste (Job)',
                name: 'place',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['createJob'],
                    },
                },
                default: '',
                description: 'Lieu du poste (createJob)',
            },
            {
                displayName: 'Description HTML',
                name: 'html_description',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['createJob'],
                    },
                },
                default: '',
                description: 'Description du poste en HTML (createJob)',
            },
            {
                displayName: 'Statut d\'emploi',
                name: 'employment_status',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['createJob'],
                    },
                },
                default: '',
                description: 'Statut d\'emploi (CDD, CDI, etc.) (createJob)',
            },
            {
                displayName: 'Lieu de travail',
                name: 'workplace',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['createJob'],
                    },
                },
                default: '',
                description: 'Type de lieu de travail (Bureau, Remote, etc.) (createJob)',
            },
            {
                displayName: 'Compétences (JSON)',
                name: 'skills',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['createJob'],
                    },
                },
                default: '',
                description: 'Compétences requises au format JSON array (createJob)',
            },
            {
                displayName: 'Questions de présélection (JSON)',
                name: 'screening_questions',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['createJob'],
                    },
                },
                default: '',
                description: 'Questions de présélection au format JSON array (createJob)',
            },
            {
                displayName: 'Template de rejet automatique',
                name: 'auto_rejection_template',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['createJob'],
                    },
                },
                default: '',
                description: 'Template de rejet automatique (createJob)',
            },
            {
                displayName: 'Email de contact',
                name: 'contact_email',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['createJob'],
                    },
                },
                default: '',
                description: 'Email de contact pour le poste (createJob)',
            },

            // FICHIER
            {
                displayName: 'Fichier',
                name: 'file',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['createPost'],
                    },
                },
                default: '',
                description: 'Fichier à joindre (createPost, etc.)',
            },

            // POSTS RECHERCHE
            {
                displayName: 'Type de post',
                name: 'post_type',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['searchPosts'],
                    },
                },
                default: '',
                description: 'Type de post à rechercher',
            },
            {
                displayName: 'Trier par',
                name: 'sort_by',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['searchPosts'],
                    },
                },
                default: '',
                description: 'Critère de tri des posts',
            },
            {
                displayName: 'Date du post',
                name: 'post_date',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['searchPosts'],
                    },
                },
                default: '',
                description: 'Date du post pour filtrer',
            },
            {
                displayName: 'URL LinkedIn (recherche)',
                name: 'linkedin_url',
                type: 'string',
                displayOptions: {
                    show: {
                        operation: ['searchPosts'],
                    },
                },
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
                    const country = context.getNodeParameter('country', itemIndex, 'FR') as string;
                    body.country = country;
                }
                break;

            case 'verifyCode':
                const credsVerify = await context.getCredentials('linkupApi');
                if (credsVerify) {
                    body.email = credsVerify.linkedinEmail;
                    const verificationCode = context.getNodeParameter('verificationCode', itemIndex, '') as string;
                    body.code = verificationCode;
                    const country = context.getNodeParameter('country', itemIndex, 'FR') as string;
                    body.country = country;
                }
                break;

            case 'extractProfileInfo':
                const profileUrl = context.getNodeParameter('profileUrl', itemIndex, '') as string;
                body.linkedin_url = profileUrl;
                break;

            case 'getCompanyInfo':
                const companyUrl = context.getNodeParameter('companyUrl', itemIndex, '') as string;
                body.company_url = companyUrl;
                break;

            case 'sendConnectionRequest':
                const profileUrlConnect = context.getNodeParameter('profileUrl', itemIndex, '') as string;
                body.linkedin_url = profileUrlConnect;
                const connectionMessage = context.getNodeParameter('connectionMessage', itemIndex, '') as string;
                if (connectionMessage) body.message = connectionMessage;
                break;

            case 'acceptConnectionInvitation':
                const sharedSecret = context.getNodeParameter('sharedSecret', itemIndex, '') as string;
                const entityUrn = context.getNodeParameter('entityUrn', itemIndex, '') as string;
                body.shared_secret = sharedSecret;
                body.entity_urn = entityUrn;
                break;

            case 'withdrawInvitation':
                const invitationId = context.getNodeParameter('invitationId', itemIndex, '') as string;
                body.invitation_id = invitationId;
                break;

            case 'getInvitationStatus':
                const profileUrlStatus = context.getNodeParameter('profileUrl', itemIndex, '') as string;
                body.linkedin_url = profileUrlStatus;
                break;

            case 'sendMessage':
                const messageRecipientUrl = context.getNodeParameter('messageRecipientUrl', itemIndex, '') as string;
                const messageText = context.getNodeParameter('messageText', itemIndex, '') as string;
                const mediaLink = context.getNodeParameter('mediaLink', itemIndex, '') as string;
                body.linkedin_url = messageRecipientUrl;
                body.message_text = messageText;
                if (mediaLink) body.media_link = mediaLink;
                break;

            case 'getConversationMessages':
                const conversationId = context.getNodeParameter('conversationId', itemIndex, '') as string;
                body.conversation_id = conversationId;
                break;

            case 'getPostReactions':
            case 'repost':
            case 'extractComments':
                const postUrl = context.getNodeParameter('postUrl', itemIndex, '') as string;
                body.post_url = postUrl;
                break;

            case 'reactToPost':
                const postUrlReact = context.getNodeParameter('postUrl', itemIndex, '') as string;
                const reactionType = context.getNodeParameter('reactionType', itemIndex, 'LIKE') as string;
                body.post_url = postUrlReact;
                body.reaction_type = reactionType;
                break;

            case 'commentPost':
                const postUrlComment = context.getNodeParameter('postUrl', itemIndex, '') as string;
                const commentText = context.getNodeParameter('messageText', itemIndex, '') as string;
                body.post_url = postUrlComment;
                body.message = commentText;
                break;

            case 'answerComment':
                const trackingId = context.getNodeParameter('trackingId', itemIndex, '') as string;
                const profileUrn = context.getNodeParameter('profileUrn', itemIndex, '') as string;
                const commentUrn = context.getNodeParameter('commentUrn', itemIndex, '') as string;
                const answerText = context.getNodeParameter('commentText', itemIndex, '') as string;
                const mentionUser = context.getNodeParameter('mentionUser', itemIndex, false) as boolean;
                const commenterName = context.getNodeParameter('commenterName', itemIndex, '') as string;
                body.tracking_id = trackingId;
                body.profile_urn = profileUrn;
                body.comment_urn = commentUrn;
                body.comment_text = answerText;
                body.mention_user = mentionUser;
                if (commenterName) body.commenter_name = commenterName;
                break;

            case 'createPost':
                const postText = context.getNodeParameter('messageText', itemIndex, '') as string;
                const file = context.getNodeParameter('file', itemIndex, '') as string;
                body.message = postText;
                if (file) body.file = file;
                break;

            case 'timeSpent':
                const postUrlTime = context.getNodeParameter('postUrl', itemIndex, '') as string;
                const duration = context.getNodeParameter('duration', itemIndex, 30) as number;
                const durationStartTime = context.getNodeParameter('durationStartTime', itemIndex, Date.now()) as number;
                body.post_url = postUrlTime;
                body.duration = duration;
                body.duration_start_time = durationStartTime;
                break;

            // Opérations RECRUITER
            case 'getCandidates':
                const yearsOfExperience = context.getNodeParameter('yearsOfExperience', itemIndex, '') as string;
                const sortType = context.getNodeParameter('sortType', itemIndex, '') as string;
                const sortOrder = context.getNodeParameter('sortOrder', itemIndex, '') as string;
                const ratings = context.getNodeParameter('ratings', itemIndex, '') as string;
                const start = context.getNodeParameter('start', itemIndex, '') as string;
                if (yearsOfExperience) body.yearsOfExperience = yearsOfExperience;
                if (sortType) body.sortType = sortType;
                if (sortOrder) body.sortOrder = sortOrder;
                if (ratings) body.ratings = ratings;
                if (start) body.start = start;
                break;

            case 'createJob':
                const jobTitle = context.getNodeParameter('jobTitle', itemIndex, '') as string;
                const place = context.getNodeParameter('place', itemIndex, '') as string;
                const htmlDescription = context.getNodeParameter('html_description', itemIndex, '') as string;
                const employmentStatus = context.getNodeParameter('employment_status', itemIndex, '') as string;
                const workplace = context.getNodeParameter('workplace', itemIndex, '') as string;
                const skills = context.getNodeParameter('skills', itemIndex, '') as string;
                const screeningQuestions = context.getNodeParameter('screening_questions', itemIndex, '') as string;
                const autoRejectionTemplate = context.getNodeParameter('auto_rejection_template', itemIndex, '') as string;
                const contactEmail = context.getNodeParameter('contact_email', itemIndex, '') as string;
                if (jobTitle) body.title = jobTitle;
                if (place) body.place = place;
                if (htmlDescription) body.html_description = htmlDescription;
                if (employmentStatus) body.employment_status = employmentStatus;
                if (workplace) body.workplace = workplace;
                if (skills) {
                    try {
                        body.skills = JSON.parse(skills);
                    } catch {
                        body.skills = skills;
                    }
                }
                if (screeningQuestions) {
                    try {
                        body.screening_questions = JSON.parse(screeningQuestions);
                    } catch {
                        body.screening_questions = screeningQuestions;
                    }
                }
                if (autoRejectionTemplate) body.auto_rejection_template = autoRejectionTemplate;
                if (contactEmail) body.contact_email = contactEmail;
                break;
        }

        // Ajouter les paramètres communs selon l'opération
        const commonParams = ['keyword', 'location', 'company_url', 'school_url', 'network', 'sector', 
                             'company_size', 'first_name', 'last_name', 'title', 'invitation_type',
                             'total_results', 'start_page', 'end_page', 'fetch_invitation_state',
                             'industry', 'employee_range', 'founding_company', 'job_title', 'school', 
                             'current_company', 'post_type', 'sort_by', 'post_date', 'linkedin_url'];

        for (const param of commonParams) {
            try {
                const value = context.getNodeParameter(param, itemIndex, '') as any;
                if (value !== undefined && value !== null && value !== '' && value !== 0) {
                    body[param] = value;
                }
            } catch {
                // Paramètre non disponible pour cette opération
            }
        }

        // Ajouter le pays par défaut si pas spécifié
        if (!body.country) {
            const country = context.getNodeParameter('country', itemIndex, 'FR') as string;
            body.country = country;
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