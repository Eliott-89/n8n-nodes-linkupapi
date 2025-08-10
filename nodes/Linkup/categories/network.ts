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
      case "sendConnectionRequest":
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
        if (sendConnectionParams.country)
          body.country = sendConnectionParams.country;
        break;

      case "acceptConnectionInvitation":
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
        if (acceptInvitationParams.country)
          body.country = acceptInvitationParams.country;
        break;

      case "withdrawInvitation":
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
        if (withdrawInvitationParams.country)
          body.country = withdrawInvitationParams.country;
        break;

      case "getInvitationStatus":
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
        if (getInvitationStatusParams.country)
          body.country = getInvitationStatusParams.country;
        break;

      case "getConnections":
        const getConnectionsParams = context.getNodeParameter(
          "getConnectionsParams",
          itemIndex,
          {}
        ) as any;
        if (getConnectionsParams.country)
          body.country = getConnectionsParams.country;
        if (getConnectionsParams.total_results)
          body.total_results = getConnectionsParams.total_results;
        if (getConnectionsParams.start_page)
          body.start_page = getConnectionsParams.start_page;
        if (getConnectionsParams.end_page)
          body.end_page = getConnectionsParams.end_page;
        break;

      case "getReceivedInvitations":
        const getReceivedInvitationsParams = context.getNodeParameter(
          "getReceivedInvitationsParams",
          itemIndex,
          {}
        ) as any;
        if (getReceivedInvitationsParams.country)
          body.country = getReceivedInvitationsParams.country;
        if (getReceivedInvitationsParams.start_page)
          body.start_page = getReceivedInvitationsParams.start_page;
        if (getReceivedInvitationsParams.end_page)
          body.end_page = getReceivedInvitationsParams.end_page;
        if (getReceivedInvitationsParams.total_results)
          body.total_results = getReceivedInvitationsParams.total_results;
        if (getReceivedInvitationsParams.invitation_type)
          body.invitation_type = getReceivedInvitationsParams.invitation_type;
        break;

      case "getSentInvitations":
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
        if (getSentInvitationsParams.country)
          body.country = getSentInvitationsParams.country;
        break;

      case "getNetworkRecommendations":
        const getNetworkRecommendationsParams = context.getNodeParameter(
          "getNetworkRecommendationsParams",
          itemIndex,
          {}
        ) as any;
        if (getNetworkRecommendationsParams.country)
          body.country = getNetworkRecommendationsParams.country;
        if (getNetworkRecommendationsParams.total_results)
          body.total_results = getNetworkRecommendationsParams.total_results;
        if (getNetworkRecommendationsParams.start_page)
          body.start_page = getNetworkRecommendationsParams.start_page;
        if (getNetworkRecommendationsParams.end_page)
          body.end_page = getNetworkRecommendationsParams.end_page;
        break;
    }

    return body;
  }
}
