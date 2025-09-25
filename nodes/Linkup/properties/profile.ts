import { INodeProperties } from "n8n-workflow";

export const profileProperties: INodeProperties[] = [
  // PROFILE - Linkup Parameters
  {
    displayName: "Get Profile Info Parameters",
    name: "getProfileInfoParams",
    type: "collection",
    placeholder: "Add profile parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["profile"],
        operation: ["get profile info"],
      },
    },
    options: [
      {
        displayName: "LinkedIn URL *",
        name: "linkedin_url",
        type: "string",
        default: "",
        placeholder: "e.g. https://www.linkedin.com/in/nathanSmith",
        description: "LinkedIn profile URL",
      },
    ],
  },
  {
    displayName: "Search Profile Parameters",
    name: "searchProfileParams",
    type: "collection",
    placeholder: "Add search parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["profile"],
        operation: ["search profile"],
      },
    },
    options: [
      {
        displayName: "Company URL",
        name: "company_url",
        type: "string",
        default: "",
        placeholder: "e.g. https://www.linkedin.com/company/microsoftCorp",
        description: "Company LinkedIn URL to filter by",
      },
      {
        displayName: "Location",
        name: "location",
        type: "string",
        default: "",
        placeholder: "e.g. sanFrancisco",
        description: "Location to search in",
      },
      {
        displayName: "School URL",
        name: "school_url",
        type: "string",
        default: "",
        placeholder: "e.g. https://www.linkedin.com/school/stanfordUniversity",
        description: "School LinkedIn URL to filter by",
      },
      {
        displayName: "Network",
        name: "network",
        type: "string",
        default: "",
        placeholder: "e.g. firstConnection",
        description: "Network connection degree",
      },
      {
        displayName: "Keyword",
        name: "keyword",
        type: "string",
        default: "",
        placeholder: "e.g. automation",
        description: "Search keyword",
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

      {
        displayName: "First Name",
        name: "first_name",
        type: "string",
        default: "",
        placeholder: "e.g. Nathan",
        description: "First name to filter by",
      },
      {
        displayName: "Last Name",
        name: "last_name",
        type: "string",
        default: "",
        placeholder: "e.g. Smith",
        description: "Last name to filter by",
      },
      {
        displayName: "Title",
        name: "title",
        type: "string",
        default: "",
        placeholder: "e.g. softwareEngineer",
        description: "Job title to filter by",
      },
      {
        displayName: "Fetch Invitation State",
        name: "fetch_invitation_state",
        type: "boolean",
        default: false,
        description: "Fetch invitation state for results",
      },
    ],
  },
];
