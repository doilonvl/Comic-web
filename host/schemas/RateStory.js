export default {
  type: "object",
  required: ["rateNo", "status", "userId", "rateStoryId"],
  properties: {
    rateNo: {
      type: "integer",
      minimum: 1,
      maximum: 5,
      description: "The rating number",
    },
    status: {
      type: "string",
      description: "The status of the rating",
    },
    userId: {
      type: "string",
      description: "The id of the user who gave the rating",
    },
    rateStoryId: {
      type: "string",
      description: "The id of the story that was rated",
    },
  },
  example: {
    rateNo: 5,
    status: "active",
    userId: "60d3b41f292a3e60d7d5c689",
    rateStoryId: "60d3b41f292a3e60d7d5c689",
  },
};
