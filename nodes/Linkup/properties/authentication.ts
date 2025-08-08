import { INodeProperties } from "n8n-workflow";

export const authenticationProperties: INodeProperties[] = [
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
        required: true,
        default: "",
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