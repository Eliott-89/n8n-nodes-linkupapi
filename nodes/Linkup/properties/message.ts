import { INodeProperties } from "n8n-workflow";

export const messageProperties: INodeProperties[] = [
  // MESSAGE - Paramètres
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
        displayName: "Message Recipient URL *",
        name: "messageRecipientUrl",
        type: "string",
        required: true,
        default: "",
        placeholder: "https://www.linkedin.com/in/username",
        description: "LinkedIn profile URL to send message to",
      },
      {
        displayName: "Message Text *",
        name: "messageText",
        type: "string",
        required: true,
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
        description: "LinkedIn profile URL",
      },
      {
        displayName: "Conversation ID",
        name: "conversationId",
        type: "string",
        default: "",
        placeholder: "conversation_id_here",
        description: "LinkedIn conversation ID",
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
        placeholder: "focused, other, all",
        description: "Inbox category to filter by",
      },
      {
        displayName: "Next Cursor",
        name: "next_cursor",
        type: "string",
        default: "",
        placeholder: "pagination cursor",
        description: "Cursor for pagination",
      },
    ],
  },
]; 