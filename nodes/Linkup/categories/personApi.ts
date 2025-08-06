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
      case "searchProfilesApi":
        const searchProfilesApiKeyword = context.getNodeParameter(
          "personKeyword",
          itemIndex,
          ""
        ) as string;
        const personApiSearchParams = context.getNodeParameter(
          "personApiSearchParams",
          itemIndex,
          {}
        ) as any;
        if (searchProfilesApiKeyword) body.keyword = searchProfilesApiKeyword;
        if (personApiSearchParams.job_title)
          body.job_title = personApiSearchParams.job_title;
        if (personApiSearchParams.industry)
          body.industry = personApiSearchParams.industry;
        if (personApiSearchParams.school)
          body.school = personApiSearchParams.school;
        if (personApiSearchParams.location)
          body.location = personApiSearchParams.location;
        if (personApiSearchParams.current_company)
          body.current_company = personApiSearchParams.current_company;
        if (personApiSearchParams.total_results)
          body.total_results = personApiSearchParams.total_results;
        break;

      case "extractProfileInfoApi":
        const extractProfileInfoApiUrl = context.getNodeParameter(
          "profileUrl",
          itemIndex,
          ""
        ) as string;
        const personApiExtractInfoParams = context.getNodeParameter(
          "personApiExtractInfoParams",
          itemIndex,
          {}
        ) as any;
        if (extractProfileInfoApiUrl) body.linkedin_url = extractProfileInfoApiUrl;
        if (personApiExtractInfoParams.country)
          body.country = personApiExtractInfoParams.country;
        break;

      case "profileEnrichment":
        const profileEnrichmentFirstName = context.getNodeParameter(
          "first_name",
          itemIndex,
          ""
        ) as string;
        const profileEnrichmentLastName = context.getNodeParameter(
          "last_name",
          itemIndex,
          ""
        ) as string;
        const profileEnrichmentCompanyName = context.getNodeParameter(
          "company_name",
          itemIndex,
          ""
        ) as string;
        const personApiProfileEnrichmentParams = context.getNodeParameter(
          "personApiProfileEnrichmentParams",
          itemIndex,
          {}
        ) as any;
        if (profileEnrichmentFirstName) body.first_name = profileEnrichmentFirstName;
        if (profileEnrichmentLastName) body.last_name = profileEnrichmentLastName;
        if (profileEnrichmentCompanyName) body.company_name = profileEnrichmentCompanyName;
        if (personApiProfileEnrichmentParams.country)
          body.country = personApiProfileEnrichmentParams.country;
        break;
    }

    return body;
  }
} 