import { IExecuteFunctions } from "n8n-workflow";
import { RequestBody } from "../types";

export class MessageOperations {
  static async buildRequestBody(
    context: IExecuteFunctions,
    itemIndex: number,
    operation: string
  ): Promise<RequestBody> {
    const body: RequestBody = {};

    switch (operation) {
      case "sendMessage":
        const sendMessageParams = context.getNodeParameter(
          "sendMessageParams",
          itemIndex,
          {}
        ) as any;
        
        // Validation des paramètres requis
        if (!sendMessageParams.messageRecipientUrl) {
          throw new Error("L'URL du destinataire du message est requise pour cette opération");
        }
        if (!sendMessageParams.messageText) {
          throw new Error("Le texte du message est requis pour cette opération");
        }
        
        if (sendMessageParams.messageRecipientUrl) body.linkedin_url = sendMessageParams.messageRecipientUrl;
        if (sendMessageParams.messageText) body.message_text = sendMessageParams.messageText;
        if (sendMessageParams.country) body.country = sendMessageParams.country;
        break;

      case "getConversationMessages":
        const conversationMessagesParams = context.getNodeParameter(
          "conversationMessagesParams",
          itemIndex,
          {}
        ) as any;
        if (conversationMessagesParams.linkedinUrl)
          body.linkedin_url = conversationMessagesParams.linkedinUrl;
        if (conversationMessagesParams.conversationId)
          body.conversation_id = conversationMessagesParams.conversationId;
        if (conversationMessagesParams.total_results)
          body.total_results = conversationMessagesParams.total_results;
        if (conversationMessagesParams.start_page)
          body.start_page = conversationMessagesParams.start_page;
        if (conversationMessagesParams.end_page)
          body.end_page = conversationMessagesParams.end_page;
        if (conversationMessagesParams.country)
          body.country = conversationMessagesParams.country;
        break;

      case "getMessageInbox":
        const getMessageInboxParams = context.getNodeParameter(
          "getMessageInboxParams",
          itemIndex,
          {}
        ) as any;
        if (getMessageInboxParams.country)
          body.country = getMessageInboxParams.country;
        if (getMessageInboxParams.total_results)
          body.total_results = getMessageInboxParams.total_results;
        if (getMessageInboxParams.category)
          body.category = getMessageInboxParams.category;
        if (getMessageInboxParams.next_cursor)
          body.next_cursor = getMessageInboxParams.next_cursor;
        break;
    }

    return body;
  }
} 