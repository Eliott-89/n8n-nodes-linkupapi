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
        
        // Validation des paramètres requis
        if (!sendConnectionParams.profileUrl) {
          throw new Error("L'URL du profil LinkedIn est requise pour cette opération");
        }
        
        if (sendConnectionParams.profileUrl)
          body.linkedin_url = sendConnectionParams.profileUrl;
        if (sendConnectionParams.connectionMessage)
          body.message = sendConnectionParams.connectionMessage;
        if (sendConnectionParams.country) body.country = sendConnectionParams.country;
        break;

      case "acceptConnectionInvitation":
        const acceptInvitationParams = context.getNodeParameter(
          "acceptInvitationParams",
          itemIndex,
          {}
        ) as any;
        
        // Validation des paramètres requis
        if (!acceptInvitationParams.invitationId) {
          throw new Error("L'ID d'invitation est requis pour cette opération");
        }
        
        if (acceptInvitationParams.invitationId)
          body.invitation_id = acceptInvitationParams.invitationId;
        if (acceptInvitationParams.country)
          body.country = acceptInvitationParams.country;
        break;

      case "withdrawInvitation":
        const withdrawInvitationParams = context.getNodeParameter(
          "withdrawInvitationParams",
          itemIndex,
          {}
        ) as any;
        
        // Validation des paramètres requis
        if (!withdrawInvitationParams.invitationId) {
          throw new Error("L'ID d'invitation est requis pour cette opération");
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
        
        // Validation des paramètres requis
        if (!getInvitationStatusParams.profileUrl) {
          throw new Error("L'URL du profil LinkedIn est requise pour cette opération");
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