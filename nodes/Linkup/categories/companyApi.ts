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
      case "searchCompanies":
        const searchCompaniesParams = context.getNodeParameter(
          "searchCompaniesParams",
          itemIndex,
          {}
        ) as any;

        // Required parameter validation
        if (!searchCompaniesParams.companyKeyword) {
          throw new Error("Company keyword is required for this operation");
        }

        if (searchCompaniesParams.companyKeyword)
          body.keyword = searchCompaniesParams.companyKeyword;
        if (searchCompaniesParams.industry)
          body.industry = searchCompaniesParams.industry;
        if (searchCompaniesParams.location)
          body.location = searchCompaniesParams.location;
        if (searchCompaniesParams.employee_range)
          body.employee_range = searchCompaniesParams.employee_range;
        if (searchCompaniesParams.founding_company !== undefined)
          body.founding_company = searchCompaniesParams.founding_company;
        if (searchCompaniesParams.total_results)
          body.total_results = searchCompaniesParams.total_results;
        break;

      case "getCompanyInfo":
        const getCompanyInfoParams = context.getNodeParameter(
          "getCompanyInfoParams",
          itemIndex,
          {}
        ) as any;

        // Required parameter validation
        if (!getCompanyInfoParams.companyUrl) {
          throw new Error("Company URL is required for this operation");
        }

        if (getCompanyInfoParams.companyUrl)
          body.company_url = getCompanyInfoParams.companyUrl;
        break;

      case "getCompanyInfoByDomain":
        const getCompanyInfoByDomainParams = context.getNodeParameter(
          "getCompanyInfoByDomainParams",
          itemIndex,
          {}
        ) as any;

        // Required parameter validation
        if (!getCompanyInfoByDomainParams.domain) {
          throw new Error("Company domain is required for this operation");
        }

        if (getCompanyInfoByDomainParams.domain)
          body.domain = getCompanyInfoByDomainParams.domain;
        break;
    }

    return body;
  }
}
