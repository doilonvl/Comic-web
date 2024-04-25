export default {
  type: "object",
  required: ["name", "status"],
  properties: {
    name: {
      type: "string",
      description: "The name of the category. This field is unique.",
    },
    status: {
      type: "string",
      description:
        'The status of the category. It can be either "Active" or "Inactive".',
      enum: ["Active", "Inactive"],
    },
  },
  example: {
    name: "Adventure",
    status: "Active",
  },
};
