import { INodeProperties } from "n8n-workflow";

export const messageProperties: INodeProperties[] = [
  // MESSAGE - Parameters
  {
    displayName: "Send Message Parameters",
    name: "sendMessageParams",
    type: "collection",
    placeholder: "Add message parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["message"],
        operation: ["sendMessage"],
      },
    },
    options: [
      {
        displayName: "LinkedIn URL *",
        name: "linkedin_url",
        type: "string",
        default: "",
        placeholder: "https://www.linkedin.com/in/username",
        description: "LinkedIn profile URL to send message to",
      },
      {
        displayName: "Message Text *",
        name: "message_text",
        type: "string",
        default: "",
        placeholder: "Hello! How are you?",
        description: "Message content to send",
      },
      {
        displayName: "Country",
        name: "country",
        type: "string",
        default: "FR",
        placeholder: "FR, US, UK, DE, ES, IT, CA, AU, etc.",
        description: "Country code for proxy selection",
      },
      {
        displayName: "Media Link",
        name: "media_link",
        type: "string",
        default: "",
        placeholder: "https://example.com/image.jpg",
        description:
          "Direct URL to a media file (image, video, document). Must be a public URL accessible via HTTP/HTTPS. Local URLs (file://) are not supported.",
      },
    ],
  },
  {
    displayName: "Conversation Messages Parameters",
    name: "conversationMessagesParams",
    type: "collection",
    placeholder: "Add conversation parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["message"],
        operation: ["getConversationMessages"],
      },
    },
    options: [
      {
        displayName: "LinkedIn URL",
        name: "linkedinUrl",
        type: "string",
        default: "",
        placeholder: "https://www.linkedin.com/in/username",
        description:
          "LinkedIn profile URL (required if conversation_id is not provided)",
      },
      {
        displayName: "Conversation ID",
        name: "conversationId",
        type: "string",
        default: "",
        placeholder: "conversation_id_here",
        description:
          "LinkedIn conversation ID (required if linkedin_url is not provided)",
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
    displayName: "Get Message Inbox Parameters",
    name: "getMessageInboxParams",
    type: "collection",
    placeholder: "Add inbox parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["message"],
        operation: ["getMessageInbox"],
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
        displayName: "Category",
        name: "category",
        type: "string",
        default: "",
        placeholder: "INBOX, INMAIL, JOB, UNREAD",
        description: "Category to filter messages",
      },
      {
        displayName: "Next Cursor",
        name: "next_cursor",
        type: "string",
        default: "",
        placeholder: "Pagination cursor",
        description: "Cursor for pagination",
      },
    ],
  },
];
