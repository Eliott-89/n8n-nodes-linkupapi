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
        const messagesParams = context.getNodeParameter(
          "messagesParams",
          itemIndex,
          {}
        ) as any;
        if (messagesParams.messageRecipientUrl) body.linkedin_url = messagesParams.messageRecipientUrl;
        if (messagesParams.messageText) body.message_text = messagesParams.messageText;
        if (messagesParams.mediaLink) body.media_link = messagesParams.mediaLink;
        if (messagesParams.country) body.country = messagesParams.country;
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