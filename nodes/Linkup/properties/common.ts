import { INodeProperties } from "n8n-workflow";

// Propriétés communes utilisées dans tout le nœud
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
        name: "Company API",
        value: "companyApi",
      },
      {
        name: "Person API",
        value: "personApi",
      },
    ],
    default: "authentication",
  },


];

// Propriété commune pour le paramètre Country
export const countryProperty: INodeProperties = {
  displayName: "Country",
  name: "country",
  type: "string",
  default: "FR",
  placeholder: "FR, US, UK, DE, ES, IT, CA, AU, etc.",
  description: "Country code for proxy selection",
};

// Propriété commune pour les paramètres de pagination
export const paginationProperties: INodeProperties[] = [
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
]; 