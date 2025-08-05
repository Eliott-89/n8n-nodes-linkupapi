import {
  IExecuteFunctions,
  INodeExecutionData,
  INodeType,
  INodeTypeDescription,
} from "n8n-workflow";

// Centralisation des constantes
const LINKUP_API_BASE_URL = "https://api.linkupapi.com/v1";
const NODE_VERSION = "1.3.11";

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
    displayName: "Linkup API for LinkedIn",
    name: "linkup",
    icon: "file:linkup.svg",
    group: ["transform"],
    version: 1,
    description: "Automate LinkedIn with Linkup",
    defaults: {
      name: "LINKUP",
      color: "#0077b5",
    },
    inputs: ["main"],
    outputs: ["main"],
    credentials: [
      {
        name: "linkupApi",
      },
    ],
    properties: [
      // === INFORMATION PANEL ===
      {
        displayName: `Welcome to <b>Linkup API</b> for LinkedIn automation! 🚀<br/><br/>
                If you don't have an account yet, <a href="https://linkupapi.com" target="_blank">visit this page</a> to create your account and get your API key.<br/><br/>
                This powerful API allows you to automate all your LinkedIn activities including profile management, networking, messaging, and content creation.`,
        name: "notice",
        type: "notice" as any,
        default: "",
        displayOptions: {
          show: {
            operation: ["login"],
          },
        },
      },

      // === OPERATION SELECTOR ===
      {
        displayName: "Resource",
        name: "resource",
        type: "options",
        noDataExpression: true,
        options: [
          {
            name: "Authentication",
            value: "authentication",
          },
          {
            name: "Profile",
            value: "profile",
          },
          {
            name: "Company",
            value: "company",
          },
          {
            name: "Network",
            value: "network",
          },
          {
            name: "Message",
            value: "message",
          },
          {
            name: "Post",
            value: "post",
          },
          {
            name: "Recruiter",
            value: "recruiter",
          },
          {
            name: "Signal",
            value: "signal",
          },
          {
            name: "Company",
            value: "companyApi",
          },
          {
            name: "Person",
            value: "personApi",
          },
        ],
        default: "authentication",
      },
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: ["authentication"],
          },
        },
        options: [
          {
            name: "Login",
            value: "login",
            description:
              "Authenticate your LinkedIn account via Linkup - [Get API key at LinkupAPI.com](https://linkupapi.com)",
          },
          {
            name: "Verify Code",
            value: "verifyCode",
            description: "Validate the security code received by email",
          },
        ],
        default: "login",
      },
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: ["profile"],
          },
        },
        options: [
          {
            name: "Get My Profile",
            value: "getMyProfile",
            description: "Get your LinkedIn profile information",
          },
          {
            name: "Extract Profile Information",
            value: "extractProfileInfo",
            description: "Extract information from a public LinkedIn profile",
          },
          {
            name: "Search Profile",
            value: "searchProfile",
            description: "Search LinkedIn profiles",
          },
        ],
        default: "getMyProfile",
      },
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: ["company"],
          },
        },
        options: [
          {
            name: "Search Companies",
            value: "searchCompanies",
            description: "Search LinkedIn companies",
          },
          {
            name: "Get Company Information",
            value: "getCompanyInfo",
            description: "Get LinkedIn company information",
          },
        ],
        default: "searchCompanies",
      },
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: ["network"],
          },
        },
        options: [
          {
            name: "Send Connection Request",
            value: "sendConnectionRequest",
            description: "Send a LinkedIn invitation",
          },
          {
            name: "Get Connections",
            value: "getConnections",
            description: "Get your LinkedIn connections list",
          },
          {
            name: "Accept Connection Invitation",
            value: "acceptConnectionInvitation",
            description: "Accept a received LinkedIn invitation",
          },
          {
            name: "Get Received Invitations",
            value: "getReceivedInvitations",
            description: "List received LinkedIn invitations",
          },
          {
            name: "Get Sent Invitations",
            value: "getSentInvitations",
            description: "List sent LinkedIn invitations",
          },
          {
            name: "Withdraw Invitation",
            value: "withdrawInvitation",
            description: "Cancel a sent LinkedIn invitation",
          },
          {
            name: "Get Network Recommendations",
            value: "getNetworkRecommendations",
            description: "Get profile recommendations to add",
          },
          {
            name: "Get Invitation Status",
            value: "getInvitationStatus",
            description: "Check LinkedIn invitation status",
          },
        ],
        default: "sendConnectionRequest",
      },
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: ["message"],
          },
        },
        options: [
          {
            name: "Send Message",
            value: "sendMessage",
            description: "Send a LinkedIn message",
          },
          {
            name: "Get Message Inbox",
            value: "getMessageInbox",
            description: "Get LinkedIn conversations list",
          },
          {
            name: "Get Conversation Messages",
            value: "getConversationMessages",
            description: "Get LinkedIn conversation history",
          },
        ],
        default: "sendMessage",
      },
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: ["post"],
          },
        },
        options: [
          {
            name: "Get post reactions",
            value: "getPostReactions",
            description: "Get post reactions",
          },
          {
            name: "React to post",
            value: "reactToPost",
            description: "React to a post",
          },
          {
            name: "Repost content",
            value: "repost",
            description: "Repost a post",
          },
          {
            name: "Add comment to post",
            value: "commentPost",
            description: "Comment on a post",
          },
          {
            name: "Get comments",
            value: "extractComments",
            description: "Extract post comments",
          },
          {
            name: "Answer comment",
            value: "answerComment",
            description: "Reply to a comment",
          },
          {
            name: "Search posts",
            value: "searchPosts",
            description: "Search posts",
          },
          {
            name: "Create a post",
            value: "createPost",
            description: "Create a post",
          },
          {
            name: "Get LinkedIn feed",
            value: "getFeed",
            description: "Get feed",
          },
          {
            name: "Send post time spent signal",
            value: "timeSpent",
            description: "Record time spent on a post",
          },
        ],
        default: "getPostReactions",
      },
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: ["recruiter"],
          },
        },
        options: [
          {
            name: "Get candidates",
            value: "getCandidates",
            description:
              "List candidates from a LinkedIn Recruiter job posting",
          },
          {
            name: "Get candidate CV",
            value: "getCandidateCV",
            description: "Download a LinkedIn Recruiter candidate CV",
          },
          {
            name: "Get job posts",
            value: "getJobPosts",
            description: "List LinkedIn Recruiter job postings",
          },
          {
            name: "Publish job",
            value: "publishJob",
            description: "Publish a LinkedIn Recruiter job posting",
          },
          {
            name: "Close job",
            value: "closeJob",
            description: "Close a LinkedIn Recruiter job posting",
          },
          {
            name: "Create job",
            value: "createJob",
            description: "Create a new LinkedIn Recruiter job posting",
          },
        ],
        default: "getCandidates",
      },
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: ["signal"],
          },
        },
        options: [
          {
            name: "Extract post reactions",
            value: "extractPostReactions",
            description: "Extract reactions from a LinkedIn post",
          },
          {
            name: "Extract post comments",
            value: "extractPostComments",
            description: "Extract comments from a LinkedIn post",
          },
          {
            name: "Extract profile reactions",
            value: "extractProfileReactions",
            description: "Extract reactions from a LinkedIn profile",
          },
          {
            name: "Extract profile comments",
            value: "extractProfileComments",
            description: "Extract comments from a LinkedIn profile",
          },
          {
            name: "Extract profile posts",
            value: "extractProfilePosts",
            description: "Extract posts from a LinkedIn profile",
          },
          {
            name: "Extract company posts",
            value: "extractCompanyPosts",
            description: "Extract posts from a LinkedIn company",
          },
        ],
        default: "extractPostReactions",
      },
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: ["companyApi"],
          },
        },
        options: [
          {
            name: "Search companies",
            value: "searchCompaniesApi",
            description: "Search companies using Company API",
          },
          {
            name: "Get company information",
            value: "getCompanyInfoApi",
            description: "Get detailed company information",
          },
          {
            name: "Get company information by domain",
            value: "getCompanyInfoByDomain",
            description: "Get company information using domain name",
          },
        ],
        default: "searchCompaniesApi",
      },
      {
        displayName: "Operation",
        name: "operation",
        type: "options",
        noDataExpression: true,
        displayOptions: {
          show: {
            resource: ["personApi"],
          },
        },
        options: [
          {
            name: "Search profiles",
            value: "searchProfilesApi",
            description: "Search profiles using Person API",
          },
          {
            name: "Extract profile information",
            value: "extractProfileInfoApi",
            description: "Extract detailed profile information",
          },
          {
            name: "Profile enrichment",
            value: "profileEnrichment",
            description: "Enrich profile with additional data",
          },
        ],
        default: "searchProfilesApi",
      },

      // === PARAMÈTRES SPÉCIFIQUES PAR OPÉRATION ===

      // AUTH - Paramètres Linkup
      {
        displayName: "Verification Code *",
        name: "verificationCode",
        type: "string",
        default: "",
        required: true,
        displayOptions: {
          show: {
            operation: ["verifyCode"],
          },
        },
        description: "Security code received by email",
      },
      {
        displayName: "Country Code",
        name: "country",
        type: "string",
        default: "FR",
        placeholder: "FR, US, UK, DE, ES, IT, CA, AU, etc.",
        displayOptions: {
          show: {
            operation: ["verifyCode"],
          },
        },
        description:
          "Country code for proxy selection (e.g., FR for France, US for United States)",
      },

      // PROFILE - Paramètres Linkup
      {
        displayName: "LinkedIn Profile URL *",
        name: "profileUrl",
        type: "string",
        default: "",
        required: true,
        placeholder: "https://www.linkedin.com/in/username",
        displayOptions: {
          show: {
            operation: ["extractProfileInfo", "getInvitationStatus"],
          },
        },
        description: "LinkedIn profile URL",
      },
      {
        displayName: "Country Code",
        name: "country",
        type: "string",
        default: "FR",
        placeholder: "FR, US, UK, DE, ES, IT, CA, AU, etc.",
        displayOptions: {
          show: {
            operation: ["extractProfileInfo", "getInvitationStatus"],
          },
        },
        description:
          "Country code for proxy selection (e.g., FR for France, US for United States)",
      },

      // COMPANIES - Paramètres Linkup
      {
        displayName: "Linkup Parameters",
        name: "companiesParams",
        type: "collection",
        placeholder: "Add a parameter",
        displayOptions: {
          show: {
            operation: ["getCompanyInfo"],
          },
        },
        default: {},
        options: [
          {
            displayName: "LinkedIn Company URL *",
            name: "companyUrl",
            type: "string",
            default: "",
            placeholder: "https://www.linkedin.com/company/stripe/",
            description: "LinkedIn company URL",
          },
          {
            displayName: "Country Code",
            name: "country",
            type: "string",
            default: "FR",
            placeholder: "FR, US, UK, DE, ES, IT, CA, AU, etc.",
            description:
              "Country code for proxy selection (e.g., FR for France, US for United States)",
          },
        ],
      },

      // NETWORK - Paramètres Linkup
      {
        displayName: "Linkup Parameters",
        name: "networkParams",
        type: "collection",
        placeholder: "Add a parameter",
        displayOptions: {
          show: {
            operation: ["sendConnectionRequest"],
          },
        },
        default: {},
        options: [
          {
            displayName: "LinkedIn Profile URL *",
            name: "profileUrl",
            type: "string",
            default: "",
            placeholder: "https://www.linkedin.com/in/username",
            description: "LinkedIn profile URL",
          },
          {
            displayName: "Connection Message",
            name: "connectionMessage",
            type: "string",
            default: "",
            description: "Personalized message for invitation",
          },
          {
            displayName: "Country Code",
            name: "country",
            type: "string",
            default: "FR",
            placeholder: "FR, US, UK, DE, ES, IT, CA, AU, etc.",
            description:
              "Country code for proxy selection (e.g., FR for France, US for United States)",
          },
        ],
      },

      // ACCEPT CONNECTION - Paramètres Linkup
      {
        displayName: "Linkup Parameters",
        name: "acceptConnectionParams",
        type: "collection",
        placeholder: "Add a parameter",
        displayOptions: {
          show: {
            operation: ["acceptConnectionInvitation"],
          },
        },
        default: {},
        options: [
          {
            displayName: "Entity URN *",
            name: "entityUrn",
            type: "string",
            default: "",
            description: "Invitation URN",
          },
          {
            displayName: "Shared Secret",
            name: "sharedSecret",
            type: "string",
            default: "",
            description: "Invitation shared secret",
          },
          {
            displayName: "Country Code",
            name: "country",
            type: "string",
            default: "FR",
            placeholder: "FR, US, UK, DE, ES, IT, CA, AU, etc.",
            description:
              "Country code for proxy selection (e.g., FR for France, US for United States)",
          },
        ],
      },

      // WITHDRAW INVITATION - Paramètres Linkup
      {
        displayName: "Linkup Parameters",
        name: "withdrawInvitationParams",
        type: "collection",
        placeholder: "Add a parameter",
        displayOptions: {
          show: {
            operation: ["withdrawInvitation"],
          },
        },
        default: {},
        options: [
          {
            displayName: "Invitation ID *",
            name: "invitationId",
            type: "string",
            default: "",
            description: "Invitation ID to withdraw",
          },
          {
            displayName: "Country Code",
            name: "country",
            type: "string",
            default: "FR",
            placeholder: "FR, US, UK, DE, ES, IT, CA, AU, etc.",
            description:
              "Country code for proxy selection (e.g., FR for France, US for United States)",
          },
        ],
      },

      // GET INVITATION STATUS - Paramètres Linkup
      {
        displayName: "Linkup Parameters",
        name: "getInvitationStatusParams",
        type: "collection",
        placeholder: "Add a parameter",
        displayOptions: {
          show: {
            operation: ["getInvitationStatus"],
          },
        },
        default: {},
        options: [
          {
            displayName: "LinkedIn Profile URL *",
            name: "profileUrl",
            type: "string",
            default: "",
            placeholder: "https://www.linkedin.com/in/username",
            description: "LinkedIn profile URL",
          },
          {
            displayName: "Country Code",
            name: "country",
            type: "string",
            default: "FR",
            placeholder: "FR, US, UK, DE, ES, IT, CA, AU, etc.",
            description:
              "Country code for proxy selection (e.g., FR for France, US for United States)",
          },
        ],
      },

      // MESSAGES - Paramètres Linkup
      {
        displayName: "Linkup Parameters",
        name: "messagesParams",
        type: "collection",
        placeholder: "Add a parameter",
        displayOptions: {
          show: {
            operation: ["sendMessage"],
          },
        },
        default: {},
        options: [
          {
            displayName: "LinkedIn URL *",
            name: "messageRecipientUrl",
            type: "string",
            default: "",
            placeholder: "https://www.linkedin.com/in/username",
            description: "LinkedIn profile URL of the recipient",
          },
          {
            displayName: "Message Text *",
            name: "messageText",
            type: "string",
            default: "",
            description: "Message content to send",
          },
          {
            displayName: "Media Link",
            name: "mediaLink",
            type: "string",
            default: "",
            description: "Direct URL of media to attach",
          },
          {
            displayName: "Country Code",
            name: "country",
            type: "string",
            default: "FR",
            placeholder: "FR, US, UK, DE, ES, IT, CA, AU, etc.",
            description:
              "Country code for proxy selection (e.g., FR for France, US for United States)",
          },
        ],
      },

      // CONVERSATION MESSAGES - Paramètres Linkup
      {
        displayName: "Linkup Parameters",
        name: "conversationMessagesParams",
        type: "collection",
        placeholder: "Add a parameter",
        displayOptions: {
          show: {
            operation: ["getConversationMessages"],
          },
        },
        default: {},
        options: [
          {
            displayName: "LinkedIn URL *",
            name: "linkedinUrl",
            type: "string",
            default: "",
            placeholder: "https://www.linkedin.com/in/username",
            description: "LinkedIn profile URL",
          },
          {
            displayName: "Conversation ID *",
            name: "conversationId",
            type: "string",
            default: "",
            description: "Unique LinkedIn conversation identifier",
          },
          {
            displayName: "Number of Results",
            name: "total_results",
            type: "number",
            default: 10,
            description: "Number of messages to retrieve",
          },
          {
            displayName: "Start Page",
            name: "start_page",
            type: "number",
            default: 1,
            description: "First page to retrieve",
          },
          {
            displayName: "End Page",
            name: "end_page",
            type: "number",
            default: 1,
            description: "Last page to retrieve",
          },
          {
            displayName: "Country Code",
            name: "country",
            type: "string",
            default: "FR",
            placeholder: "FR, US, UK, DE, ES, IT, CA, AU, etc.",
            description:
              "Country code for proxy selection (e.g., FR for France, US for United States)",
          },
        ],
      },

      // POSTS - Paramètres Linkup
      {
        displayName: "Linkup Parameters",
        name: "postsParams",
        type: "collection",
        placeholder: "Add a parameter",
        displayOptions: {
          show: {
            operation: [
              "getPostReactions",
              "reactToPost",
              "repost",
              "commentPost",
              "extractComments",
              "timeSpent",
            ],
          },
        },
        default: {},
        options: [
          {
            displayName: "LinkedIn Post URL *",
            name: "postUrl",
            type: "string",
            default: "",
            placeholder: "https://www.linkedin.com/feed/update/xxx",
            description: "URL of the LinkedIn post",
          },
          {
            displayName: "Reaction Type",
            name: "reactionType",
            type: "options",
            displayOptions: {
              show: {
                operation: ["reactToPost"],
              },
            },
            options: [
              { name: "👍 Like", value: "LIKE" },
              { name: "👏 Praise", value: "PRAISE" },
              { name: "🙏 Appreciation", value: "APPRECIATION" },
              { name: "🤗 Empathy", value: "EMPATHY" },
              { name: "🎯 Interest", value: "INTEREST" },
              { name: "🎭 Entertainment", value: "ENTERTAINMENT" },
            ],
            default: "LIKE",
            description:
              "Type of reaction to add. Available options: LIKE, PRAISE, APPRECIATION, EMPATHY, INTEREST, ENTERTAINMENT",
          },
          {
            displayName: "Message/Text",
            name: "messageText",
            type: "string",
            default: "",
            displayOptions: {
              show: {
                operation: ["commentPost"],
              },
            },
            description: "Text content of the comment to post",
          },
          {
            displayName: "Duration (milliseconds)",
            name: "duration",
            type: "number",
            default: 30000,
            displayOptions: {
              show: {
                operation: ["timeSpent"],
              },
            },
            description:
              "Duration in milliseconds that the user spent viewing the post. Must be a positive integer.",
            typeOptions: {
              minValue: 1,
            },
          },
          {
            displayName: "Start Time (milliseconds)",
            name: "durationStartTime",
            type: "number",
            default: "",
            displayOptions: {
              show: {
                operation: ["timeSpent"],
              },
            },
            description:
              "Optional start time in milliseconds when the user began viewing the post",
          },
          {
            displayName: "Number of Results",
            name: "total_results",
            type: "number",
            default: 10,
            displayOptions: {
              show: {
                operation: [
                  "getPostReactions",
                  "extractComments",
                ],
              },
            },
            description: "Number of results to retrieve",
          },
          {
            displayName: "Start Page",
            name: "start_page",
            type: "number",
            default: 1,
            displayOptions: {
              show: {
                operation: [
                  "getPostReactions",
                  "extractComments",
                ],
              },
            },
            description: "First page to retrieve",
          },
          {
            displayName: "End Page",
            name: "end_page",
            type: "number",
            default: 1,
            displayOptions: {
              show: {
                operation: [
                  "getPostReactions",
                  "extractComments",
                ],
              },
            },
            description: "Last page to retrieve",
          },
          {
            displayName: "Country Code",
            name: "country",
            type: "string",
            default: "FR",
            placeholder: "FR, US, UK, DE, ES, IT, CA, AU, etc.",
            displayOptions: {
              show: {
                operation: [
                  "getPostReactions",
                  "reactToPost",
                  "repost",
                  "commentPost",
                  "extractComments",
                  "timeSpent",
                ],
              },
            },
            description:
              "Country code for proxy selection (e.g., FR for France, US for United States)",
          },
        ],
      },

      // ANSWER COMMENT - Paramètres Linkup
      {
        displayName: "Tracking ID *",
        name: "trackingId",
        type: "string",
        default: "",
        required: true,
        displayOptions: {
          show: {
            operation: ["answerComment"],
          },
        },
        description: "Unique identifier for tracking the request",
      },
      {
        displayName: "Profile URN *",
        name: "profileUrn",
        type: "string",
        default: "",
        required: true,
        displayOptions: {
          show: {
            operation: ["answerComment"],
          },
        },
        description: "LinkedIn profile URN of the user posting the comment",
      },
      {
        displayName: "Comment URN *",
        name: "commentUrn",
        type: "string",
        default: "",
        required: true,
        displayOptions: {
          show: {
            operation: ["answerComment"],
          },
        },
        description: "LinkedIn comment URN to reply to",
      },
      {
        displayName: "Comment Text *",
        name: "commentText",
        type: "string",
        default: "",
        required: true,
        displayOptions: {
          show: {
            operation: ["answerComment"],
          },
        },
        description: "Text content of the reply to post",
      },
      {
        displayName: "Mention User",
        name: "mentionUser",
        type: "boolean",
        default: false,
        displayOptions: {
          show: {
            operation: ["answerComment"],
          },
        },
        description:
          "Whether to mention the original commenter in the reply",
      },
      {
        displayName: "Commenter Name",
        name: "commenterName",
        type: "string",
        default: "",
        displayOptions: {
          show: {
            operation: ["answerComment"],
          },
        },
        description: "Original commenter name",
      },
      {
        displayName: "Country Code",
        name: "country",
        type: "string",
        default: "FR",
        placeholder: "FR, US, UK, DE, ES, IT, CA, AU, etc.",
        displayOptions: {
          show: {
            operation: ["answerComment"],
          },
        },
        description:
          "Country code for proxy selection (e.g., FR for France, US for United States)",
      },

      // CREATE POST - Paramètres Linkup
      {
        displayName: "Message/Text *",
        name: "messageText",
        type: "string",
        default: "",
        required: true,
        displayOptions: {
          show: {
            operation: ["createPost"],
          },
        },
        description: "Text content of the post",
      },
      {
        displayName: "File",
        name: "file",
        type: "string",
        default: "",
        displayOptions: {
          show: {
            operation: ["createPost"],
          },
        },
        description:
          "Optional image file URL. Direct link to the image file you want to attach to the post",
      },
      {
        displayName: "Country Code",
        name: "country",
        type: "string",
        default: "FR",
        placeholder: "FR, US, UK, DE, ES, IT, CA, AU, etc.",
        displayOptions: {
          show: {
            operation: ["createPost"],
          },
        },
        description:
          "Country code for proxy selection (e.g., FR for France, US for United States)",
      },

      // SEARCH PROFILE - Paramètres Linkup
      {
        displayName: "Search Parameters",
        name: "searchProfileParams",
        type: "collection",
        placeholder: "Add a parameter",
        displayOptions: {
          show: {
            operation: ["searchProfile"],
          },
        },
        default: {},
        options: [
          {
            displayName: "Keyword",
            name: "keyword",
            type: "string",
            default: "",
            description: "Search keyword",
          },
          {
            displayName: "Location(s)",
            name: "location",
            type: "string",
            default: "",
            description: "Geographic location(s) (separated by ;)",
          },
          {
            displayName: "Company(ies)",
            name: "company_url",
            type: "string",
            default: "",
            description: "LinkedIn company URL(s) (separated by ;)",
          },
          {
            displayName: "School(s)",
            name: "school_url",
            type: "string",
            default: "",
            description: "LinkedIn school URL(s) (separated by ;)",
          },
          {
            displayName: "Network",
            name: "network",
            type: "string",
            default: "",
            description: "Connection level (F=1st, S=2nd, O=outside network)",
          },
          {
            displayName: "First Name",
            name: "first_name",
            type: "string",
            default: "",
            description: "Filter by first name",
          },
          {
            displayName: "Last Name",
            name: "last_name",
            type: "string",
            default: "",
            description: "Filter by last name",
          },
          {
            displayName: "Title/Position",
            name: "title",
            type: "string",
            default: "",
            description: "Filter by title/position",
          },
          {
            displayName: "Show Invitation Status",
            name: "fetch_invitation_state",
            type: "boolean",
            default: true,
            description: "Include invitation status for each profile",
          },
          {
            displayName: "Number of Results",
            name: "total_results",
            type: "number",
            default: 10,
            description: "Number of results to retrieve",
          },
          {
            displayName: "Start Page",
            name: "start_page",
            type: "number",
            default: 1,
            description: "First page to retrieve",
          },
          {
            displayName: "End Page",
            name: "end_page",
            type: "number",
            default: 1,
            description: "Last page to retrieve",
          },
          {
            displayName: "Country Code",
            name: "country",
            type: "string",
            default: "FR",
            placeholder: "FR, US, UK, DE, ES, IT, CA, AU, etc.",
            description:
              "Country code for proxy selection (e.g., FR for France, US for United States)",
          },
        ],
      },

      // SEARCH COMPANIES - Paramètres Linkup
      {
        displayName: "Linkup Parameters",
        name: "searchCompaniesParams",
        type: "collection",
        placeholder: "Add a parameter",
        displayOptions: {
          show: {
            operation: ["searchCompanies"],
          },
        },
        default: {},
        options: [
          {
            displayName: "Keyword",
            name: "keyword",
            type: "string",
            default: "",
            description: "Search keyword",
          },
          {
            displayName: "Location(s)",
            name: "location",
            type: "string",
            default: "",
            description: "Geographic location(s) (separated by ;)",
          },
          {
            displayName: "Sector(s)",
            name: "sector",
            type: "string",
            default: "",
            description: "Business sector(s) (separated by ;)",
          },
          {
            displayName: "Company Size",
            name: "company_size",
            type: "string",
            default: "",
            description: "Company size range",
          },
          {
            displayName: "Number of Results",
            name: "total_results",
            type: "number",
            default: 10,
            description: "Number of results to retrieve",
          },
          {
            displayName: "Start Page",
            name: "start_page",
            type: "number",
            default: 1,
            description: "First page to retrieve",
          },
          {
            displayName: "End Page",
            name: "end_page",
            type: "number",
            default: 1,
            description: "Last page to retrieve",
          },
          {
            displayName: "Country Code",
            name: "country",
            type: "string",
            default: "FR",
            placeholder: "FR, US, UK, DE, ES, IT, CA, AU, etc.",
            description:
              "Country code for proxy selection (e.g., FR for France, US for United States)",
          },
        ],
      },

      // SEARCH POSTS - Paramètres Linkup
      {
        displayName: "Linkup Parameters",
        name: "searchPostsParams",
        type: "collection",
        placeholder: "Add a parameter",
        displayOptions: {
          show: {
            operation: ["searchPosts"],
          },
        },
        default: {},
        options: [
          {
            displayName: "Keyword",
            name: "keyword",
            type: "string",
            default: "",
            description: "Search keyword",
          },
          {
            displayName: "Post Type",
            name: "post_type",
            type: "string",
            default: "",
            description: "Type of post to search",
          },
          {
            displayName: "Sort By",
            name: "sort_by",
            type: "string",
            default: "",
            description: "Post sorting criteria",
          },
          {
            displayName: "Post Date",
            name: "post_date",
            type: "string",
            default: "",
            description: "Post date to filter",
          },
          {
            displayName: "LinkedIn URL (search)",
            name: "linkedin_url",
            type: "string",
            default: "",
            description: "LinkedIn URL for search",
          },
          {
            displayName: "Number of Results",
            name: "total_results",
            type: "number",
            default: 10,
            description: "Number of results to retrieve",
          },
          {
            displayName: "Start Page",
            name: "start_page",
            type: "number",
            default: 1,
            description: "First page to retrieve",
          },
          {
            displayName: "End Page",
            name: "end_page",
            type: "number",
            default: 1,
            description: "Last page to retrieve",
          },
          {
            displayName: "Country Code",
            name: "country",
            type: "string",
            default: "FR",
            placeholder: "FR, US, UK, DE, ES, IT, CA, AU, etc.",
            description:
              "Country code for proxy selection (e.g., FR for France, US for United States)",
          },
        ],
      },

      // GET CONNECTIONS - Paramètres Linkup
      {
        displayName: "Linkup Parameters",
        name: "getConnectionsParams",
        type: "collection",
        placeholder: "Add a parameter",
        displayOptions: {
          show: {
            operation: ["getConnections"],
          },
        },
        default: {},
        options: [
          {
            displayName: "Number of Results",
            name: "total_results",
            type: "number",
            default: 10,
            description: "Number of results to retrieve",
          },
          {
            displayName: "Start Page",
            name: "start_page",
            type: "number",
            default: 1,
            description: "First page to retrieve",
          },
          {
            displayName: "End Page",
            name: "end_page",
            type: "number",
            default: 1,
            description: "Last page to retrieve",
          },
          {
            displayName: "Country Code",
            name: "country",
            type: "string",
            default: "FR",
            placeholder: "FR, US, UK, DE, ES, IT, CA, AU, etc.",
            description:
              "Country code for proxy selection (e.g., FR for France, US for United States)",
          },
        ],
      },

      // GET INVITATIONS - Paramètres Linkup
      {
        displayName: "Linkup Parameters",
        name: "getInvitationsParams",
        type: "collection",
        placeholder: "Add a parameter",
        displayOptions: {
          show: {
            operation: ["getReceivedInvitations", "getSentInvitations"],
          },
        },
        default: {},
        options: [
          {
            displayName: "Invitation Type",
            name: "invitation_type",
            type: "string",
            default: "",
            description: "Invitation type (CONNECTION, ORGANIZATION, etc.)",
          },
          {
            displayName: "Number of Results",
            name: "total_results",
            type: "number",
            default: 10,
            description: "Number of results to retrieve",
          },
          {
            displayName: "Start Page",
            name: "start_page",
            type: "number",
            default: 1,
            description: "First page to retrieve",
          },
          {
            displayName: "End Page",
            name: "end_page",
            type: "number",
            default: 1,
            description: "Last page to retrieve",
          },
          {
            displayName: "Country Code",
            name: "country",
            type: "string",
            default: "FR",
            placeholder: "FR, US, UK, DE, ES, IT, CA, AU, etc.",
            description:
              "Country code for proxy selection (e.g., FR for France, US for United States)",
          },
        ],
      },

      // NETWORK RECOMMENDATIONS - Paramètres Linkup
      {
        displayName: "Linkup Parameters",
        name: "getNetworkRecommendationsParams",
        type: "collection",
        placeholder: "Add a parameter",
        displayOptions: {
          show: {
            operation: ["getNetworkRecommendations"],
          },
        },
        default: {},
        options: [
          {
            displayName: "Number of Results",
            name: "total_results",
            type: "number",
            default: 10,
            description: "Number of results to retrieve",
          },
          {
            displayName: "Start Page",
            name: "start_page",
            type: "number",
            default: 1,
            description: "First page to retrieve",
          },
          {
            displayName: "End Page",
            name: "end_page",
            type: "number",
            default: 1,
            description: "Last page to retrieve",
          },
          {
            displayName: "Country Code",
            name: "country",
            type: "string",
            default: "FR",
            placeholder: "FR, US, UK, DE, ES, IT, CA, AU, etc.",
            description:
              "Country code for proxy selection (e.g., FR for France, US for United States)",
          },
        ],
      },

      // MESSAGE INBOX - Paramètres Linkup
      {
        displayName: "Linkup Parameters",
        name: "getMessageInboxParams",
        type: "collection",
        placeholder: "Add a parameter",
        displayOptions: {
          show: {
            operation: ["getMessageInbox"],
          },
        },
        default: {},
        options: [
          {
            displayName: "Number of Results",
            name: "total_results",
            type: "number",
            default: 10,
            description: "Number of results to retrieve",
          },
          {
            displayName: "Category",
            name: "category",
            type: "string",
            default: "INBOX",
            placeholder: "INBOX, INMAIL, JOB, UNREAD",
            description:
              "Category to filter by. Available: (INBOX, INMAIL, JOB, UNREAD)",
          },
          {
            displayName: "Next Cursor",
            name: "next_cursor",
            type: "string",
            default: "",
            description:
              "Cursor for pagination (optional - used to get the next batch of results)",
          },
          {
            displayName: "Country Code",
            name: "country",
            type: "string",
            default: "FR",
            placeholder: "FR, US, UK, DE, ES, IT, CA, AU, etc.",
            description:
              "Country code for proxy selection (e.g., FR for France, US for United States)",
          },
        ],
      },

      // GET FEED - Paramètres Linkup
      {
        displayName: "Linkup Parameters",
        name: "getFeedParams",
        type: "collection",
        placeholder: "Add a parameter",
        displayOptions: {
          show: {
            operation: ["getFeed"],
          },
        },
        default: {},
        options: [
          {
            displayName: "Number of Results",
            name: "total_results",
            type: "number",
            default: 10,
            description:
              "Number of feed posts to retrieve (the API will automatically handle pagination)",
          },
          {
            displayName: "Country Code",
            name: "country",
            type: "string",
            default: "FR",
            placeholder: "FR, US, UK, DE, ES, IT, CA, AU, etc.",
            description:
              "Country code for proxy selection (e.g., FR for France, US for United States)",
          },
        ],
      },

      // GET CANDIDATES - Paramètres Linkup
      {
        displayName: "Job ID *",
        name: "jobId",
        type: "string",
        default: "",
        required: true,
        displayOptions: {
          show: {
            operation: ["getCandidates"],
          },
        },
        description: "Unique job identifier for candidates",
      },
      {
        displayName: "Linkup Parameters",
        name: "getCandidatesParams",
        type: "collection",
        placeholder: "Add a parameter",
        displayOptions: {
          show: {
            operation: ["getCandidates"],
          },
        },
        default: {},
        options: [
          {
            displayName: "Location",
            name: "location",
            type: "string",
            default: "",
            description: "Job location filter",
          },
          {
            displayName: "Years of Experience",
            name: "yearsOfExperience",
            type: "string",
            default: "",
            description: "Required years of experience (Recruiter)",
          },
          {
            displayName: "Sort Type",
            name: "sortType",
            type: "string",
            default: "",
            description: "Sort type for candidates (Recruiter)",
          },
          {
            displayName: "Sort Order",
            name: "sortOrder",
            type: "string",
            default: "",
            description: "Sort order (ASC/DESC) (Recruiter)",
          },
          {
            displayName: "Ratings",
            name: "ratings",
            type: "string",
            default: "",
            description: "Filter by ratings (Recruiter)",
          },
          {
            displayName: "Start",
            name: "start",
            type: "string",
            default: "",
            description: "Starting point for pagination (Recruiter)",
          },
          {
            displayName: "Number of Results",
            name: "total_results",
            type: "number",
            default: 10,
            description: "Number of results to retrieve",
          },
          {
            displayName: "Start Page",
            name: "start_page",
            type: "number",
            default: 1,
            description: "First page to retrieve",
          },
          {
            displayName: "End Page",
            name: "end_page",
            type: "number",
            default: 1,
            description: "Last page to retrieve",
          },
          {
            displayName: "Country Code",
            name: "country",
            type: "string",
            default: "FR",
            placeholder: "FR, US, UK, DE, ES, IT, CA, AU, etc.",
            description:
              "Country code for proxy selection (e.g., FR for France, US for United States)",
          },
        ],
      },

      // GET JOB POSTS - Paramètres Linkup
      {
        displayName: "Linkup Parameters",
        name: "getJobPostsParams",
        type: "collection",
        placeholder: "Add a parameter",
        displayOptions: {
          show: {
            operation: ["getJobPosts"],
          },
        },
        default: {},
        options: [
          {
            displayName: "Job ID",
            name: "jobId",
            type: "string",
            default: "",
            description: "Unique job identifier (optional filter)",
          },
          {
            displayName: "Fetch Details",
            name: "fetchDetails",
            type: "boolean",
            default: true,
            description: "Fetch detailed information for job posts",
          },
          {
            displayName: "Number of Results",
            name: "total_results",
            type: "number",
            default: 10,
            description: "Number of results to retrieve",
          },
          {
            displayName: "Start Page",
            name: "start_page",
            type: "number",
            default: 1,
            description: "First page to retrieve",
          },
          {
            displayName: "End Page",
            name: "end_page",
            type: "number",
            default: 1,
            description: "Last page to retrieve",
          },
          {
            displayName: "Country Code",
            name: "country",
            type: "string",
            default: "FR",
            placeholder: "FR, US, UK, DE, ES, IT, CA, AU, etc.",
            description:
              "Country code for proxy selection (e.g., FR for France, US for United States)",
          },
        ],
      },

      // PUBLISH/CLOSE JOB - Paramètres Linkup
      {
        displayName: "Job ID *",
        name: "jobId",
        type: "string",
        default: "",
        required: true,
        displayOptions: {
          show: {
            operation: ["publishJob", "closeJob"],
          },
        },
        description: "Unique job identifier to publish/close",
      },
      {
        displayName: "Linkup Parameters",
        name: "publishCloseJobParams",
        type: "collection",
        placeholder: "Add a parameter",
        displayOptions: {
          show: {
            operation: ["publishJob", "closeJob"],
          },
        },
        default: {},
        options: [
          {
            displayName: "Country Code",
            name: "country",
            type: "string",
            default: "FR",
            placeholder: "FR, US, UK, DE, ES, IT, CA, AU, etc.",
            description:
              "Country code for proxy selection (e.g., FR for France, US for United States)",
          },
        ],
      },

      // CREATE JOB - Paramètres Linkup
      {
        displayName: "Company URL *",
        name: "companyUrl",
        type: "string",
        default: "",
        required: true,
        displayOptions: {
          show: {
            operation: ["createJob"],
          },
        },
        description:
          'URL of the LinkedIn company page (e.g., "https://www.linkedin.com/company/company-name/")',
      },
      {
        displayName: "Job Title *",
        name: "jobTitle",
        type: "string",
        default: "",
        required: true,
        displayOptions: {
          show: {
            operation: ["createJob"],
          },
        },
        description: 'Job title (e.g., "Senior Software Engineer")',
      },
      {
        displayName: "Job Location *",
        name: "place",
        type: "string",
        default: "",
        required: true,
        displayOptions: {
          show: {
            operation: ["createJob"],
          },
        },
        description: 'Job location (e.g., "Paris, France")',
      },
      {
        displayName: "HTML Description *",
        name: "html_description",
        type: "string",
        default: "",
        required: true,
        displayOptions: {
          show: {
            operation: ["createJob"],
          },
        },
        description:
          "Job description in HTML format. Supports basic HTML formatting (bold, lists, paragraphs)",
      },
      {
        displayName: "Linkup Parameters",
        name: "createJobParams",
        type: "collection",
        placeholder: "Add a parameter",
        displayOptions: {
          show: {
            operation: ["createJob"],
          },
        },
        default: {},
        options: [
          {
            displayName: "Employment Status",
            name: "employment_status",
            type: "string",
            default: "",
            description: "Employment status (CDD, CDI, etc.) (createJob)",
          },
          {
            displayName: "Workplace",
            name: "workplace",
            type: "string",
            default: "",
            description: "Workplace type (Office, Remote, etc.) (createJob)",
          },
          {
            displayName: "Skills",
            name: "skills",
            type: "string",
            default: "",
            description: "Required skills in array format (createJob)",
          },
          {
            displayName: "Screening Questions",
            name: "screening_questions",
            type: "string",
            default: "",
            description: "Screening questions in array format (createJob)",
          },
          {
            displayName: "Auto Rejection Template",
            name: "auto_rejection_template",
            type: "string",
            default: "",
            description: "Auto rejection template (createJob)",
          },
          {
            displayName: "Contact Email",
            name: "contact_email",
            type: "string",
            default: "",
            description: "Contact email for job (createJob)",
          },
          {
            displayName: "Country Code",
            name: "country",
            type: "string",
            default: "FR",
            placeholder: "FR, US, UK, DE, ES, IT, CA, AU, etc.",
            description:
              "Country code for proxy selection (e.g., FR for France, US for United States)",
          },
        ],
      },

      // GET CANDIDATE CV - Paramètres Linkup
      {
        displayName: "Application ID *",
        name: "applicationId",
        type: "string",
        default: "",
        required: true,
        displayOptions: {
          show: {
            operation: ["getCandidateCV"],
          },
        },
        description:
          "LinkedIn application ID of the candidate (you can get it with the /recruiter/candidates endpoint)",
      },
      {
        displayName: "Linkup Parameters",
        name: "getCandidateCVParams",
        type: "collection",
        placeholder: "Add a parameter",
        displayOptions: {
          show: {
            operation: ["getCandidateCV"],
          },
        },
        default: {},
        options: [
          {
            displayName: "Country Code",
            name: "country",
            type: "string",
            default: "FR",
            placeholder: "FR, US, UK, DE, ES, IT, CA, AU, etc.",
            description:
              "Country code for proxy selection (e.g., FR for France, US for United States)",
          },
        ],
      },

      // === SIGNAL API PARAMETERS ===

      // SIGNAL POST REACTIONS - Paramètres Linkup
      {
        displayName: "Post URL *",
        name: "post_url",
        type: "string",
        default: "",
        required: true,
        displayOptions: {
          show: {
            operation: ["extractPostReactions"],
          },
        },
        placeholder: "https://www.linkedin.com/feed/update/xxx",
        description: "URL of the LinkedIn post to extract reactions from",
      },
      {
        displayName: "Linkup Parameters",
        name: "signalPostReactionsParams",
        type: "collection",
        placeholder: "Add a parameter",
        displayOptions: {
          show: {
            operation: ["extractPostReactions"],
          },
        },
        default: {},
        options: [
          {
            displayName: "Proxy Country",
            name: "proxy_country",
            type: "string",
            default: "FR",
            placeholder: "FR, US, UK",
            description:
              "Country code for proxy selection. Available: (US, UK, FR)",
          },
          {
            displayName: "Total Results",
            name: "total_results",
            type: "number",
            default: 10,
            description:
              "Number of reactions to retrieve (used when not in pagination mode)",
          },
          {
            displayName: "Use Pagination",
            name: "use_pagination",
            type: "boolean",
            default: false,
            description: "Use pagination mode instead of total results mode",
          },
          {
            displayName: "Start Page",
            name: "start_page",
            type: "number",
            default: 1,
            description:
              "Starting page number for pagination mode (required if use_pagination is true)",
          },
          {
            displayName: "End Page",
            name: "end_page",
            type: "number",
            default: 1,
            description:
              "Ending page number for pagination mode (optional if use_pagination is true)",
          },
        ],
      },

      // SIGNAL POST COMMENTS - Paramètres Linkup
      {
        displayName: "Post URL *",
        name: "post_url",
        type: "string",
        default: "",
        required: true,
        displayOptions: {
          show: {
            operation: ["extractPostComments"],
          },
        },
        placeholder: "https://www.linkedin.com/feed/update/xxx",
        description: "URL of the LinkedIn post to extract comments from",
      },
      {
        displayName: "Linkup Parameters",
        name: "signalPostCommentsParams",
        type: "collection",
        placeholder: "Add a parameter",
        displayOptions: {
          show: {
            operation: ["extractPostComments"],
          },
        },
        default: {},
        options: [
          {
            displayName: "Proxy Country",
            name: "proxy_country",
            type: "string",
            default: "FR",
            placeholder: "FR, US, UK",
            description:
              "Country code for proxy selection. Available: (US, UK, FR)",
          },
          {
            displayName: "Total Results",
            name: "total_results",
            type: "number",
            default: 10,
            description:
              "Number of comments to retrieve (used when not in pagination mode)",
          },
          {
            displayName: "Use Pagination",
            name: "use_pagination",
            type: "boolean",
            default: false,
            description: "Use pagination mode instead of total results mode",
          },
          {
            displayName: "Start Page",
            name: "start_page",
            type: "number",
            default: 1,
            description:
              "Starting page number for pagination mode (required if use_pagination is true)",
          },
          {
            displayName: "End Page",
            name: "end_page",
            type: "number",
            default: 1,
            description:
              "Ending page number for pagination mode (optional if use_pagination is true)",
          },
        ],
      },

      // SIGNAL PROFILE REACTIONS - Paramètres Linkup
      {
        displayName: "Profile URL *",
        name: "profile_url",
        type: "string",
        default: "",
        required: true,
        displayOptions: {
          show: {
            operation: ["extractProfileReactions"],
          },
        },
        placeholder: "https://www.linkedin.com/in/username",
        description:
          "URL of the LinkedIn profile to extract reactions from",
      },
      {
        displayName: "Linkup Parameters",
        name: "signalProfileReactionsParams",
        type: "collection",
        placeholder: "Add a parameter",
        displayOptions: {
          show: {
            operation: ["extractProfileReactions"],
          },
        },
        default: {},
        options: [
          {
            displayName: "Proxy Country",
            name: "proxy_country",
            type: "string",
            default: "FR",
            placeholder: "FR, US, UK",
            description:
              "Country code for proxy selection. Available: (US, UK, FR)",
          },
          {
            displayName: "Total Results",
            name: "total_results",
            type: "number",
            default: 10,
            description: "Number of reactions to retrieve",
          },
          {
            displayName: "Start Page",
            name: "start_page",
            type: "number",
            default: 1,
            description: "Starting page number for pagination",
          },
          {
            displayName: "End Page",
            name: "end_page",
            type: "number",
            default: 1,
            description: "Ending page number for pagination",
          },
          {
            displayName: "Cursor",
            name: "cursor",
            type: "string",
            default: "",
            description: "Pagination cursor to continue a previous search",
          },
        ],
      },

      // SIGNAL PROFILE COMMENTS - Paramètres Linkup
      {
        displayName: "Profile URL *",
        name: "profile_url",
        type: "string",
        default: "",
        required: true,
        displayOptions: {
          show: {
            operation: ["extractProfileComments"],
          },
        },
        placeholder: "https://www.linkedin.com/in/username",
        description: "URL of the LinkedIn profile to extract comments from",
      },
      {
        displayName: "Linkup Parameters",
        name: "signalProfileCommentsParams",
        type: "collection",
        placeholder: "Add a parameter",
        displayOptions: {
          show: {
            operation: ["extractProfileComments"],
          },
        },
        default: {},
        options: [
          {
            displayName: "Proxy Country",
            name: "proxy_country",
            type: "string",
            default: "FR",
            placeholder: "FR, US, UK",
            description:
              "Country code for proxy selection. Available: (US, UK, FR)",
          },
          {
            displayName: "Total Results",
            name: "total_results",
            type: "number",
            default: 10,
            description: "Number of comments to retrieve",
          },
          {
            displayName: "Start Page",
            name: "start_page",
            type: "number",
            default: 1,
            description: "Starting page number for pagination",
          },
          {
            displayName: "End Page",
            name: "end_page",
            type: "number",
            default: 1,
            description: "Ending page number for pagination",
          },
          {
            displayName: "Cursor",
            name: "cursor",
            type: "string",
            default: "",
            description: "Pagination cursor to continue a previous search",
          },
        ],
      },

      // SIGNAL PROFILE POSTS - Paramètres Linkup
      {
        displayName: "Profile URL *",
        name: "profile_url",
        type: "string",
        default: "",
        required: true,
        displayOptions: {
          show: {
            operation: ["extractProfilePosts"],
          },
        },
        placeholder: "https://www.linkedin.com/in/username",
        description: "URL of the LinkedIn profile to extract posts from",
      },
      {
        displayName: "Linkup Parameters",
        name: "signalProfilePostsParams",
        type: "collection",
        placeholder: "Add a parameter",
        displayOptions: {
          show: {
            operation: ["extractProfilePosts"],
          },
        },
        default: {},
        options: [
          {
            displayName: "Proxy Country",
            name: "proxy_country",
            type: "string",
            default: "FR",
            placeholder: "FR, US, UK",
            description:
              "Country code for proxy selection. Available: (US, UK, FR)",
          },
          {
            displayName: "Total Results",
            name: "total_results",
            type: "number",
            default: 10,
            description:
              "Number of posts to retrieve (used when not in pagination mode)",
          },
          {
            displayName: "Post Type",
            name: "post_type",
            type: "options",
            options: [
              { name: "All", value: "ALL" },
              { name: "Article", value: "ARTICLE" },
              { name: "Video", value: "VIDEO" },
              { name: "Photo", value: "PHOTO" },
              { name: "Document", value: "DOCUMENT" },
            ],
            default: "ALL",
            description:
              "Type of posts to filter. Available: (ALL, ARTICLE, VIDEO, PHOTO, DOCUMENT)",
          },
          {
            displayName: "Sort By",
            name: "sort_by",
            type: "options",
            options: [
              { name: "Relevance", value: "RELEVANCE" },
              { name: "Date Posted", value: "DATE_POSTED" },
            ],
            default: "DATE_POSTED",
            description:
              "Sort order for posts. Available: (RELEVANCE, DATE_POSTED)",
          },
          {
            displayName: "Keyword",
            name: "keyword",
            type: "string",
            default: "",
            description: "Keyword to filter posts by content",
          },
          {
            displayName: "Post Date",
            name: "post_date",
            type: "options",
            options: [
              { name: "Past 24 Hours", value: "PAST_24_HOURS" },
              { name: "Past Week", value: "PAST_WEEK" },
              { name: "Past Month", value: "PAST_MONTH" },
            ],
            default: "",
            description:
              "Date filter for posts. Available: (PAST_24_HOURS, PAST_WEEK, PAST_MONTH)",
          },
          {
            displayName: "Use Pagination",
            name: "use_pagination",
            type: "boolean",
            default: false,
            description: "Use pagination mode instead of total results mode",
          },
          {
            displayName: "Start Page",
            name: "start_page",
            type: "number",
            default: 1,
            description:
              "Starting page number for pagination mode (required if use_pagination is true)",
          },
          {
            displayName: "End Page",
            name: "end_page",
            type: "number",
            default: 1,
            description:
              "Ending page number for pagination mode (optional if use_pagination is true)",
          },
        ],
      },

      // SIGNAL COMPANY POSTS - Paramètres Linkup
      {
        displayName: "Company URL *",
        name: "company_url",
        type: "string",
        default: "",
        required: true,
        displayOptions: {
          show: {
            operation: ["extractCompanyPosts"],
          },
        },
        placeholder: "https://www.linkedin.com/company/company-name/",
        description:
          "URL of the LinkedIn company page to extract posts from",
      },
      {
        displayName: "Linkup Parameters",
        name: "signalCompanyPostsParams",
        type: "collection",
        placeholder: "Add a parameter",
        displayOptions: {
          show: {
            operation: ["extractCompanyPosts"],
          },
        },
        default: {},
        options: [
          {
            displayName: "Proxy Country",
            name: "proxy_country",
            type: "string",
            default: "FR",
            placeholder: "FR, US, UK",
            description:
              "Country code for proxy selection. Available: (US, UK, FR)",
          },
          {
            displayName: "Total Results",
            name: "total_results",
            type: "number",
            default: 10,
            description:
              "Number of posts to retrieve (used when not in pagination mode)",
          },
          {
            displayName: "Post Type",
            name: "post_type",
            type: "options",
            options: [
              { name: "All", value: "ALL" },
              { name: "Article", value: "ARTICLE" },
              { name: "Video", value: "VIDEO" },
              { name: "Photo", value: "PHOTO" },
              { name: "Document", value: "DOCUMENT" },
            ],
            default: "ALL",
            description:
              "Type of posts to filter. Available: (ALL, ARTICLE, VIDEO, PHOTO, DOCUMENT)",
          },
          {
            displayName: "Sort By",
            name: "sort_by",
            type: "options",
            options: [
              { name: "Relevance", value: "RELEVANCE" },
              { name: "Date Posted", value: "DATE_POSTED" },
            ],
            default: "DATE_POSTED",
            description:
              "Sort order for posts. Available: (RELEVANCE, DATE_POSTED)",
          },
          {
            displayName: "Keyword",
            name: "keyword",
            type: "string",
            default: "",
            description: "Keyword to filter posts by content",
          },
          {
            displayName: "Post Date",
            name: "post_date",
            type: "options",
            options: [
              { name: "Past 24 Hours", value: "PAST_24_HOURS" },
              { name: "Past Week", value: "PAST_WEEK" },
              { name: "Past Month", value: "PAST_MONTH" },
            ],
            default: "",
            description:
              "Date filter for posts. Available: (PAST_24_HOURS, PAST_WEEK, PAST_MONTH)",
          },
          {
            displayName: "Use Pagination",
            name: "use_pagination",
            type: "boolean",
            default: false,
            description: "Use pagination mode instead of total results mode",
          },
          {
            displayName: "Start Page",
            name: "start_page",
            type: "number",
            default: 1,
            description:
              "Starting page number for pagination mode (required if use_pagination is true)",
          },
          {
            displayName: "End Page",
            name: "end_page",
            type: "number",
            default: 1,
            description:
              "Ending page number for pagination mode (optional if use_pagination is true)",
          },
        ],
      },

      // === COMPANY API PARAMETERS ===

      // COMPANY API SEARCH - Paramètres Linkup
      {
        displayName: "Keyword *",
        name: "keyword",
        type: "string",
        default: "",
        required: true,
        displayOptions: {
          show: {
            operation: ["searchCompaniesApi"],
          },
        },
        description:
          "Keyword to search for (company name, industry, etc.). Also supports company_name for backward compatibility.",
      },
      {
        displayName: "Linkup Parameters",
        name: "companyApiSearchParams",
        type: "collection",
        placeholder: "Add a parameter",
        displayOptions: {
          show: {
            operation: ["searchCompaniesApi"],
          },
        },
        default: {},
        options: [
          {
            displayName: "Industry",
            name: "industry",
            type: "string",
            default: "",
            description:
              'Industry sector (e.g., "technology", "finance", "healthcare")',
          },
          {
            displayName: "Location",
            name: "location",
            type: "string",
            default: "",
            description: 'Location (e.g., "Paris", "France", "New York")',
          },
          {
            displayName: "Employee Range",
            name: "employee_range",
            type: "options",
            options: [
              { name: "1-50", value: "1-50" },
              { name: "51-200", value: "51-200" },
              { name: "201-1000", value: "201-1000" },
              { name: "1000+", value: "1000+" },
            ],
            default: "",
            description: "Employee count range",
          },
          {
            displayName: "Founding Company",
            name: "founding_company",
            type: "boolean",
            default: false,
            description:
              "Filter for founding companies. True: Search only founding companies, False: Exclude founding companies",
          },
          {
            displayName: "Total Results",
            name: "total_results",
            type: "number",
            default: 10,
            description: "Number of results to return (minimum: 1)",
          },
        ],
      },

      // COMPANY API INFO - Paramètres Linkup
      {
        displayName: "Company URL *",
        name: "company_url",
        type: "string",
        default: "",
        required: true,
        displayOptions: {
          show: {
            operation: ["getCompanyInfoApi"],
          },
        },
        placeholder: "https://www.linkedin.com/company/stripe/",
        description:
          "LinkedIn company URL (e.g., https://www.linkedin.com/company/stripe/)",
      },

      // COMPANY API INFO BY DOMAIN - Paramètres Linkup
      {
        displayName: "Domain *",
        name: "domain",
        type: "string",
        default: "",
        required: true,
        displayOptions: {
          show: {
            operation: ["getCompanyInfoByDomain"],
          },
        },
        placeholder: "stripe.com",
        description:
          'Company domain name (e.g., "equans.com", "stripe.com")',
      },

      // === PERSON API PARAMETERS ===

      // PERSON API SEARCH - Paramètres Linkup
      {
        displayName: "Keyword *",
        name: "keyword",
        type: "string",
        default: "",
        required: true,
        displayOptions: {
          show: {
            operation: ["searchProfilesApi"],
          },
        },
        description: "Main search keyword (name, position, skills, etc.)",
      },
      {
        displayName: "Linkup Parameters",
        name: "personApiSearchParams",
        type: "collection",
        placeholder: "Add a parameter",
        displayOptions: {
          show: {
            operation: ["searchProfilesApi"],
          },
        },
        default: {},
        options: [
          {
            displayName: "Job Title",
            name: "job_title",
            type: "string",
            default: "",
            description: "Job title to search for",
          },
          {
            displayName: "Industry",
            name: "industry",
            type: "string",
            default: "",
            description:
              'Industry sector (e.g., "technology", "finance", "healthcare")',
          },
          {
            displayName: "School",
            name: "school",
            type: "string",
            default: "",
            description: "School or university",
          },
          {
            displayName: "Location",
            name: "location",
            type: "string",
            default: "",
            description: "Location (city, region, country)",
          },
          {
            displayName: "Current Company",
            name: "current_company",
            type: "string",
            default: "",
            description: "Current company",
          },
          {
            displayName: "Total Results",
            name: "total_results",
            type: "number",
            default: 10,
            description: "Total number of results to return (default: 10)",
          },
        ],
      },

      // PERSON API EXTRACT INFO - Paramètres Linkup
      {
        displayName: "LinkedIn Profile URL *",
        name: "profileUrl",
        type: "string",
        default: "",
        required: true,
        displayOptions: {
          show: {
            operation: ["extractProfileInfoApi"],
          },
        },
        placeholder: "https://www.linkedin.com/in/username",
        description: "LinkedIn profile URL to extract information from",
      },
      {
        displayName: "Linkup Parameters",
        name: "personApiExtractInfoParams",
        type: "collection",
        placeholder: "Add a parameter",
        displayOptions: {
          show: {
            operation: ["extractProfileInfoApi"],
          },
        },
        default: {},
        options: [
          {
            displayName: "Country Code",
            name: "country",
            type: "string",
            default: "FR",
            placeholder: "FR, US, UK, DE, ES, IT, CA, AU, etc.",
            description:
              "Country code for proxy selection (e.g., FR for France, US for United States)",
          },
        ],
      },

      // PERSON API ENRICHMENT - Paramètres Linkup
      {
        displayName: "First Name *",
        name: "first_name",
        type: "string",
        default: "",
        required: true,
        displayOptions: {
          show: {
            operation: ["profileEnrichment"],
          },
        },
        description: "Person's first name",
      },
      {
        displayName: "Last Name *",
        name: "last_name",
        type: "string",
        default: "",
        required: true,
        displayOptions: {
          show: {
            operation: ["profileEnrichment"],
          },
        },
        description: "Person's last name",
      },
      {
        displayName: "Company Name *",
        name: "company_name",
        type: "string",
        default: "",
        required: true,
        displayOptions: {
          show: {
            operation: ["profileEnrichment"],
          },
        },
        description: "Current company name where the person works",
      },

      // PERSON API SEARCH PROFILES - Paramètres Linkup
      {
        displayName: "Linkup Parameters",
        name: "personApiSearchParams",
        type: "collection",
        placeholder: "Add a parameter",
        displayOptions: {
          show: {
            operation: ["searchProfilesApi"],
          },
        },
        default: {},
        options: [
          {
            displayName: "Keyword *",
            name: "keyword",
            type: "string",
            default: "",
            description: "Main search keyword (name, position, skills, etc.)",
          },
          {
            displayName: "Job Title",
            name: "job_title",
            type: "string",
            default: "",
            description: "Job title to search for",
          },
          {
            displayName: "Industry",
            name: "industry",
            type: "string",
            default: "",
            description:
              'Industry sector (e.g., "technology", "finance", "healthcare")',
          },
          {
            displayName: "School",
            name: "school",
            type: "string",
            default: "",
            description: "School or university",
          },
          {
            displayName: "Location",
            name: "location",
            type: "string",
            default: "",
            description: "Location (city, region, country)",
          },
          {
            displayName: "Current Company",
            name: "current_company",
            type: "string",
            default: "",
            description: "Current company",
          },
          {
            displayName: "Total Results",
            name: "total_results",
            type: "number",
            default: 10,
            description: "Total number of results to return (default: 10)",
          },
        ],
      },

      // === GLOBAL OPTIONS ===
      {
        displayName: "Advanced Options",
        name: "additionalFields",
        type: "collection",
        placeholder: "Add an option",
        default: {},
        options: [
          {
            displayName: "Timeout",
            name: "timeout",
            type: "number",
            default: 30000,
            description: "Request timeout in milliseconds",
          },
          {
            displayName: "Retry Count",
            name: "retryCount",
            type: "number",
            default: 3,
            description: "Number of retries on failure",
          },
        ],
      },
    ],
  };

  // === UTILITY METHODS ===
  static sanitizeCredentialValue(value: string): string | null {
    if (!value || value.includes("__n8n_BLANK_VALUE_")) {
      return null;
    }
    return value;
  }

  private async getCredentialsWithFallback(
    context: IExecuteFunctions
  ): Promise<LinkupCredentials> {
    // Toujours utiliser les credentials sauvegardées (plus de custom credentials)
    const credentials = await context.getCredentials("linkupApi");

    if (!credentials) {
      throw new Error(
        "Clé API manquante. Veuillez configurer vos credentials LINKUP dans les paramètres du nœud."
      );
    }

    const apiKey = Linkup.sanitizeCredentialValue(credentials.apiKey as string);
    const email = Linkup.sanitizeCredentialValue(
      credentials.linkedinEmail as string
    );
    const password = Linkup.sanitizeCredentialValue(
      credentials.linkedinPassword as string
    );
    const country = Linkup.sanitizeCredentialValue(
      credentials.country as string
    );
    const loginToken = Linkup.sanitizeCredentialValue(
      credentials.loginToken as string
    );

    if (!apiKey) {
      throw new Error(
        "Clé API manquante. Veuillez configurer vos credentials LINKUP dans les paramètres du nœud."
      );
    }

    return {
      apiKey: apiKey!,
      email: email || "",
      password: password || "",
      country: country || "FR",
      loginToken: loginToken || "",
    };
  }

  private buildRequestOptions(
    endpoint: string,
    method: "POST" | "GET",
    apiKey: string,
    body: RequestBody,
    timeout: number
  ): any {
    return {
      method,
      url: `${LINKUP_API_BASE_URL}${endpoint}`,
      headers: {
        "x-api-key": apiKey,
        "Content-Type": "application/json",
        "User-Agent": "n8n-linkup-node/1.2.0",
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
    if (
      loginToken &&
      ![
        "login",
        "verifyCode",
        "extractPostReactions",
        "extractPostComments",
        "extractProfileReactions",
        "extractProfileComments",
        "extractProfilePosts",
        "extractCompanyPosts",
        "searchCompaniesApi",
        "getCompanyInfoApi",
        "getCompanyInfoByDomain",
        "searchProfilesApi",
        "extractProfileInfoApi",
        "profileEnrichment",
      ].includes(operation)
    ) {
      body.login_token = loginToken;
    }

    // Champs spécifiques par opération
    switch (operation) {
      case "login":
        const creds = await context.getCredentials("linkupApi");
        if (creds) {
          body.email = creds.linkedinEmail;
          body.password = creds.linkedinPassword;
          body.country = creds.country || "FR"; // Utilise le country des credentials ou FR par défaut
        }
        break;

      case "verifyCode":
        const credsVerify = await context.getCredentials("linkupApi");
        if (credsVerify) {
          body.email = credsVerify.linkedinEmail;
          const verificationCode = context.getNodeParameter(
            "verificationCode",
            itemIndex,
            ""
          ) as string;
                  const authCountry = context.getNodeParameter(
          "country",
          itemIndex,
          "FR"
        ) as string;
        if (verificationCode) body.code = verificationCode;
        if (authCountry) body.country = authCountry;
        }
        break;

      case "extractProfileInfo":
        const profileUrl = context.getNodeParameter(
          "profileUrl",
          itemIndex,
          ""
        ) as string;
        const profileCountry = context.getNodeParameter(
          "country",
          itemIndex,
          "FR"
        ) as string;
        if (profileUrl) body.linkedin_url = profileUrl;
        if (profileCountry) body.country = profileCountry;
        break;

      case "getInvitationStatus":
        const getInvitationStatusParams = context.getNodeParameter(
          "getInvitationStatusParams",
          itemIndex,
          {}
        ) as any;
        if (getInvitationStatusParams.profileUrl)
          body.linkedin_url = getInvitationStatusParams.profileUrl;
        if (getInvitationStatusParams.country)
          body.country = getInvitationStatusParams.country;
        break;

      case "sendConnectionRequest":
        const networkParams = context.getNodeParameter(
          "networkParams",
          itemIndex,
          {}
        ) as any;
        if (networkParams.profileUrl)
          body.linkedin_url = networkParams.profileUrl;
        if (networkParams.connectionMessage)
          body.message = networkParams.connectionMessage;
        if (networkParams.country) body.country = networkParams.country;
        break;

      case "getCompanyInfo":
        const companiesParams = context.getNodeParameter(
          "companiesParams",
          itemIndex,
          {}
        ) as any;
        if (companiesParams.companyUrl)
          body.company_url = companiesParams.companyUrl;
        if (companiesParams.country) body.country = companiesParams.country;
        break;

      case "acceptConnectionInvitation":
        const acceptConnectionParams = context.getNodeParameter(
          "acceptConnectionParams",
          itemIndex,
          {}
        ) as any;
        if (acceptConnectionParams.entityUrn)
          body.entity_urn = acceptConnectionParams.entityUrn;
        if (acceptConnectionParams.sharedSecret)
          body.shared_secret = acceptConnectionParams.sharedSecret;
        if (acceptConnectionParams.country)
          body.country = acceptConnectionParams.country;
        break;

      case "withdrawInvitation":
        const withdrawInvitationParams = context.getNodeParameter(
          "withdrawInvitationParams",
          itemIndex,
          {}
        ) as any;
        if (withdrawInvitationParams.invitationId)
          body.invitation_id = withdrawInvitationParams.invitationId;
        if (withdrawInvitationParams.country)
          body.country = withdrawInvitationParams.country;
        break;

      case "sendMessage":
        const messagesParams = context.getNodeParameter(
          "messagesParams",
          itemIndex,
          {}
        ) as any;
        if (messagesParams.messageRecipientUrl) body.linkedin_url = messagesParams.messageRecipientUrl;
        if (messagesParams.messageText) body.message_text = messagesParams.messageText;
        if (messagesParams.mediaLink) body.media_link = messagesParams.mediaLink;
        if (messagesParams.country) body.country = messagesParams.country;
        break;

      case "getConversationMessages":
        const conversationMessagesParams = context.getNodeParameter(
          "conversationMessagesParams",
          itemIndex,
          {}
        ) as any;
        if (conversationMessagesParams.linkedinUrl)
          body.linkedin_url = conversationMessagesParams.linkedinUrl;
        if (conversationMessagesParams.conversationId)
          body.conversation_id = conversationMessagesParams.conversationId;
        if (conversationMessagesParams.total_results)
          body.total_results = conversationMessagesParams.total_results;
        if (conversationMessagesParams.start_page)
          body.start_page = conversationMessagesParams.start_page;
        if (conversationMessagesParams.end_page)
          body.end_page = conversationMessagesParams.end_page;
        if (conversationMessagesParams.country)
          body.country = conversationMessagesParams.country;
        break;

      case "getPostReactions":
      case "reactToPost":
      case "repost":
      case "commentPost":
      case "extractComments":
      case "timeSpent":
        const postsParams = context.getNodeParameter(
          "postsParams",
          itemIndex,
          {}
        ) as any;
        
        if (postsParams.postUrl) body.post_url = postsParams.postUrl;
        if (postsParams.country) body.country = postsParams.country;
        if (operation === "reactToPost" && postsParams.reactionType) {
          body.reaction_type = postsParams.reactionType;
        }
        if (operation === "commentPost" && postsParams.messageText) {
          body.message = postsParams.messageText;
        }
        if (operation === "timeSpent") {
          if (postsParams.duration) body.duration = Math.floor(postsParams.duration);
          if (postsParams.durationStartTime) body.duration_start_time = Math.floor(parseInt(postsParams.durationStartTime));
        }
        if (
          operation === "getPostReactions" ||
          operation === "extractComments"
        ) {
          if (postsParams.total_results) body.total_results = postsParams.total_results;
          if (postsParams.start_page) body.start_page = postsParams.start_page;
          if (postsParams.end_page) body.end_page = postsParams.end_page;
        }
        break;

      case "answerComment":
        const trackingId = context.getNodeParameter(
          "trackingId",
          itemIndex,
          ""
        ) as string;
        const profileUrn = context.getNodeParameter(
          "profileUrn",
          itemIndex,
          ""
        ) as string;
        const commentUrn = context.getNodeParameter(
          "commentUrn",
          itemIndex,
          ""
        ) as string;
        const commentText = context.getNodeParameter(
          "commentText",
          itemIndex,
          ""
        ) as string;
        const mentionUser = context.getNodeParameter(
          "mentionUser",
          itemIndex,
          false
        ) as boolean;
        const commenterName = context.getNodeParameter(
          "commenterName",
          itemIndex,
          ""
        ) as string;
        const answerCountry = context.getNodeParameter(
          "country",
          itemIndex,
          "FR"
        ) as string;
        
        if (trackingId) body.tracking_id = trackingId;
        if (profileUrn) body.profile_urn = profileUrn;
        if (commentUrn) body.comment_urn = commentUrn;
        if (commentText) body.comment_text = commentText;
        if (mentionUser !== undefined) body.mention_user = mentionUser;
        if (commenterName) body.commenter_name = commenterName;
        if (answerCountry) body.country = answerCountry;
        break;

      case "createPost":
        const createMessageText = context.getNodeParameter(
          "messageText",
          itemIndex,
          ""
        ) as string;
        const createFile = context.getNodeParameter(
          "file",
          itemIndex,
          ""
        ) as string;
        const createCountry = context.getNodeParameter(
          "country",
          itemIndex,
          "FR"
        ) as string;
        if (createMessageText) body.message = createMessageText;
        if (createFile) body.file = createFile;
        if (createCountry) body.country = createCountry;
        break;

      case "searchProfile":
        const searchProfileParams = context.getNodeParameter(
          "searchProfileParams",
          itemIndex,
          {}
        ) as any;
        if (searchProfileParams.keyword)
          body.keyword = searchProfileParams.keyword;
        if (searchProfileParams.location)
          body.location = searchProfileParams.location;
        if (searchProfileParams.company_url)
          body.company_url = searchProfileParams.company_url;
        if (searchProfileParams.school_url)
          body.school_url = searchProfileParams.school_url;
        if (searchProfileParams.network)
          body.network = searchProfileParams.network;
        if (searchProfileParams.first_name)
          body.first_name = searchProfileParams.first_name;
        if (searchProfileParams.last_name)
          body.last_name = searchProfileParams.last_name;
        if (searchProfileParams.title) body.title = searchProfileParams.title;
        if (searchProfileParams.fetch_invitation_state !== undefined)
          body.fetch_invitation_state =
            searchProfileParams.fetch_invitation_state;
        if (searchProfileParams.total_results)
          body.total_results = searchProfileParams.total_results;
        if (searchProfileParams.start_page)
          body.start_page = searchProfileParams.start_page;
        if (searchProfileParams.end_page)
          body.end_page = searchProfileParams.end_page;
        if (searchProfileParams.country)
          body.country = searchProfileParams.country;
        break;

      case "searchCompanies":
        const searchCompaniesParams = context.getNodeParameter(
          "searchCompaniesParams",
          itemIndex,
          {}
        ) as any;
        if (searchCompaniesParams.keyword)
          body.keyword = searchCompaniesParams.keyword;
        if (searchCompaniesParams.location)
          body.location = searchCompaniesParams.location;
        if (searchCompaniesParams.sector)
          body.sector = searchCompaniesParams.sector;
        if (searchCompaniesParams.company_size)
          body.company_size = searchCompaniesParams.company_size;
        if (searchCompaniesParams.total_results)
          body.total_results = searchCompaniesParams.total_results;
        if (searchCompaniesParams.start_page)
          body.start_page = searchCompaniesParams.start_page;
        if (searchCompaniesParams.end_page)
          body.end_page = searchCompaniesParams.end_page;
        if (searchCompaniesParams.country)
          body.country = searchCompaniesParams.country;
        break;

      case "searchPosts":
        const searchPostsParams = context.getNodeParameter(
          "searchPostsParams",
          itemIndex,
          {}
        ) as any;
        if (searchPostsParams.keyword) body.keyword = searchPostsParams.keyword;
        if (searchPostsParams.post_type)
          body.post_type = searchPostsParams.post_type;
        if (searchPostsParams.sort_by) body.sort_by = searchPostsParams.sort_by;
        if (searchPostsParams.post_date)
          body.post_date = searchPostsParams.post_date;
        if (searchPostsParams.linkedin_url)
          body.linkedin_url = searchPostsParams.linkedin_url;
        if (searchPostsParams.total_results)
          body.total_results = searchPostsParams.total_results;
        if (searchPostsParams.start_page)
          body.start_page = searchPostsParams.start_page;
        if (searchPostsParams.end_page)
          body.end_page = searchPostsParams.end_page;
        if (searchPostsParams.country) body.country = searchPostsParams.country;
        break;

      case "getConnections":
        const getConnectionsParams = context.getNodeParameter(
          "getConnectionsParams",
          itemIndex,
          {}
        ) as any;
        if (getConnectionsParams.country)
          body.country = getConnectionsParams.country;
        if (getConnectionsParams.total_results)
          body.total_results = getConnectionsParams.total_results;
        if (getConnectionsParams.start_page)
          body.start_page = getConnectionsParams.start_page;
        if (getConnectionsParams.end_page)
          body.end_page = getConnectionsParams.end_page;
        break;

      case "getReceivedInvitations":
      case "getSentInvitations":
        const getInvitationsParams = context.getNodeParameter(
          "getInvitationsParams",
          itemIndex,
          {}
        ) as any;
        if (getInvitationsParams.country)
          body.country = getInvitationsParams.country;
        if (getInvitationsParams.invitation_type)
          body.invitation_type = getInvitationsParams.invitation_type;
        if (getInvitationsParams.total_results)
          body.total_results = getInvitationsParams.total_results;
        if (getInvitationsParams.start_page)
          body.start_page = getInvitationsParams.start_page;
        if (getInvitationsParams.end_page)
          body.end_page = getInvitationsParams.end_page;
        break;

      case "getNetworkRecommendations":
        const getNetworkRecommendationsParams = context.getNodeParameter(
          "getNetworkRecommendationsParams",
          itemIndex,
          {}
        ) as any;
        if (getNetworkRecommendationsParams.country)
          body.country = getNetworkRecommendationsParams.country;
        if (getNetworkRecommendationsParams.total_results)
          body.total_results = getNetworkRecommendationsParams.total_results;
        if (getNetworkRecommendationsParams.start_page)
          body.start_page = getNetworkRecommendationsParams.start_page;
        if (getNetworkRecommendationsParams.end_page)
          body.end_page = getNetworkRecommendationsParams.end_page;
        break;

      case "getMessageInbox":
        const getMessageInboxParams = context.getNodeParameter(
          "getMessageInboxParams",
          itemIndex,
          {}
        ) as any;
        if (getMessageInboxParams.country)
          body.country = getMessageInboxParams.country;
        if (getMessageInboxParams.total_results)
          body.total_results = getMessageInboxParams.total_results;
        if (getMessageInboxParams.category)
          body.category = getMessageInboxParams.category;
        if (getMessageInboxParams.next_cursor)
          body.next_cursor = getMessageInboxParams.next_cursor;
        break;

      case "getFeed":
        const getFeedParams = context.getNodeParameter(
          "getFeedParams",
          itemIndex,
          {}
        ) as any;
        if (getFeedParams.country) body.country = getFeedParams.country;
        if (getFeedParams.total_results)
          body.total_results = getFeedParams.total_results;
        break;

      case "getCandidates":
        const getCandidatesJobId = context.getNodeParameter(
          "jobId",
          itemIndex,
          ""
        ) as string;
        const getCandidatesParams = context.getNodeParameter(
          "getCandidatesParams",
          itemIndex,
          {}
        ) as any;
        if (getCandidatesJobId) body.job_id = getCandidatesJobId;
        if (getCandidatesParams.country)
          body.country = getCandidatesParams.country;
        if (getCandidatesParams.location)
          body.location = getCandidatesParams.location;
        if (getCandidatesParams.yearsOfExperience)
          body.yearsOfExperience = getCandidatesParams.yearsOfExperience;
        if (getCandidatesParams.sortType)
          body.sortType = getCandidatesParams.sortType;
        if (getCandidatesParams.sortOrder)
          body.sortOrder = getCandidatesParams.sortOrder;
        if (getCandidatesParams.ratings)
          body.ratings = getCandidatesParams.ratings;
        if (getCandidatesParams.start) body.start = getCandidatesParams.start;
        if (getCandidatesParams.total_results)
          body.total_results = getCandidatesParams.total_results;
        if (getCandidatesParams.start_page)
          body.start_page = getCandidatesParams.start_page;
        if (getCandidatesParams.end_page)
          body.end_page = getCandidatesParams.end_page;
        break;

      case "getJobPosts":
        const getJobPostsParams = context.getNodeParameter(
          "getJobPostsParams",
          itemIndex,
          {}
        ) as any;
        if (getJobPostsParams.country) body.country = getJobPostsParams.country;
        if (getJobPostsParams.jobId) body.job_id = getJobPostsParams.jobId;
        if (getJobPostsParams.fetchDetails !== undefined)
          body.fetch_details = getJobPostsParams.fetchDetails;
        if (getJobPostsParams.total_results)
          body.total_results = getJobPostsParams.total_results;
        if (getJobPostsParams.start_page)
          body.start_page = getJobPostsParams.start_page;
        if (getJobPostsParams.end_page)
          body.end_page = getJobPostsParams.end_page;
        break;

      case "getMyProfile":
        // Pas de paramètres spécifiques, juste le login token
        break;

      case "getCandidateCV":
        const getCandidateCVApplicationId = context.getNodeParameter(
          "applicationId",
          itemIndex,
          ""
        ) as string;
        const getCandidateCVParams = context.getNodeParameter(
          "getCandidateCVParams",
          itemIndex,
          {}
        ) as any;
        if (getCandidateCVApplicationId)
          body.application_id = getCandidateCVApplicationId;
        if (getCandidateCVParams.country)
          body.country = getCandidateCVParams.country;
        break;

      case "publishJob":
      case "closeJob":
        const publishCloseJobId = context.getNodeParameter(
          "jobId",
          itemIndex,
          ""
        ) as string;
        const publishCloseJobParams = context.getNodeParameter(
          "publishCloseJobParams",
          itemIndex,
          {}
        ) as any;
        if (publishCloseJobId) body.job_id = publishCloseJobId;
        if (publishCloseJobParams.country)
          body.country = publishCloseJobParams.country;
        break;

      case "createJob":
        const createJobCompanyUrl = context.getNodeParameter(
          "companyUrl",
          itemIndex,
          ""
        ) as string;
        const createJobTitle = context.getNodeParameter(
          "jobTitle",
          itemIndex,
          ""
        ) as string;
        const createJobPlace = context.getNodeParameter(
          "place",
          itemIndex,
          ""
        ) as string;
        const createJobHtmlDescription = context.getNodeParameter(
          "html_description",
          itemIndex,
          ""
        ) as string;
        const createJobParams = context.getNodeParameter(
          "createJobParams",
          itemIndex,
          {}
        ) as any;
        
        if (createJobCompanyUrl) body.company_url = createJobCompanyUrl;
        if (createJobTitle) body.title = createJobTitle;
        if (createJobPlace) body.place = createJobPlace;
        if (createJobHtmlDescription) body.html_description = createJobHtmlDescription;
        
        if (createJobParams.country) body.country = createJobParams.country;
        if (createJobParams.employment_status)
          body.employment_status = createJobParams.employment_status;
        if (createJobParams.workplace)
          body.workplace = createJobParams.workplace;
        if (createJobParams.skills) {
          try {
            body.skills = JSON.parse(createJobParams.skills);
          } catch {
            body.skills = createJobParams.skills;
          }
        }
        if (createJobParams.screening_questions) {
          try {
            body.screening_questions = JSON.parse(
              createJobParams.screening_questions
            );
          } catch {
            body.screening_questions = createJobParams.screening_questions;
          }
        }
        if (createJobParams.auto_rejection_template)
          body.auto_rejection_template =
            createJobParams.auto_rejection_template;
        if (createJobParams.contact_email)
          body.contact_email = createJobParams.contact_email;
        break;

      // === SIGNAL API CASES ===
      case "extractPostReactions":
        const extractPostReactionsUrl = context.getNodeParameter(
          "post_url",
          itemIndex,
          ""
        ) as string;
        const signalPostReactionsParams = context.getNodeParameter(
          "signalPostReactionsParams",
          itemIndex,
          {}
        ) as any;
        if (extractPostReactionsUrl) body.post_url = extractPostReactionsUrl;
        if (signalPostReactionsParams.proxy_country)
          body.proxy_country = signalPostReactionsParams.proxy_country;
        if (signalPostReactionsParams.total_results)
          body.total_results = signalPostReactionsParams.total_results;
        if (signalPostReactionsParams.use_pagination !== undefined)
          body.use_pagination = signalPostReactionsParams.use_pagination;
        if (signalPostReactionsParams.start_page)
          body.start_page = signalPostReactionsParams.start_page;
        if (signalPostReactionsParams.end_page)
          body.end_page = signalPostReactionsParams.end_page;
        break;

      case "extractPostComments":
        const extractPostCommentsUrl = context.getNodeParameter(
          "post_url",
          itemIndex,
          ""
        ) as string;
        const signalPostCommentsParams = context.getNodeParameter(
          "signalPostCommentsParams",
          itemIndex,
          {}
        ) as any;
        if (extractPostCommentsUrl) body.post_url = extractPostCommentsUrl;
        if (signalPostCommentsParams.proxy_country)
          body.proxy_country = signalPostCommentsParams.proxy_country;
        if (signalPostCommentsParams.total_results)
          body.total_results = signalPostCommentsParams.total_results;
        if (signalPostCommentsParams.use_pagination !== undefined)
          body.use_pagination = signalPostCommentsParams.use_pagination;
        if (signalPostCommentsParams.start_page)
          body.start_page = signalPostCommentsParams.start_page;
        if (signalPostCommentsParams.end_page)
          body.end_page = signalPostCommentsParams.end_page;
        break;

      case "extractProfileReactions":
        const extractProfileReactionsUrl = context.getNodeParameter(
          "profile_url",
          itemIndex,
          ""
        ) as string;
        const signalProfileReactionsParams = context.getNodeParameter(
          "signalProfileReactionsParams",
          itemIndex,
          {}
        ) as any;
        if (extractProfileReactionsUrl) body.profile_url = extractProfileReactionsUrl;
        if (signalProfileReactionsParams.proxy_country)
          body.proxy_country = signalProfileReactionsParams.proxy_country;
        if (signalProfileReactionsParams.total_results)
          body.total_results = signalProfileReactionsParams.total_results;
        if (signalProfileReactionsParams.start_page)
          body.start_page = signalProfileReactionsParams.start_page;
        if (signalProfileReactionsParams.end_page)
          body.end_page = signalProfileReactionsParams.end_page;
        if (signalProfileReactionsParams.cursor)
          body.cursor = signalProfileReactionsParams.cursor;
        break;

      case "extractProfileComments":
        const extractProfileCommentsUrl = context.getNodeParameter(
          "profile_url",
          itemIndex,
          ""
        ) as string;
        const signalProfileCommentsParams = context.getNodeParameter(
          "signalProfileCommentsParams",
          itemIndex,
          {}
        ) as any;
        if (extractProfileCommentsUrl) body.profile_url = extractProfileCommentsUrl;
        if (signalProfileCommentsParams.proxy_country)
          body.proxy_country = signalProfileCommentsParams.proxy_country;
        if (signalProfileCommentsParams.total_results)
          body.total_results = signalProfileCommentsParams.total_results;
        if (signalProfileCommentsParams.start_page)
          body.start_page = signalProfileCommentsParams.start_page;
        if (signalProfileCommentsParams.end_page)
          body.end_page = signalProfileCommentsParams.end_page;
        if (signalProfileCommentsParams.cursor)
          body.cursor = signalProfileCommentsParams.cursor;
        break;

      case "extractProfilePosts":
        const extractProfilePostsUrl = context.getNodeParameter(
          "profile_url",
          itemIndex,
          ""
        ) as string;
        const signalProfilePostsParams = context.getNodeParameter(
          "signalProfilePostsParams",
          itemIndex,
          {}
        ) as any;
        if (extractProfilePostsUrl) body.profile_url = extractProfilePostsUrl;
        if (signalProfilePostsParams.proxy_country)
          body.proxy_country = signalProfilePostsParams.proxy_country;
        if (signalProfilePostsParams.total_results)
          body.total_results = signalProfilePostsParams.total_results;
        if (signalProfilePostsParams.post_type)
          body.post_type = signalProfilePostsParams.post_type;
        if (signalProfilePostsParams.sort_by)
          body.sort_by = signalProfilePostsParams.sort_by;
        if (signalProfilePostsParams.keyword)
          body.keyword = signalProfilePostsParams.keyword;
        if (signalProfilePostsParams.post_date)
          body.post_date = signalProfilePostsParams.post_date;
        if (signalProfilePostsParams.use_pagination !== undefined)
          body.use_pagination = signalProfilePostsParams.use_pagination;
        if (signalProfilePostsParams.start_page)
          body.start_page = signalProfilePostsParams.start_page;
        if (signalProfilePostsParams.end_page)
          body.end_page = signalProfilePostsParams.end_page;
        break;

      case "extractCompanyPosts":
        const extractCompanyPostsUrl = context.getNodeParameter(
          "company_url",
          itemIndex,
          ""
        ) as string;
        const signalCompanyPostsParams = context.getNodeParameter(
          "signalCompanyPostsParams",
          itemIndex,
          {}
        ) as any;
        if (extractCompanyPostsUrl) body.company_url = extractCompanyPostsUrl;
        if (signalCompanyPostsParams.proxy_country)
          body.proxy_country = signalCompanyPostsParams.proxy_country;
        if (signalCompanyPostsParams.total_results)
          body.total_results = signalCompanyPostsParams.total_results;
        if (signalCompanyPostsParams.post_type)
          body.post_type = signalCompanyPostsParams.post_type;
        if (signalCompanyPostsParams.sort_by)
          body.sort_by = signalCompanyPostsParams.sort_by;
        if (signalCompanyPostsParams.keyword)
          body.keyword = signalCompanyPostsParams.keyword;
        if (signalCompanyPostsParams.post_date)
          body.post_date = signalCompanyPostsParams.post_date;
        if (signalCompanyPostsParams.use_pagination !== undefined)
          body.use_pagination = signalCompanyPostsParams.use_pagination;
        if (signalCompanyPostsParams.start_page)
          body.start_page = signalCompanyPostsParams.start_page;
        if (signalCompanyPostsParams.end_page)
          body.end_page = signalCompanyPostsParams.end_page;
        break;

      // === COMPANY API CASES ===
      case "searchCompaniesApi":
        const searchCompaniesApiKeyword = context.getNodeParameter(
          "keyword",
          itemIndex,
          ""
        ) as string;
        const companyApiSearchParams = context.getNodeParameter(
          "companyApiSearchParams",
          itemIndex,
          {}
        ) as any;
        if (searchCompaniesApiKeyword) body.keyword = searchCompaniesApiKeyword;
        if (companyApiSearchParams.industry)
          body.industry = companyApiSearchParams.industry;
        if (companyApiSearchParams.location)
          body.location = companyApiSearchParams.location;
        if (companyApiSearchParams.employee_range)
          body.employee_range = companyApiSearchParams.employee_range;
        if (companyApiSearchParams.founding_company !== undefined)
          body.founding_company = companyApiSearchParams.founding_company;
        if (companyApiSearchParams.total_results)
          body.total_results = companyApiSearchParams.total_results;
        break;

      case "getCompanyInfoApi":
        const getCompanyInfoApiUrl = context.getNodeParameter(
          "company_url",
          itemIndex,
          ""
        ) as string;
        if (getCompanyInfoApiUrl) body.company_url = getCompanyInfoApiUrl;
        break;

      case "getCompanyInfoByDomain":
        const getCompanyInfoByDomainDomain = context.getNodeParameter(
          "domain",
          itemIndex,
          ""
        ) as string;
        if (getCompanyInfoByDomainDomain) body.domain = getCompanyInfoByDomainDomain;
        break;

      // === PERSON API CASES ===
      case "searchProfilesApi":
        const searchProfilesApiKeyword = context.getNodeParameter(
          "keyword",
          itemIndex,
          ""
        ) as string;
        const personApiSearchParams = context.getNodeParameter(
          "personApiSearchParams",
          itemIndex,
          {}
        ) as any;
        if (searchProfilesApiKeyword) body.keyword = searchProfilesApiKeyword;
        if (personApiSearchParams.job_title)
          body.job_title = personApiSearchParams.job_title;
        if (personApiSearchParams.industry)
          body.industry = personApiSearchParams.industry;
        if (personApiSearchParams.school)
          body.school = personApiSearchParams.school;
        if (personApiSearchParams.location)
          body.location = personApiSearchParams.location;
        if (personApiSearchParams.current_company)
          body.current_company = personApiSearchParams.current_company;
        if (personApiSearchParams.total_results)
          body.total_results = personApiSearchParams.total_results;
        break;

      case "extractProfileInfoApi":
        const extractProfileInfoApiUrl = context.getNodeParameter(
          "profileUrl",
          itemIndex,
          ""
        ) as string;
        const personApiExtractInfoParams = context.getNodeParameter(
          "personApiExtractInfoParams",
          itemIndex,
          {}
        ) as any;
        if (extractProfileInfoApiUrl) body.linkedin_url = extractProfileInfoApiUrl;
        if (personApiExtractInfoParams.country)
          body.country = personApiExtractInfoParams.country;
        break;

      case "profileEnrichment":
        const profileEnrichmentFirstName = context.getNodeParameter(
          "first_name",
          itemIndex,
          ""
        ) as string;
        const profileEnrichmentLastName = context.getNodeParameter(
          "last_name",
          itemIndex,
          ""
        ) as string;
        const profileEnrichmentCompanyName = context.getNodeParameter(
          "company_name",
          itemIndex,
          ""
        ) as string;
        if (profileEnrichmentFirstName) body.first_name = profileEnrichmentFirstName;
        if (profileEnrichmentLastName) body.last_name = profileEnrichmentLastName;
        if (profileEnrichmentCompanyName) body.company_name = profileEnrichmentCompanyName;
        break;
    }

    // Ajouter le pays par défaut si pas spécifié
    if (!body.country) {
      body.country = "FR";
    }

    return body;
  }

  private getEndpointForOperation(operation: string): string {
    const endpointMap: Record<string, string> = {
      // AUTH
      login: "/auth/login",
      verifyCode: "/auth/verify",

      // PROFILE
      getMyProfile: "/profile/me",
      extractProfileInfo: "/profile/info",
      searchProfile: "/profile/search",

      // COMPANIES
      searchCompanies: "/companies/search",
      getCompanyInfo: "/companies/info",

      // NETWORK
      sendConnectionRequest: "/network/connect",
      getConnections: "/network/connections",
      acceptConnectionInvitation: "/network/accept-invitations",
      getReceivedInvitations: "/network/invitations",
      getSentInvitations: "/network/sent-invitations",
      withdrawInvitation: "/network/withdraw-invitation",
      getNetworkRecommendations: "/network/recommendations",
      getInvitationStatus: "/network/invitation-status",

      // MESSAGES
      sendMessage: "/messages/send",
      getMessageInbox: "/messages/inbox",
      getConversationMessages: "/messages/conversation-messages",

      // POSTS
      getPostReactions: "/posts/reactions",
      reactToPost: "/posts/react",
      repost: "/posts/repost",
      commentPost: "/posts/comment",
      extractComments: "/posts/extract-comments",
      answerComment: "/posts/answer-comment",
      searchPosts: "/posts/search",
      createPost: "/posts/create",
      getFeed: "/posts/feed",
      timeSpent: "/posts/time-spent",

      // RECRUITER
      getCandidates: "/recruiter/candidates",
      getCandidateCV: "/recruiter/cv",
      getJobPosts: "/recruiter/job-posts",
      publishJob: "/recruiter/publish-job",
      closeJob: "/recruiter/close-job",
      createJob: "/recruiter/create-job",

      // SIGNAL API (nouveaux)
      extractPostReactions: "/data/signals/posts/reactions",
      extractPostComments: "/data/signals/posts/comments",
      extractProfileReactions: "/data/signals/profile/reactions",
      extractProfileComments: "/data/signals/profile/comments",
      extractProfilePosts: "/data/signals/profile/posts",
      extractCompanyPosts: "/data/signals/company/posts",

      // COMPANY API (nouveaux)
      searchCompaniesApi: "/data/search/companies",
      getCompanyInfoApi: "/data/company/info",
      getCompanyInfoByDomain: "/data/company/info-by-domain",

      // PERSON API (nouveaux)
      searchProfilesApi: "/data/search/profiles",
      extractProfileInfoApi: "/person/extract-info",
      profileEnrichment: "/data/profil/enrich",
    };

    return endpointMap[operation] || "/unknown";
  }

  // === MAIN EXECUTION METHOD ===
  async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
    const items = this.getInputData();
    const returnData: INodeExecutionData[] = [];

    for (let i = 0; i < items.length; i++) {
      const resource = this.getNodeParameter("resource", i) as string;
      const operation = this.getNodeParameter("operation", i) as string;

      try {
        const timeout = 30000; // Default timeout

        // Get credentials
        const creds = await Linkup.prototype.getCredentialsWithFallback.call(
          this,
          this
        );

        // Construire le body de la requête
        const body = await Linkup.prototype.buildRequestBody.call(
          this,
          this,
          i,
          operation,
          creds.loginToken
        );

        // Get endpoint
        const endpoint = Linkup.prototype.getEndpointForOperation.call(
          this,
          operation
        );

        // Construire les options de requête
        const requestOptions = Linkup.prototype.buildRequestOptions.call(
          this,
          endpoint,
          "POST",
          creds.apiKey,
          body,
          timeout
        );

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
              resource,
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
            error: error.message || "Unknown error",
            resource,
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
