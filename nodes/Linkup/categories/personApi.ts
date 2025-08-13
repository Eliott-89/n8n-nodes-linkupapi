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

        if (searchProfilesParams.keyword)
          body.keyword = searchProfilesParams.keyword;
        if (searchProfilesParams.job_title)
          body.job_title = searchProfilesParams.job_title;
        if (searchProfilesParams.industry)
          body.industry = searchProfilesParams.industry;
        if (searchProfilesParams.school)
          body.school = searchProfilesParams.school;
        if (searchProfilesParams.location)
          body.location = searchProfilesParams.location;
        if (searchProfilesParams.current_company)
          body.current_company = searchProfilesParams.current_company;
        if (searchProfilesParams.total_results)
          body.total_results = searchProfilesParams.total_results;
        break;

      case "extractProfileInfo":
        const extractProfileInfoParams = context.getNodeParameter(
          "extractProfileInfoParams",
          itemIndex,
          {}
        ) as any;

        // Required parameters validation
        if (!extractProfileInfoParams.profileUrl) {
          throw new Error("Profile URL is required for this operation");
        }

        if (extractProfileInfoParams.profileUrl)
          body.profile_url = extractProfileInfoParams.profileUrl;
        break;

      case "getProfileInfo":
        const getProfileInfoParams = context.getNodeParameter(
          "getProfileInfoParams",
          itemIndex,
          {}
        ) as any;

        // Required parameters validation
        if (!getProfileInfoParams.linkedin_url) {
          throw new Error("LinkedIn URL is required for this operation");
        }

        if (getProfileInfoParams.linkedin_url)
          body.linkedin_url = getProfileInfoParams.linkedin_url;
        if (getProfileInfoParams.country)
          body.country = getProfileInfoParams.country;
        break;

      case "profileEnrichment":
        const profileEnrichmentParams = context.getNodeParameter(
          "profileEnrichmentParams",
          itemIndex,
          {}
        ) as any;

        // Required parameters validation
        if (!profileEnrichmentParams.first_name) {
          throw new Error("First name is required for this operation");
        }
        if (!profileEnrichmentParams.last_name) {
          throw new Error("Last name is required for this operation");
        }
        if (!profileEnrichmentParams.company_name) {
          throw new Error("Company name is required for this operation");
        }

        if (profileEnrichmentParams.first_name)
          body.first_name = profileEnrichmentParams.first_name;
        if (profileEnrichmentParams.last_name)
          body.last_name = profileEnrichmentParams.last_name;
        if (profileEnrichmentParams.company_name)
          body.company_name = profileEnrichmentParams.company_name;
        break;

      case "extractCompanyEmployees":
        const extractCompanyEmployeesParams = context.getNodeParameter(
          "extractCompanyEmployeesParams",
          itemIndex,
          {}
        ) as any;

        // Required parameters validation
        if (!extractCompanyEmployeesParams.company_name) {
          throw new Error("Company name is required for this operation");
        }

        if (extractCompanyEmployeesParams.company_name)
          body.company_name = extractCompanyEmployeesParams.company_name;
        if (extractCompanyEmployeesParams.total_results)
          body.total_results = extractCompanyEmployeesParams.total_results;
        if (extractCompanyEmployeesParams.decision_makers_only !== undefined)
          body.decision_makers_only =
            extractCompanyEmployeesParams.decision_makers_only;
        break;
    }

    return body;
  }
}
