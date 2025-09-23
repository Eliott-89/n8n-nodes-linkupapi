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
          // Required parameter validation for login
          if (!creds.linkedinEmail) {
            throw new Error(
              "❌ LinkedIn email required. Please configure your email in the credentials."
            );
          }
          if (!creds.linkedinPassword) {
            throw new Error(
              "❌ LinkedIn password required. Please configure your password in the credentials."
            );
          }

          // Format exact attendu par l'API LINKUP (selon votre exemple)
          // Ensure values are not empty
          const email = String(creds.linkedinEmail || "");
          const password = String(creds.linkedinPassword || "");

          if (!email || email.trim() === "") {
            throw new Error("❌ LinkedIn email is empty or invalid.");
          }
          if (!password || password.trim() === "") {
            throw new Error("❌ LinkedIn password is empty or invalid.");
          }

          // Exact format according to the provided curl
          body.email = email.trim();
          body.password = password.trim();
          body.country = creds.country || "FR";

          // Debug pour voir ce qui est construit
        } else {
          throw new Error(
            "❌ LINKUP credentials not found. Please configure your credentials in the node parameters."
          );
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

          // Required parameter validation
          if (!verifyCodeParams.verificationCode) {
            throw new Error("Verification code is required for this operation");
          }

          if (verifyCodeParams.verificationCode)
            body.code = verifyCodeParams.verificationCode;
          // country from node params removed; credentials will inject it
        }
        break;
    }

    return body;
  }
}
