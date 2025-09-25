import { IExecuteFunctions } from "n8n-workflow";
import { RequestBody } from "../types";

export class NetworkOperations {
  static async buildRequestBody(
    context: IExecuteFunctions,
    itemIndex: number,
    operation: string
  ): Promise<RequestBody> {
    const body: RequestBody = {};

    switch (operation) {
      case "send connection request":
        const sendConnectionParams = context.getNodeParameter(
          "sendConnectionParams",
          itemIndex,
          {}
        ) as any;

        // Required parameter validation
        if (!sendConnectionParams.profileUrl) {
          throw new Error(
            "LinkedIn profile URL is required for this operation"
          );
        }

        if (sendConnectionParams.profileUrl)
          body.linkedin_url = sendConnectionParams.profileUrl;
        if (sendConnectionParams.connectionMessage)
          body.message = sendConnectionParams.connectionMessage;
        // country from node params removed; credentials will inject it
        break;

      case "accept connection invitation":
        const acceptInvitationParams = context.getNodeParameter(
          "acceptInvitationParams",
          itemIndex,
          {}
        ) as any;

        // Required parameter validation
        if (!acceptInvitationParams.shared_secret) {
          throw new Error("Shared secret is required for this operation");
        }
        if (!acceptInvitationParams.entity_urn) {
          throw new Error("Entity URN is required for this operation");
        }

        if (acceptInvitationParams.shared_secret)
          body.shared_secret = acceptInvitationParams.shared_secret;
        if (acceptInvitationParams.entity_urn)
          body.entity_urn = acceptInvitationParams.entity_urn;
        // country from node params removed; credentials will inject it
        break;

      case "withdraw invitation":
        const withdrawInvitationParams = context.getNodeParameter(
          "withdrawInvitationParams",
          itemIndex,
          {}
        ) as any;

        // Required parameter validation
        if (!withdrawInvitationParams.invitationId) {
          throw new Error("Invitation ID is required for this operation");
        }

        if (withdrawInvitationParams.invitationId)
          body.invitation_id = withdrawInvitationParams.invitationId;
        // country from node params removed; credentials will inject it
        break;

      case "get invitation status":
        const getInvitationStatusParams = context.getNodeParameter(
          "getInvitationStatusParams",
          itemIndex,
          {}
        ) as any;

        // Required parameter validation
        if (!getInvitationStatusParams.profileUrl) {
          throw new Error(
            "LinkedIn profile URL is required for this operation"
          );
        }

        if (getInvitationStatusParams.profileUrl)
          body.linkedin_url = getInvitationStatusParams.profileUrl;
        // country from node params removed; credentials will inject it
        break;

      case "get connections":
        const getConnectionsParams = context.getNodeParameter(
          "getConnectionsParams",
          itemIndex,
          {}
        ) as any;
        // country from node params removed; credentials will inject it
        if (getConnectionsParams.total_results)
          body.total_results = getConnectionsParams.total_results;
        if (getConnectionsParams.start_page)
          body.start_page = getConnectionsParams.start_page;
        if (getConnectionsParams.end_page)
          body.end_page = getConnectionsParams.end_page;
        break;

      case "get received invitations":
        const getReceivedInvitationsParams = context.getNodeParameter(
          "getReceivedInvitationsParams",
          itemIndex,
          {}
        ) as any;
        // country from node params removed; credentials will inject it
        if (getReceivedInvitationsParams.start_page)
          body.start_page = getReceivedInvitationsParams.start_page;
        if (getReceivedInvitationsParams.end_page)
          body.end_page = getReceivedInvitationsParams.end_page;
        if (getReceivedInvitationsParams.total_results)
          body.total_results = getReceivedInvitationsParams.total_results;
        if (getReceivedInvitationsParams.invitation_type)
          body.invitation_type = getReceivedInvitationsParams.invitation_type;
        break;

      case "get sent invitations":
        const getSentInvitationsParams = context.getNodeParameter(
          "getSentInvitationsParams",
          itemIndex,
          {}
        ) as any;
        if (getSentInvitationsParams.invitation_type)
          body.invitation_type = getSentInvitationsParams.invitation_type;
        if (getSentInvitationsParams.total_results)
          body.total_results = getSentInvitationsParams.total_results;
        if (getSentInvitationsParams.start_page)
          body.start_page = getSentInvitationsParams.start_page;
        if (getSentInvitationsParams.end_page)
          body.end_page = getSentInvitationsParams.end_page;
        // country from node params removed; credentials will inject it
        break;

      case "get network recommendations":
        const getNetworkRecommendationsParams = context.getNodeParameter(
          "getNetworkRecommendationsParams",
          itemIndex,
          {}
        ) as any;
        // country from node params removed; credentials will inject it
        if (getNetworkRecommendationsParams.total_results)
          body.total_results = getNetworkRecommendationsParams.total_results;
        if (getNetworkRecommendationsParams.start_page)
          body.start_page = getNetworkRecommendationsParams.start_page;
        if (getNetworkRecommendationsParams.end_page)
          body.end_page = getNetworkRecommendationsParams.end_page;
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
