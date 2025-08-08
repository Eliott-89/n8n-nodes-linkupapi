import { INodeProperties } from "n8n-workflow";

export const signalProperties: INodeProperties[] = [
  // SIGNAL - Paramètres
  {
    displayName: "Post URL Parameters",
    name: "postUrlParams",
    type: "collection",
    placeholder: "Add post parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["signal"],
        operation: ["extractPostReactions", "extractPostComments"],
      },
    },
    options: [
      {
        displayName: "Post URL *",
        name: "post_url",
        type: "string",
        required: true,
        default: "",
        placeholder: "https://www.linkedin.com/posts/activity-123456789",
        description: "LinkedIn post URL to extract data from",
      },
    ],
  },
  {
    displayName: "Profile URL Parameters",
    name: "profileUrlParams",
    type: "collection",
    placeholder: "Add profile parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["signal"],
        operation: ["extractProfileReactions", "extractProfileComments", "extractProfilePosts"],
      },
    },
    options: [
      {
        displayName: "Profile URL *",
        name: "profile_url",
        type: "string",
        required: true,
        default: "",
        placeholder: "https://www.linkedin.com/in/username",
        description: "LinkedIn profile URL to extract data from",
      },
    ],
  },
  {
    displayName: "Company URL Parameters",
    name: "companyUrlParams",
    type: "collection",
    placeholder: "Add company parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["signal"],
        operation: ["extractCompanyPosts"],
      },
    },
    options: [
      {
        displayName: "Company URL *",
        name: "company_url",
        type: "string",
        required: true,
        default: "",
        placeholder: "https://www.linkedin.com/company/microsoft",
        description: "LinkedIn company URL to extract data from",
      },
    ],
  },
  {
    displayName: "Common Signal Parameters",
    name: "commonSignalParams",
    type: "collection",
    placeholder: "Add common parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["signal"],
        operation: ["extractPostReactions", "extractPostComments", "extractProfileReactions", "extractProfileComments", "extractProfilePosts", "extractCompanyPosts"],
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