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
        
        // Required parameters validation
        if (!sendMessageParams.linkedin_url) {
          throw new Error("LinkedIn URL is required for this operation");
        }
        if (!sendMessageParams.message_text) {
          throw new Error("Message text is required for this operation");
        }
        
        if (sendMessageParams.linkedin_url) body.linkedin_url = sendMessageParams.linkedin_url;
        if (sendMessageParams.message_text) body.message_text = sendMessageParams.message_text;
        if (sendMessageParams.country) body.country = sendMessageParams.country;
        if (sendMessageParams.media_link) body.media_link = sendMessageParams.media_link;
        if (sendMessageParams.login_token) body.login_token = sendMessageParams.login_token;
        break;

      case "getConversationMessages":
        const conversationMessagesParams = context.getNodeParameter(
          "conversationMessagesParams",
          itemIndex,
          {}
        ) as any;
        
        // Required parameters validation
        if (!conversationMessagesParams.linkedinUrl) {
          throw new Error("LinkedIn URL is required for this operation");
        }
        
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
        if (getMessageInboxParams.login_token)
          body.login_token = getMessageInboxParams.login_token;
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