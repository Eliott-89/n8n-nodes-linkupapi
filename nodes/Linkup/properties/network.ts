import { INodeProperties } from "n8n-workflow";

export const networkProperties: INodeProperties[] = [
  // NETWORK - Parameters
  {
    displayName: "Send Connection Parameters",
    name: "sendConnectionParams",
    type: "collection",
    placeholder: "Add connection parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["network"],
        operation: ["send connection request"],
      },
    },
    options: [
      {
        displayName: "Profile URL *",
        name: "profileUrl",
        type: "string",
        default: "",
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
        operation: ["accept connection invitation"],
      },
    },
    options: [
      {
        displayName: "Shared Secret *",
        name: "shared_secret",
        type: "string",
        default: "",
        placeholder: "shared_secret_here",
        description: "Shared secret for invitation acceptance",
      },
      {
        displayName: "Entity URN *",
        name: "entity_urn",
        type: "string",
        default: "",
        placeholder: "entity_urn_here",
        description: "Entity URN for invitation acceptance",
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
        operation: ["withdraw invitation"],
      },
    },
    options: [
      {
        displayName: "Invitation ID *",
        name: "invitationId",
        type: "string",
        default: "",
        placeholder: "invitation_id_here",
        description: "LinkedIn invitation ID to withdraw",
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
        operation: ["get invitation status"],
      },
    },
    options: [
      {
        displayName: "Profile URL *",
        name: "profileUrl",
        type: "string",
        default: "",
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
        operation: ["get connections"],
      },
    },
    options: [
      
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
    displayName: "Get Received Invitations Parameters",
    name: "getReceivedInvitationsParams",
    type: "collection",
    placeholder: "Add invitation parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["network"],
        operation: ["get received invitations"],
      },
    },
    options: [
      
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
      {
        displayName: "Total Results",
        name: "total_results",
        type: "number",
        default: 10,
        description: "Number of results to return",
      },
      {
        displayName: "Invitation Type",
        name: "invitation_type",
        type: "string",
        default: "",
        placeholder: "Type of invitation",
        description: "Type of invitation to filter by",
      },
    ],
  },
  {
    displayName: "Get Sent Invitations Parameters",
    name: "getSentInvitationsParams",
    type: "collection",
    placeholder: "Add invitation parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["network"],
        operation: ["get sent invitations"],
      },
    },
    options: [
      {
        displayName: "Invitation Type",
        name: "invitation_type",
        type: "string",
        default: "",
        placeholder: "Type of invitation",
        description: "Type of invitation to filter by",
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
        operation: ["get network recommendations"],
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
