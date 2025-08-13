import {
  ICredentialType,
  INodeProperties,
  IAuthenticateGeneric,
  ICredentialTestRequest,
} from "n8n-workflow";

export class LinkupApi implements ICredentialType {
  name = "linkupApi";
  displayName = "LINKUP API";
  documentationUrl = "https://docs.linkupapi.com/";

  properties: INodeProperties[] = [
    {
      displayName: "LINKUP API Key",
      name: "apiKey",
      type: "string",
      default: "",
      description:
        "Your LINKUP API key from [linkupapi.com](https://linkupapi.com) dashboard",
      typeOptions: {
        password: true,
      },
    },
    {
      displayName: "LinkedIn Email",
      name: "linkedinEmail",
      type: "string",
      default: "",
      description: "Your LinkedIn email address",
    },
    {
      displayName: "LinkedIn Password",
      name: "linkedinPassword",
      type: "string",
      default: "",
      description: "Your LinkedIn password",
      typeOptions: {
        password: true,
      },
    },
    {
      displayName: "Login Token (Optional)",
      name: "loginToken",
      type: "string",
      default: "",
      description: "LinkedIn authentication token if you have one",
      typeOptions: {
        password: true,
      },
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
  ];
  authenticate: IAuthenticateGeneric = {
    type: "generic",
    properties: {
      headers: {
        "X-API-Key": "={{$credentials.apiKey}}",
      },
    },
  };

  test: ICredentialTestRequest = {
    request: {
      baseURL: "https://api.linkupapi.com",
      url: "/v1/data/search/profiles",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": "={{$credentials.apiKey}}",
      },
      body: "{}",
    },
  };
}
