import { IExecuteFunctions } from "n8n-workflow";
import { RequestBody } from "../types";

export class MailApiOperations {
  static async buildRequestBody(
    context: IExecuteFunctions,
    itemIndex: number,
    operation: string
  ): Promise<RequestBody> {
    const body: RequestBody = {};

    switch (operation) {
      case "email finder":
        // Paramètres pour la recherche d'email
        const emailFinderParams = context.getNodeParameter(
          "emailFinderParams",
          itemIndex,
          {}
        ) as any;

        // Aucun paramètre obligatoire pour emailFinder
        if (emailFinderParams.linkedin_url)
          body.linkedin_url = emailFinderParams.linkedin_url;
        if (emailFinderParams.first_name)
          body.first_name = emailFinderParams.first_name;
        if (emailFinderParams.last_name)
          body.last_name = emailFinderParams.last_name;
        if (emailFinderParams.company_domain)
          body.company_domain = emailFinderParams.company_domain;
        if (emailFinderParams.company_name)
          body.company_name = emailFinderParams.company_name;
        break;

      case "email reverse":
        // Paramètres pour la recherche inverse d'email
        const emailReverseParams = context.getNodeParameter(
          "emailReverseParams",
          itemIndex,
          {}
        ) as any;

        // Validation des paramètres requis
        if (!emailReverseParams.email) {
          throw new Error("Email address is required for this operation");
        }

        if (emailReverseParams.email) body.email = emailReverseParams.email;
        break;

      case "email validate":
        // Paramètres pour la validation d'email
        const emailValidateParams = context.getNodeParameter(
          "emailValidateParams",
          itemIndex,
          {}
        ) as any;

        // Validation des paramètres requis
        if (!emailValidateParams.email) {
          throw new Error("Email address is required for this operation");
        }

        if (emailValidateParams.email) body.email = emailValidateParams.email;
        break;

      default:
        break;
    }

    return body;
  }
}
