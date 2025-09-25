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
      case "send message":
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
          throw new Error("Message text is required for this operation");
        }

        if (sendMessageParams.linkedin_url)
          body.linkedin_url = sendMessageParams.linkedin_url;
        if (sendMessageParams.message_text)
          body.message_text = sendMessageParams.message_text;
        // country from node params removed; credentials will inject it
        if (sendMessageParams.media_link) {
          // Media URL validation
          try {
            // Simple URL validation without using URL constructor
            const mediaLink = sendMessageParams.media_link;

            // Check if it's a file:// URL
            if (mediaLink.startsWith("file://")) {
              throw new Error(
                "Local URLs (file://) are not supported. The file must be hosted on a publicly accessible web server."
              );
            }

            // Check that it starts with http:// or https://
            if (
              !mediaLink.startsWith("http://") &&
              !mediaLink.startsWith("https://")
            ) {
              throw new Error("Media URL must use HTTP or HTTPS protocol");
            }

            // Simple check for local URLs (basic validation)
            if (
              mediaLink.includes("localhost") ||
              mediaLink.includes("127.0.0.1") ||
              mediaLink.includes("192.168.") ||
              mediaLink.includes("//10.") ||
              mediaLink.includes("//172.")
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

      case "get conversation messages":
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
        // country from node params removed; credentials will inject it
        break;

      case "get message inbox":
        const getMessageInboxParams = context.getNodeParameter(
          "getMessageInboxParams",
          itemIndex,
          {}
        ) as any;
        // The login_token is automatically added from credentials
        // country from node params removed; credentials will inject it
        if (getMessageInboxParams.total_results)
          body.total_results = getMessageInboxParams.total_results;
        if (getMessageInboxParams.category)
          body.category = getMessageInboxParams.category;
        if (getMessageInboxParams.next_cursor)
          body.next_cursor = getMessageInboxParams.next_cursor;
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
