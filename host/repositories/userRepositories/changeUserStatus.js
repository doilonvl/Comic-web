import User from "../../models/Users.js";

async function changeUserStatus(userId, newStatus) {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  user.status = newStatus;
  await user.save();

  return user;
}

export default changeUserStatus;
