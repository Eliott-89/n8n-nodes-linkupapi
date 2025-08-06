import { INodeProperties } from "n8n-workflow";

export const authenticationProperties: INodeProperties[] = [
  // Authentication operations
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
        description:
          "Authenticate your LinkedIn account via Linkup - [Get API key at LinkupAPI.com](https://linkupapi.com)",
      },
      {
        name: "Verify Code",
        value: "verifyCode",
        description: "Validate the security code received by email",
      },
    ],
    default: "login",
  },

  // AUTH - Paramètres Linkup
  {
    displayName: "Verify Code Parameters",
    name: "verifyCodeParams",
    type: "collection",
    placeholder: "Add verification parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["authentication"],
        operation: ["verifyCode"],
      },
    },
    options: [
      {
        displayName: "Verification Code *",
        name: "verificationCode",
        type: "string",
        default: "",
        required: true,
        placeholder: "123456",
        description: "Verification code received via email/SMS",
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
]; 