export default {
  type: "object",
  required: ["storyId", "userId", "feedback"],
  properties: {
    storyId: {
      type: "string",
      description: "The id of the story the feedback is for",
    },
    userId: {
      type: "string",
      description: "The id of the user who gave the feedback",
    },
    feedback: {
      type: "string",
      description: "The feedback text",
    },
    status: {
      type: "string",
      description: "The status of the feedback",
    },
  },
  example: {
    storyId: "60d3b41f292a3e60d7d5c689",
    userId: "60d3b41f292a3e60d7d5c689",
    feedback: "This is a feedback",
    status: "published",
  },
};
