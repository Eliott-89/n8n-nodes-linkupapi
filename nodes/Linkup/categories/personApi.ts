import { IExecuteFunctions } from "n8n-workflow";
import { RequestBody } from "../types";

export class PersonApiOperations {
  static async buildRequestBody(
    context: IExecuteFunctions,
    itemIndex: number,
    operation: string
  ): Promise<RequestBody> {
    const body: RequestBody = {};

    switch (operation) {
      case "searchProfiles":
        const searchProfilesParams = context.getNodeParameter(
          "searchProfilesParams",
          itemIndex,
          {}
        ) as any;
        
        // Validation des paramètres requis
        if (!searchProfilesParams.personKeyword) {
          throw new Error("Le mot-clé de recherche de profil est requis pour cette opération");
        }
        
        if (searchProfilesParams.personKeyword) body.keyword = searchProfilesParams.personKeyword;
        if (searchProfilesParams.job_title) body.job_title = searchProfilesParams.job_title;
        if (searchProfilesParams.industry) body.industry = searchProfilesParams.industry;
        if (searchProfilesParams.school) body.school = searchProfilesParams.school;
        if (searchProfilesParams.location) body.location = searchProfilesParams.location;
        if (searchProfilesParams.current_company) body.current_company = searchProfilesParams.current_company;
        if (searchProfilesParams.total_results) body.total_results = searchProfilesParams.total_results;
        break;

      case "extractProfileInfo":
        const extractProfileInfoParams = context.getNodeParameter(
          "extractProfileInfoParams",
          itemIndex,
          {}
        ) as any;
        
        // Validation des paramètres requis
        if (!extractProfileInfoParams.profileUrl) {
          throw new Error("L'URL du profil est requise pour cette opération");
        }
        
        if (extractProfileInfoParams.profileUrl) body.profile_url = extractProfileInfoParams.profileUrl;
        break;

      case "profileEnrichment":
        const profileEnrichmentParams = context.getNodeParameter(
          "profileEnrichmentParams",
          itemIndex,
          {}
        ) as any;
        
        // Validation des paramètres requis
        if (!profileEnrichmentParams.profileUrl) {
          throw new Error("L'URL du profil est requise pour cette opération");
        }
        
        if (profileEnrichmentParams.profileUrl) body.profile_url = profileEnrichmentParams.profileUrl;
        if (profileEnrichmentParams.enrichmentType) body.enrichment_type = profileEnrichmentParams.enrichmentType;
        break;
    }

    return body;
  }
}