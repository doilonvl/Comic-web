export default {
  type: "object",
  required: ["storyId", "userId"],
  properties: {
    storyId: {
      type: "string",
      description: "The id of the story being followed",
    },
    userId: {
      type: "string",
      description: "The id of the user following the story",
    },
  },
  example: {
    storyId: "60d3b41f292a3e60d7d5c689",
    userId: "60d3b41f292a3e60d7d5c688",
  },
};
