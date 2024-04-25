export default {
  type: "object",
  required: ["commentId", "UserId", "reply"],
  properties: {
    commentId: {
      type: "string",
      description: "The id of the comment this reply is for",
    },
    UserId: {
      type: "string",
      description: "The id of the user who made the reply",
    },
    reply: {
      type: "string",
      description: "The reply text",
    },
    isActive: {
      type: "boolean",
      description: "Whether the reply is active or not",
      default: false,
    },
  },
  example: {
    commentId: "60d3b41f292a3e60d7d5c689",
    UserId: "60d3b41f292a3e60d7d5c689",
    reply: "This is a reply",
    isActive: true,
  },
};
