import { IExecuteFunctions } from "n8n-workflow";
import { RequestBody } from "../types";

export class CompanyApiOperations {
  static async buildRequestBody(
    context: IExecuteFunctions,
    itemIndex: number,
    operation: string
  ): Promise<RequestBody> {
    const body: RequestBody = {};

    switch (operation) {
      case "searchCompaniesApi":
        const searchCompaniesApiKeyword = context.getNodeParameter(
          "companyKeyword",
          itemIndex,
          ""
        ) as string;
        const companyApiSearchParams = context.getNodeParameter(
          "companyApiSearchParams",
          itemIndex,
          {}
        ) as any;
        if (searchCompaniesApiKeyword) body.keyword = searchCompaniesApiKeyword;
        if (companyApiSearchParams.industry)
          body.industry = companyApiSearchParams.industry;
        if (companyApiSearchParams.location)
          body.location = companyApiSearchParams.location;
        if (companyApiSearchParams.employee_range)
          body.employee_range = companyApiSearchParams.employee_range;
        if (companyApiSearchParams.founding_company !== undefined)
          body.founding_company = companyApiSearchParams.founding_company;
        if (companyApiSearchParams.total_results)
          body.total_results = companyApiSearchParams.total_results;
        break;

      case "getCompanyInfoApi":
        const getCompanyInfoApiUrl = context.getNodeParameter(
          "company_url",
          itemIndex,
          ""
        ) as string;
        if (getCompanyInfoApiUrl) body.company_url = getCompanyInfoApiUrl;
        break;

      case "getCompanyInfoByDomain":
        const getCompanyInfoByDomainDomain = context.getNodeParameter(
          "domain",
          itemIndex,
          ""
        ) as string;
        if (getCompanyInfoByDomainDomain) body.domain = getCompanyInfoByDomainDomain;
        break;
    }

    return body;
  }
} 