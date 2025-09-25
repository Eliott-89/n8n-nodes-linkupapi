import { INodeProperties } from "n8n-workflow";

export const authenticationProperties: INodeProperties[] = [
  // AUTH - Linkup Parameters
  {
    displayName: "Verify Code Parameters",
    name: "verifyCodeParams",
    type: "collection",
    placeholder: "Add verification parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["authentication"],
        operation: ["verify code"],
      },
    },
    options: [
      {
        displayName: "Verification Code *",
        name: "verificationCode",
        type: "string",
        default: "",
        placeholder: "123456",
        description: "Verification code received via email/SMS",
      },
    ],
  },
];
