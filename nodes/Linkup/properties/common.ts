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
        name: "Profiles",
        value: "profile",
      },
      {
        name: "Companies",
        value: "company",
      },
      {
        name: "Network",
        value: "network",
      },
      {
        name: "Messages",
        value: "message",
      },
      {
        name: "Posts",
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
        value: "company api",
      },
      {
        name: "Person API",
        value: "person api",
      },
      {
        name: "Mail API",
        value: "mail api",
      },
      {
        name: "Multi Requests",
        value: "multi requests",
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
        value: "verify code",
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
        value: "get my profile",
        description: "Get your LinkedIn profile information",
      },
      {
        name: "Get Profile Information",
        value: "get profile info",
        description: "Get profile information (profile/info)",
      },
      {
        name: "Search Profile",
        value: "search profile",
        description: "Search LinkedIn profiles",
      },
    ],
    default: "get my profile",
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
        value: "search companies",
        description: "Search for companies on LinkedIn",
      },
      {
        name: "Get Company Information",
        value: "get company info",
        description: "Get detailed information about a company",
      },
    ],
    default: "search companies",
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
        value: "send connection request",
        description: "Send a connection request to a profile",
      },
      {
        name: "Get Connections",
        value: "get connections",
        description: "Get your LinkedIn connections",
      },
      {
        name: "Accept Connection Invitation",
        value: "accept connection invitation",
        description: "Accept a received connection invitation",
      },
      {
        name: "Get Received Invitations",
        value: "get received invitations",
        description: "Get received connection invitations",
      },
      {
        name: "Get Sent Invitations",
        value: "get sent invitations",
        description: "Get sent connection invitations",
      },
      {
        name: "Withdraw Invitation",
        value: "withdraw invitation",
        description: "Withdraw a sent invitation",
      },
      {
        name: "Get Network Recommendations",
        value: "get network recommendations",
        description: "Get network recommendations",
      },
      {
        name: "Get Invitation Status",
        value: "get invitation status",
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
        value: "send message",
        description: "Send a message to a connection",
      },
      {
        name: "Get Message Inbox",
        value: "get message inbox",
        description: "Get your message inbox",
      },
      {
        name: "Get Conversation Messages",
        value: "get conversation messages",
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
        value: "get post reactions",
        description: "Get reactions on a post",
      },
      {
        name: "React To Post",
        value: "react to post",
        description: "React to a post",
      },
      {
        name: "Repost Content",
        value: "repost content",
        description: "Repost content",
      },
      {
        name: "Add Comment To Post",
        value: "add comment to post",
        description: "Add a comment to a post",
      },
      {
        name: "Get Comments",
        value: "get comments",
        description: "Get comments on a post",
      },
      {
        name: "Answer Comment",
        value: "answer comment",
        description: "Answer a comment",
      },
      {
        name: "Search Posts",
        value: "search posts",
        description: "Search for posts",
      },
      {
        name: "Create Post",
        value: "create post",
        description: "Create a new post",
      },
      {
        name: "Get LinkedIn Feed",
        value: "get linkedin feed",
        description: "Get your LinkedIn feed",
      },
      {
        name: "Send Post Time Spent",
        value: "send post time spent",
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
        value: "get candidates",
        description: "Get candidate list",
      },
      {
        name: "Get Candidate CV",
        value: "get candidate cv",
        description: "Get candidate CV",
      },
      {
        name: "Get Job Posts",
        value: "get job posts",
        description: "Get job posts",
      },
      {
        name: "Publish Job",
        value: "publish job",
        description: "Publish a job",
      },
      {
        name: "Close Job",
        value: "close job",
        description: "Close a job",
      },
      {
        name: "Create Job",
        value: "create job",
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
        value: "extract post reactions",
        description: "Extract reactions from a post",
      },
      {
        name: "Extract Post Comments",
        value: "extract post comments",
        description: "Extract comments from a post",
      },
      {
        name: "Extract Profile Reactions",
        value: "extract profile reactions",
        description: "Extract reactions from a profile",
      },
      {
        name: "Extract Profile Comments",
        value: "extract profile comments",
        description: "Extract comments from a profile",
      },
      {
        name: "Extract Profile Posts",
        value: "extract profile posts",
        description: "Extract posts from a profile",
      },
      {
        name: "Extract Company Posts",
        value: "extract company posts",
        description: "Extract posts from a company",
      },
    ],
    default: "extract post reactions",
  },
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["company api"],
      },
    },
    options: [
      {
        name: "Search Companies",
        value: "search companies",
        description: "Search for companies",
      },
      {
        name: "Get Company Information",
        value: "get company info",
        description: "Get company information",
      },
      {
        name: "Get Company Information By Domain",
        value: "get company info by domain",
        description: "Get company information by domain",
      },
    ],
    default: "search companies",
  },
  {
    displayName: "Operation",
    name: "operation",
    type: "options",
    noDataExpression: true,
    displayOptions: {
      show: {
        resource: ["person api"],
      },
    },
    options: [
      {
        name: "Search Profiles",
        value: "search profiles",
        description: "Search for profiles",
      },
      {
        name: "Extract Profile Information",
        value: "extract profile info",
        description: "Extract profile information (data/profil/info)",
      },
      {
        name: "Profile Enrichment",
        value: "profile enrichment",
        description: "Enrich profile information",
      },
      {
        name: "Extract Company Employees",
        value: "extract company employees",
        description: "Extract employees from a company",
      },
    ],
    default: "search profiles",
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
          "company api",
          "person api",
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
