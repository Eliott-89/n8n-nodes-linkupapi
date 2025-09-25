import { INodeProperties } from "n8n-workflow";

export const postProperties: INodeProperties[] = [
  // POST - Specific parameters for getPostReactions
  {
    displayName: "Get Post Reactions Parameters",
    name: "getPostReactionsParams",
    type: "collection",
    placeholder: "Add post parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["get post reactions"],
      },
    },
    options: [
      {
        displayName: "Post URL *",
        name: "post_url",
        type: "string",
        default: "",
        placeholder: "https://www.linkedin.com/posts/activity-123456789",
        description: "LinkedIn post URL",
      },
      {
        displayName: "Total Results",
        name: "total_results",
        type: "number",
        default: 10,
        description: "Number of results to return",
      },
      {
        displayName: "Start Page",
        name: "start_page",
        type: "number",
        default: 1,
        description: "Starting page number",
      },
      {
        displayName: "End Page",
        name: "end_page",
        type: "number",
        default: 1,
        description: "Ending page number",
      },
      
    ],
  },
  // POST - Specific parameters for reactToPost
  {
    displayName: "React To Post Parameters",
    name: "reactToPostParams",
    type: "collection",
    placeholder: "Add post parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["react to post"],
      },
    },
    options: [
      {
        displayName: "Post URL *",
        name: "post_url",
        type: "string",
        default: "",
        placeholder: "https://www.linkedin.com/posts/activity-123456789",
        description: "LinkedIn post URL",
      },
      {
        displayName: "Reaction Type",
        name: "reaction_type",
        type: "string",
        default: "like",
        placeholder:
          "like, celebrate, support, funny, love, insightful, curious",
        description: "Type of reaction to add",
      },
      
    ],
  },
  // POST - Specific parameters for repostContent
  {
    displayName: "Repost Content Parameters",
    name: "repostContentParams",
    type: "collection",
    placeholder: "Add post parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["repost content"],
      },
    },
    options: [
      {
        displayName: "Post URL *",
        name: "post_url",
        type: "string",
        default: "",
        placeholder: "https://www.linkedin.com/posts/activity-123456789",
        description: "LinkedIn post URL",
      },
    ],
  },
  // POST - Specific parameters for addCommentToPost
  {
    displayName: "Add Comment To Post Parameters",
    name: "addCommentToPostParams",
    type: "collection",
    placeholder: "Add post parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["add comment to post"],
      },
    },
    options: [
      {
        displayName: "Post URL *",
        name: "post_url",
        type: "string",
        default: "",
        placeholder: "https://www.linkedin.com/posts/activity-123456789",
        description: "LinkedIn post URL",
      },
      {
        displayName: "Message *",
        name: "message",
        type: "string",
        default: "",
        placeholder: "Great post! Thanks for sharing.",
        description: "Comment content to add",
      },
    ],
  },
  // POST - Specific parameters for getComments
  {
    displayName: "Get Comments Parameters",
    name: "getCommentsParams",
    type: "collection",
    placeholder: "Add post parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["get comments"],
      },
    },
    options: [
      {
        displayName: "Post URL *",
        name: "post_url",
        type: "string",
        default: "",
        placeholder: "https://www.linkedin.com/posts/activity-123456789",
        description: "LinkedIn post URL",
      },
      {
        displayName: "Total Results",
        name: "total_results",
        type: "number",
        default: 10,
        description: "Number of results to return",
      },
      {
        displayName: "Start Page",
        name: "start_page",
        type: "number",
        default: 1,
        description: "Starting page number",
      },
      {
        displayName: "End Page",
        name: "end_page",
        type: "number",
        default: 1,
        description: "Ending page number",
      },
    ],
  },
  // POST - Specific parameters for sendPostTimeSpent
  {
    displayName: "Send Post Time Spent Parameters",
    name: "sendPostTimeSpentParams",
    type: "collection",
    placeholder: "Add post parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["send post time spent"],
      },
    },
    options: [
      {
        displayName: "Post URL *",
        name: "post_url",
        type: "string",
        default: "",
        placeholder: "https://www.linkedin.com/posts/activity-123456789",
        description: "LinkedIn post URL",
      },
      {
        displayName: "Duration *",
        name: "duration",
        type: "number",
        default: 30,
        description: "Duration in seconds",
      },
      {
        displayName: "Duration Start Time",
        name: "duration_start_time",
        type: "number",
        default: 0,
        description: "Start time in seconds",
      },
      
    ],
  },

  {
    displayName: "Answer Comment Parameters",
    name: "answerCommentParams",
    type: "collection",
    placeholder: "Add answer parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["answer comment"],
      },
    },
    options: [
      {
        displayName: "Tracking ID *",
        name: "tracking_id",
        type: "string",
        default: "",
        placeholder: "tracking_id_here",
        description: "Tracking ID for the comment",
      },
      {
        displayName: "Profile URN *",
        name: "profile_urn",
        type: "string",
        default: "",
        placeholder: "profile_urn_here",
        description: "Profile URN for the comment",
      },
      {
        displayName: "Comment URN *",
        name: "comment_urn",
        type: "string",
        default: "",
        placeholder: "comment_urn_here",
        description: "Comment URN to reply to",
      },
      {
        displayName: "Comment Text *",
        name: "comment_text",
        type: "string",
        default: "",
        placeholder: "Thank you for your comment!",
        description: "Reply content",
      },
      {
        displayName: "Mention User",
        name: "mention_user",
        type: "boolean",
        default: true,
        description: "Mention the user in the reply",
      },
      {
        displayName: "Commenter Name",
        name: "commenter_name",
        type: "string",
        default: "",
        placeholder: "John Doe",
        description: "Name of the commenter",
      },
      
    ],
  },
  {
    displayName: "Search Posts Parameters",
    name: "searchPostsParams",
    type: "collection",
    placeholder: "Add search parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["search posts"],
      },
    },
    options: [
      {
        displayName: "Post Type",
        name: "post_type",
        type: "string",
        default: "",
        placeholder: "article, video, image, text",
        description: "Type of post to search for",
      },
      {
        displayName: "Sort By",
        name: "sort_by",
        type: "string",
        default: "",
        placeholder: "relevance, date, engagement",
        description: "Sort order for results",
      },
      
      {
        displayName: "Keyword",
        name: "keyword",
        type: "string",
        default: "",
        placeholder: "artificial intelligence",
        description: "Keyword to search for in posts",
      },
      {
        displayName: "Post Date",
        name: "post_date",
        type: "string",
        default: "",
        placeholder: "2024-01-01",
        description: "Date filter for posts",
      },
      {
        displayName: "LinkedIn URL",
        name: "linkedin_url",
        type: "string",
        default: "",
        placeholder: "https://www.linkedin.com/in/username",
        description: "LinkedIn profile URL to filter by",
      },
      {
        displayName: "Total Results",
        name: "total_results",
        type: "number",
        default: 10,
        description: "Number of results to return",
      },
      {
        displayName: "Start Page",
        name: "start_page",
        type: "number",
        default: 1,
        description: "Starting page number",
      },
      {
        displayName: "End Page",
        name: "end_page",
        type: "number",
        default: 1,
        description: "Ending page number",
      },
    ],
  },
  {
    displayName: "Create Post Parameters",
    name: "createPostParams",
    type: "collection",
    placeholder: "Add post parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["create post"],
      },
    },
    options: [
      {
        displayName: "Message *",
        name: "message",
        type: "string",
        default: "",
        placeholder: "Share your thoughts here...",
        description: "Post content to create",
      },
      
      {
        displayName: "File",
        name: "file",
        type: "string",
        default: "",
        placeholder: "https://example.com/file.jpg",
        description: "File URL to attach to post",
      },
    ],
  },
  {
    displayName: "Get Feed Parameters",
    name: "getFeedParams",
    type: "collection",
    placeholder: "Add feed parameter",
    default: {},
    displayOptions: {
      show: {
        resource: ["post"],
        operation: ["get linkedin feed"],
      },
    },
    options: [
      {
        displayName: "Total Results",
        name: "total_results",
        type: "number",
        default: 10,
        description: "Number of results to return",
      },
      {
        displayName: "Country",
        name: "country",
        type: "string",
        default: "FR",
        placeholder: "FR, US, UK, DE, ES, IT, CA, AU, etc.",
        description: "Country code for proxy selection",
      },
    ],
  },
];
