import User from "../../models/Users.js";

async function changeUserRole(userId, newRole) {
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found");
  }

  user.role = newRole;
  await user.save();

  return user;
}

export default changeUserRole;
