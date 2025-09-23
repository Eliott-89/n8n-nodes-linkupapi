import { IExecuteFunctions } from "n8n-workflow";
import { RequestBody } from "../types";

export class ProfileOperations {
  static async buildRequestBody(
    context: IExecuteFunctions,
    itemIndex: number,
    operation: string
  ): Promise<RequestBody> {
    const body: RequestBody = {};

    switch (operation) {
      case "getProfileInfo":
        const getProfileInfoParams = context.getNodeParameter(
          "getProfileInfoParams",
          itemIndex,
          {}
        ) as any;

        // Required parameter validation
        if (!getProfileInfoParams.linkedin_url) {
          throw new Error(
            "LinkedIn URL is required for this operation"
          );
        }

        if (getProfileInfoParams.linkedin_url)
          body.linkedin_url = getProfileInfoParams.linkedin_url;
        // country from node params removed; credentials will inject it
        break;

      case "searchProfile":
        const searchProfileParams = context.getNodeParameter(
          "searchProfileParams",
          itemIndex,
          {}
        ) as any;
        if (searchProfileParams.company_url)
          body.company_url = searchProfileParams.company_url;
        if (searchProfileParams.location)
          body.location = searchProfileParams.location;
        if (searchProfileParams.school_url)
          body.school_url = searchProfileParams.school_url;
        if (searchProfileParams.network)
          body.network = searchProfileParams.network;
        if (searchProfileParams.keyword)
          body.keyword = searchProfileParams.keyword;
        if (searchProfileParams.total_results)
          body.total_results = searchProfileParams.total_results;
        if (searchProfileParams.start_page)
          body.start_page = searchProfileParams.start_page;
        if (searchProfileParams.end_page)
          body.end_page = searchProfileParams.end_page;
        // country from node params removed; credentials will inject it
        if (searchProfileParams.first_name)
          body.first_name = searchProfileParams.first_name;
        if (searchProfileParams.last_name)
          body.last_name = searchProfileParams.last_name;
        if (searchProfileParams.title) body.title = searchProfileParams.title;
        if (searchProfileParams.fetch_invitation_state !== undefined)
          body.fetch_invitation_state =
            searchProfileParams.fetch_invitation_state;
        break;

      case "getMyProfile":
        // country from node params removed; credentials will inject it
        break;
    }

    // Inject country from credentials (overrides any param)
    const creds = await context.getCredentials("linkupApi");
    if (creds && (creds as any).country) {
      (body as any).country = (creds as any).country;
    }

    return body;
  }
}
