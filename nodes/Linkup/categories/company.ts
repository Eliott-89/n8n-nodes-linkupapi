import { IExecuteFunctions } from "n8n-workflow";
import { RequestBody } from "../types";

export class CompanyOperations {
  static async buildRequestBody(
    context: IExecuteFunctions,
    itemIndex: number,
    operation: string
  ): Promise<RequestBody> {
    const body: RequestBody = {};

    switch (operation) {
      case "getCompanyInfo":
        const getCompanyParams = context.getNodeParameter(
          "getCompanyParams",
          itemIndex,
          {}
        ) as any;
        
        // Required parameters validation
        if (!getCompanyParams.companyUrl) {
          throw new Error("Company URL is required for this operation");
        }
        
        if (getCompanyParams.companyUrl)
          body.company_url = getCompanyParams.companyUrl;
        break;

      case "searchCompanies":
        const searchCompaniesParams = context.getNodeParameter(
          "searchCompaniesParams",
          itemIndex,
          {}
        ) as any;
        if (searchCompaniesParams.keyword)
          body.keyword = searchCompaniesParams.keyword;
        if (searchCompaniesParams.location)
          body.location = searchCompaniesParams.location;
        if (searchCompaniesParams.sector)
          body.sector = searchCompaniesParams.sector;
        if (searchCompaniesParams.company_size)
          body.company_size = searchCompaniesParams.company_size;
        if (searchCompaniesParams.total_results)
          body.total_results = searchCompaniesParams.total_results;
        if (searchCompaniesParams.start_page)
          body.start_page = searchCompaniesParams.start_page;
        if (searchCompaniesParams.end_page)
          body.end_page = searchCompaniesParams.end_page;
        if (searchCompaniesParams.country)
          body.country = searchCompaniesParams.country;
        break;
    }

    return body;
  }
} 