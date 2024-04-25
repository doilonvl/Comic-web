import User from "../../models/Users.js";

const updateUser = async (phoneNumber, userData) => {
  const updatedUser = await User.findOneAndUpdate(
    { phoneNumber: phoneNumber },
    userData,
    {
      new: true,
    }
  );
  return updatedUser;
};

export default updateUser;
