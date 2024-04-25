export default {
  type: "object",
  required: ["name", "status", "role"],
  properties: {
    name: {
      type: "string",
      description: "The name of the user type",
      unique: true,
    },
    status: {
      type: "string",
      description: "The status of the user type",
    },
    role: {
      type: "integer",
      description: "The role of the user type",
      unique: true,
    },
  },
  example: {
    name: "Admin",
    status: "active",
    role: 1,
  },
};
