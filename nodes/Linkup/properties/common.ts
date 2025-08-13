import { INodeProperties } from "n8n-workflow";

// Common properties used throughout the node
export const commonProperties: INodeProperties[] = [
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

  // === RESOURCE SELECTOR ===
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
        name: "Signal API",
        value: "signal",
      },
      {
        name: "Company API",
        value: "companyApi",
      },
      {
        name: "Person API",
        value: "personApi",
      },
      {
        name: "Multi Requests",
        value: "multiRequests",
      },
    ],
    default: "authentication",
  },

  // === OPERATION SELECTOR ===
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
        description: "Authenticate your LinkedIn account via Linkup",
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
        name: "Get Profile Information",
        value: "getProfileInfo",
        description: "Get profile information (profile/info)",
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
        description: "Search for companies on LinkedIn",
      },
      {
        name: "Get Company Information",
        value: "getCompanyInfo",
        description: "Get detailed information about a company",
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
        description: "Send a connection request to a profile",
      },
      {
        name: "Get Connections",
        value: "getConnections",
        description: "Get your LinkedIn connections",
      },
      {
        name: "Accept Connection Invitation",
        value: "acceptConnectionInvitation",
        description: "Accept a received connection invitation",
      },
      {
        name: "Get Received Invitations",
        value: "getReceivedInvitations",
        description: "Get received connection invitations",
      },
      {
        name: "Get Sent Invitations",
        value: "getSentInvitations",
        description: "Get sent connection invitations",
      },
      {
        name: "Withdraw Invitation",
        value: "withdrawInvitation",
        description: "Withdraw a sent invitation",
      },
      {
        name: "Get Network Recommendations",
        value: "getNetworkRecommendations",
        description: "Get network recommendations",
      },
      {
        name: "Get Invitation Status",
        value: "getInvitationStatus",
        description: "Check invitation status for a profile",
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
        description: "Send a message to a connection",
      },
      {
        name: "Get Message Inbox",
        value: "getMessageInbox",
        description: "Get your message inbox",
      },
      {
        name: "Get Conversation Messages",
        value: "getConversationMessages",
        description: "Get messages from a conversation",
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
        name: "Get Post Reactions",
        value: "getPostReactions",
        description: "Get reactions on a post",
      },
      {
        name: "React to Post",
        value: "reactToPost",
        description: "React to a post",
      },
      {
        name: "Repost Content",
        value: "repostContent",
        description: "Repost content",
      },
      {
        name: "Add Comment to Post",
        value: "addCommentToPost",
        description: "Add a comment to a post",
      },
      {
        name: "Get Comments",
        value: "getComments",
        description: "Get comments on a post",
      },
      {
        name: "Answer Comment",
        value: "answerComment",
        description: "Answer a comment",
      },
      {
        name: "Search Posts",
        value: "searchPosts",
        description: "Search for posts",
      },
      {
        name: "Create Post",
        value: "createPost",
        description: "Create a new post",
      },
      {
        name: "Get LinkedIn Feed",
        value: "getLinkedInFeed",
        description: "Get your LinkedIn feed",
      },
      {
        name: "Send Post Time Spent",
        value: "sendPostTimeSpent",
        description: "Send post time spent signal",
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
        name: "Get Candidates",
        value: "getCandidates",
        description: "Get candidate list",
      },
      {
        name: "Get Candidate CV",
        value: "getCandidateCV",
        description: "Get candidate CV",
      },
      {
        name: "Get Job Posts",
        value: "getJobPosts",
        description: "Get job posts",
      },
      {
        name: "Publish Job",
        value: "publishJob",
        description: "Publish a job",
      },
      {
        name: "Close Job",
        value: "closeJob",
        description: "Close a job",
      },
      {
        name: "Create Job",
        value: "createJob",
        description: "Create a new job",
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
        name: "Extract Post Reactions",
        value: "extractPostReactions",
        description: "Extract reactions from a post",
      },
      {
        name: "Extract Post Comments",
        value: "extractPostComments",
        description: "Extract comments from a post",
      },
      {
        name: "Extract Profile Reactions",
        value: "extractProfileReactions",
        description: "Extract reactions from a profile",
      },
      {
        name: "Extract Profile Comments",
        value: "extractProfileComments",
        description: "Extract comments from a profile",
      },
      {
        name: "Extract Profile Posts",
        value: "extractProfilePosts",
        description: "Extract posts from a profile",
      },
      {
        name: "Extract Company Posts",
        value: "extractCompanyPosts",
        description: "Extract posts from a company",
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
        name: "Search Companies",
        value: "searchCompanies",
        description: "Search for companies",
      },
      {
        name: "Get Company Information",
        value: "getCompanyInfo",
        description: "Get company information",
      },
      {
        name: "Get Company Information by Domain",
        value: "getCompanyInfoByDomain",
        description: "Get company information by domain",
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
        resource: ["personApi"],
      },
    },
    options: [
      {
        name: "Search Profiles",
        value: "searchProfiles",
        description: "Search for profiles",
      },
      {
        name: "Extract Profile Information",
        value: "extractProfileInfo",
        description: "Extract profile information (data/profil/info)",
      },
      {
        name: "Get Profile Information",
        value: "getProfileInfo",
        description: "Get profile information (profile/info)",
      },
      {
        name: "Profile Enrichment",
        value: "profileEnrichment",
        description: "Enrich profile information",
      },
    ],
    default: "searchProfiles",
  },
];

// Propriétés communes pour la pagination
export const paginationProperties: INodeProperties[] = [
  {
    displayName: "Pagination",
    name: "pagination",
    type: "collection",
    placeholder: "Add pagination options",
    default: {},
    displayOptions: {
      show: {
        resource: [
          "profile",
          "company",
          "network",
          "message",
          "post",
          "recruiter",
          "signal",
          "companyApi",
          "personApi",
        ],
      },
    },
    options: [
      {
        displayName: "Limit",
        name: "limit",
        type: "number",
        default: 10,
        description: "Number of results to return",
      },
      {
        displayName: "Offset",
        name: "offset",
        type: "number",
        default: 0,
        description: "Number of results to skip",
      },
    ],
  },
];

// Propriété pour le pays (utilisée dans plusieurs opérations)
export const countryProperty: INodeProperties = {
  displayName: "Country",
  name: "country",
  type: "string",
  default: "FR",
  placeholder: "FR, US, UK, DE, ES, IT, CA, AU, etc.",
  description: "Country code for proxy selection",
};
