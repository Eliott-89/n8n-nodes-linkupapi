import { INodeProperties } from "n8n-workflow";

export const networkProperties: INodeProperties[] = [
  // Network operations
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

  // NETWORK - Paramètres
  {
    displayName: "Send Connection Parameters",
    name: "sendConnectionParams",
    type: "collection",
    placeholder: "Add connection parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["network"],
        operation: ["sendConnectionRequest"],
      },
    },
    options: [
      {
        displayName: "Profile URL *",
        name: "profileUrl",
        type: "string",
        default: "",
        required: true,
        placeholder: "https://www.linkedin.com/in/username",
        description: "LinkedIn profile URL to connect with",
      },
      {
        displayName: "Connection Message",
        name: "connectionMessage",
        type: "string",
        default: "",
        placeholder: "Hi, I'd like to connect with you!",
        description: "Custom message for connection request",
      },
    ],
  },
  {
    displayName: "Accept Invitation Parameters",
    name: "acceptInvitationParams",
    type: "collection",
    placeholder: "Add invitation parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["network"],
        operation: ["acceptConnectionInvitation"],
      },
    },
    options: [
      {
        displayName: "Entity URN *",
        name: "entityUrn",
        type: "string",
        default: "",
        required: true,
        placeholder: "urn:li:fsd_profile:123456789",
        description: "Entity URN for the invitation",
      },
      {
        displayName: "Shared Secret *",
        name: "sharedSecret",
        type: "string",
        default: "",
        required: true,
        placeholder: "shared_secret_here",
        description: "Shared secret for the invitation",
      },
    ],
  },
  {
    displayName: "Withdraw Invitation Parameters",
    name: "withdrawInvitationParams",
    type: "collection",
    placeholder: "Add withdrawal parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["network"],
        operation: ["withdrawInvitation"],
      },
    },
    options: [
      {
        displayName: "Invitation ID *",
        name: "invitationId",
        type: "string",
        default: "",
        required: true,
        placeholder: "invitation_id_here",
        description: "LinkedIn invitation ID",
      },
    ],
  },
  {
    displayName: "Get Invitation Status Parameters",
    name: "getInvitationStatusParams",
    type: "collection",
    placeholder: "Add status parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["network"],
        operation: ["getInvitationStatus"],
      },
    },
    options: [
      {
        displayName: "Profile URL *",
        name: "profileUrl",
        type: "string",
        default: "",
        required: true,
        placeholder: "https://www.linkedin.com/in/username",
        description: "LinkedIn profile URL to check invitation status",
      },
    ],
  },
  {
    displayName: "Get Connections Parameters",
    name: "getConnectionsParams",
    type: "collection",
    placeholder: "Add connection parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["network"],
        operation: ["getConnections"],
      },
    },
    options: [
      {
        displayName: "Country",
        name: "country",
        type: "string",
        default: "FR",
        placeholder: "FR, US, UK, DE, ES, IT, CA, AU, etc.",
        description: "Country code for proxy selection",
      },
      {
        displayName: "Total Results",
        name: "total_results",
        type: "number",
        default: 10,
        description: "Number of results to return",
      },
      {
        displayName: "Start Page",
        name: "start_page",
        type: "number",
        default: 1,
        description: "Starting page number",
      },
      {
        displayName: "End Page",
        name: "end_page",
        type: "number",
        default: 1,
        description: "Ending page number",
      },
    ],
  },
  {
    displayName: "Get Invitations Parameters",
    name: "getInvitationsParams",
    type: "collection",
    placeholder: "Add invitation parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["network"],
        operation: ["getReceivedInvitations", "getSentInvitations"],
      },
    },
    options: [
      {
        displayName: "Country",
        name: "country",
        type: "string",
        default: "FR",
        placeholder: "FR, US, UK, DE, ES, IT, CA, AU, etc.",
        description: "Country code for proxy selection",
      },
      {
        displayName: "Invitation Type",
        name: "invitation_type",
        type: "string",
        default: "",
        placeholder: "received, sent",
        description: "Type of invitations to get",
      },
      {
        displayName: "Total Results",
        name: "total_results",
        type: "number",
        default: 10,
        description: "Number of results to return",
      },
      {
        displayName: "Start Page",
        name: "start_page",
        type: "number",
        default: 1,
        description: "Starting page number",
      },
      {
        displayName: "End Page",
        name: "end_page",
        type: "number",
        default: 1,
        description: "Ending page number",
      },
    ],
  },
  {
    displayName: "Get Network Recommendations Parameters",
    name: "getNetworkRecommendationsParams",
    type: "collection",
    placeholder: "Add recommendation parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["network"],
        operation: ["getNetworkRecommendations"],
      },
    },
    options: [
      {
        displayName: "Country",
        name: "country",
        type: "string",
        default: "FR",
        placeholder: "FR, US, UK, DE, ES, IT, CA, AU, etc.",
        description: "Country code for proxy selection",
      },
      {
        displayName: "Total Results",
        name: "total_results",
        type: "number",
        default: 10,
        description: "Number of results to return",
      },
      {
        displayName: "Start Page",
        name: "start_page",
        type: "number",
        default: 1,
        description: "Starting page number",
      },
      {
        displayName: "End Page",
        name: "end_page",
        type: "number",
        default: 1,
        description: "Ending page number",
      },
    ],
  },
];