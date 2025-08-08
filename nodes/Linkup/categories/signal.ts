import { IExecuteFunctions } from "n8n-workflow";
import { RequestBody } from "../types";

export class SignalOperations {
  static async buildRequestBody(
    context: IExecuteFunctions,
    itemIndex: number,
    operation: string
  ): Promise<RequestBody> {
    const body: RequestBody = {};

    switch (operation) {
      case "extractPostReactions":
      case "extractPostComments":
        const postUrlParams = context.getNodeParameter(
          "postUrlParams",
          itemIndex,
          {}
        ) as any;
        const commonSignalParams = context.getNodeParameter(
          "commonSignalParams",
          itemIndex,
          {}
        ) as any;
        
        // Validation des paramètres requis
        if (!postUrlParams.post_url) {
          throw new Error("L'URL du post est requise pour cette opération");
        }
        
        if (postUrlParams.post_url) body.post_url = postUrlParams.post_url;
        if (commonSignalParams.country) body.country = commonSignalParams.country;
        if (commonSignalParams.total_results) body.total_results = commonSignalParams.total_results;
        if (commonSignalParams.start_page) body.start_page = commonSignalParams.start_page;
        if (commonSignalParams.end_page) body.end_page = commonSignalParams.end_page;
        break;

      case "extractProfileReactions":
      case "extractProfileComments":
      case "extractProfilePosts":
        const profileUrlParams = context.getNodeParameter(
          "profileUrlParams",
          itemIndex,
          {}
        ) as any;
        const commonSignalParamsProfile = context.getNodeParameter(
          "commonSignalParams",
          itemIndex,
          {}
        ) as any;
        
        // Validation des paramètres requis
        if (!profileUrlParams.profile_url) {
          throw new Error("L'URL du profil est requise pour cette opération");
        }
        
        if (profileUrlParams.profile_url) body.profile_url = profileUrlParams.profile_url;
        if (commonSignalParamsProfile.country) body.country = commonSignalParamsProfile.country;
        if (commonSignalParamsProfile.total_results) body.total_results = commonSignalParamsProfile.total_results;
        if (commonSignalParamsProfile.start_page) body.start_page = commonSignalParamsProfile.start_page;
        if (commonSignalParamsProfile.end_page) body.end_page = commonSignalParamsProfile.end_page;
        break;

      case "extractCompanyPosts":
        const companyUrlParams = context.getNodeParameter(
          "companyUrlParams",
          itemIndex,
          {}
        ) as any;
        const commonSignalParamsCompany = context.getNodeParameter(
          "commonSignalParams",
          itemIndex,
          {}
        ) as any;
        
        // Validation des paramètres requis
        if (!companyUrlParams.company_url) {
          throw new Error("L'URL de l'entreprise est requise pour cette opération");
        }
        
        if (companyUrlParams.company_url) body.company_url = companyUrlParams.company_url;
        if (commonSignalParamsCompany.country) body.country = commonSignalParamsCompany.country;
        if (commonSignalParamsCompany.total_results) body.total_results = commonSignalParamsCompany.total_results;
        if (commonSignalParamsCompany.start_page) body.start_page = commonSignalParamsCompany.start_page;
        if (commonSignalParamsCompany.end_page) body.end_page = commonSignalParamsCompany.end_page;
        break;
    }

    return body;
  }
}