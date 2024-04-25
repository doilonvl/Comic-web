import User from "../../models/Users.js";

const getAllUsersSortedByRole = async () => {
  try {
    return await User.find().sort({ role: -1 }).exec();
  } catch (error) {
    throw new Error(error.toString());
  }
};

export default getAllUsersSortedByRole;
