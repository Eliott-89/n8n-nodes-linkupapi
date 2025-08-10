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

        // Required parameter validation
        if (!sendMessageParams.linkedin_url) {
          throw new Error("LinkedIn URL is required for this operation");
        }
        if (!sendMessageParams.message_text) {
          throw new Error(
            "Message text is required for this operation"
          );
        }

        if (sendMessageParams.linkedin_url)
          body.linkedin_url = sendMessageParams.linkedin_url;
        if (sendMessageParams.message_text)
          body.message_text = sendMessageParams.message_text;
        if (sendMessageParams.country) body.country = sendMessageParams.country;
        if (sendMessageParams.media_link) {
          // Media URL validation
          try {
            const mediaUrl = new URL(sendMessageParams.media_link);

            // Vérifier le protocole
            if (mediaUrl.protocol === "file:") {
                          throw new Error(
              "Local URLs (file://) are not supported. The file must be hosted on a publicly accessible web server."
            );
            }

            if (!mediaUrl.protocol.startsWith("http")) {
                          throw new Error(
              "Media URL must use HTTP or HTTPS protocol"
            );
            }

            // Check that it's not a local URL
            if (
              mediaUrl.hostname === "localhost" ||
              mediaUrl.hostname === "127.0.0.1" ||
              mediaUrl.hostname.startsWith("192.168.") ||
              mediaUrl.hostname.startsWith("10.")
            ) {
                          throw new Error(
              "Local URLs are not supported. The file must be hosted on a publicly accessible web server."
            );
            }

            body.media_link = sendMessageParams.media_link;
          } catch (error) {
            const errorMessage =
              error instanceof Error ? error.message : String(error);
            if (
              errorMessage.includes("file:") ||
              errorMessage.includes("localhost") ||
              errorMessage.includes("127.0.0.1")
            ) {
              throw error; // Keep the specific error message
            }
            throw new Error(
              "Media URL is not valid. Please ensure it's a complete URL (e.g., https://example.com/image.jpg)"
            );
          }
        }
        // The login_token is automatically added from credentials
        break;

      case "getConversationMessages":
        const conversationMessagesParams = context.getNodeParameter(
          "conversationMessagesParams",
          itemIndex,
          {}
        ) as any;

        // Required parameter validation
        if (
          !conversationMessagesParams.linkedinUrl &&
          !conversationMessagesParams.conversationId
        ) {
          throw new Error(
            "Either LinkedIn URL or conversation ID is required for this operation"
          );
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
        // The login_token is automatically added from credentials
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
