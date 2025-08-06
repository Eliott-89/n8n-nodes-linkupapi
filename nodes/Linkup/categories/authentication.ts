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
          const verificationCode = context.getNodeParameter(
            "verificationCode",
            itemIndex,
            ""
          ) as string;
          const authCountry = context.getNodeParameter(
            "country",
            itemIndex,
            "FR"
          ) as string;
          if (verificationCode) body.code = verificationCode;
          if (authCountry) body.country = authCountry;
        }
        break;
    }

    return body;
  }
} 