import { IExecuteFunctions } from "n8n-workflow";
import { RequestBody } from "../types";

export class AuthenticationOperations {
  static async buildRequestBody(
    context: IExecuteFunctions,
    itemIndex: number,
    operation: string
  ): Promise<RequestBody> {
    const body: RequestBody = {};

    switch (operation) {
      case "login":
        const creds = await context.getCredentials("linkupApi");
        if (creds) {
          body.email = creds.linkedinEmail;
          body.password = creds.linkedinPassword;
          body.country = creds.country || "FR";
        }
        break;

      case "verifyCode":
        const credsVerify = await context.getCredentials("linkupApi");
        if (credsVerify) {
          body.email = credsVerify.linkedinEmail;
          const verifyCodeParams = context.getNodeParameter(
            "verifyCodeParams",
            itemIndex,
            {}
          ) as any;
          
          // Required parameters validation
          if (!verifyCodeParams.verificationCode) {
            throw new Error("Verification code is required for this operation");
          }
          
          if (verifyCodeParams.verificationCode) body.code = verifyCodeParams.verificationCode;
          if (verifyCodeParams.country) body.country = verifyCodeParams.country;
        }
        break;
    }

    return body;
  }
} 