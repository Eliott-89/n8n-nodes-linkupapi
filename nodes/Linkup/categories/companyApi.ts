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
        
        // Validation des paramètres requis
        if (!searchCompaniesParams.companyKeyword) {
          throw new Error("Le mot-clé de l'entreprise est requis pour cette opération");
        }
        
        if (searchCompaniesParams.companyKeyword) body.keyword = searchCompaniesParams.companyKeyword;
        if (searchCompaniesParams.industry) body.industry = searchCompaniesParams.industry;
        if (searchCompaniesParams.location) body.location = searchCompaniesParams.location;
        if (searchCompaniesParams.employee_range) body.employee_range = searchCompaniesParams.employee_range;
        if (searchCompaniesParams.founding_company !== undefined) body.founding_company = searchCompaniesParams.founding_company;
        if (searchCompaniesParams.total_results) body.total_results = searchCompaniesParams.total_results;
        break;

      case "getCompanyInfo":
        const getCompanyInfoParams = context.getNodeParameter(
          "getCompanyInfoParams",
          itemIndex,
          {}
        ) as any;
        
        // Validation des paramètres requis
        if (!getCompanyInfoParams.companyUrl) {
          throw new Error("L'URL de l'entreprise est requise pour cette opération");
        }
        
        if (getCompanyInfoParams.companyUrl) body.company_url = getCompanyInfoParams.companyUrl;
        break;

      case "getCompanyInfoByDomain":
        const getCompanyInfoByDomainParams = context.getNodeParameter(
          "getCompanyInfoByDomainParams",
          itemIndex,
          {}
        ) as any;
        
        // Validation des paramètres requis
        if (!getCompanyInfoByDomainParams.domain) {
          throw new Error("Le domaine de l'entreprise est requis pour cette opération");
        }
        
        if (getCompanyInfoByDomainParams.domain) body.domain = getCompanyInfoByDomainParams.domain;
        break;
    }

    return body;
  }
}