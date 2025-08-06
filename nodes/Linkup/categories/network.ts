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
        const networkParams = context.getNodeParameter(
          "networkParams",
          itemIndex,
          {}
        ) as any;
        if (networkParams.profileUrl)
          body.linkedin_url = networkParams.profileUrl;
        if (networkParams.connectionMessage)
          body.message = networkParams.connectionMessage;
        if (networkParams.country) body.country = networkParams.country;
        break;

      case "acceptConnectionInvitation":
        const acceptConnectionParams = context.getNodeParameter(
          "acceptConnectionParams",
          itemIndex,
          {}
        ) as any;
        if (acceptConnectionParams.entityUrn)
          body.entity_urn = acceptConnectionParams.entityUrn;
        if (acceptConnectionParams.sharedSecret)
          body.shared_secret = acceptConnectionParams.sharedSecret;
        if (acceptConnectionParams.country)
          body.country = acceptConnectionParams.country;
        break;

      case "withdrawInvitation":
        const withdrawInvitationParams = context.getNodeParameter(
          "withdrawInvitationParams",
          itemIndex,
          {}
        ) as any;
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
      case "getSentInvitations":
        const getInvitationsParams = context.getNodeParameter(
          "getInvitationsParams",
          itemIndex,
          {}
        ) as any;
        if (getInvitationsParams.country)
          body.country = getInvitationsParams.country;
        if (getInvitationsParams.invitation_type)
          body.invitation_type = getInvitationsParams.invitation_type;
        if (getInvitationsParams.total_results)
          body.total_results = getInvitationsParams.total_results;
        if (getInvitationsParams.start_page)
          body.start_page = getInvitationsParams.start_page;
        if (getInvitationsParams.end_page)
          body.end_page = getInvitationsParams.end_page;
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