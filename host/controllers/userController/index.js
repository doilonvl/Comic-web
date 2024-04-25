import login from "./loginUser.js";
import register from "./registerUser.js";
import getAllUsers from "./getAllUser.js";
import getUserByToken from "./getUserDetail.js";
import updateUser from "./updateUser.js";
import uploadImage from "./uploadImage.js";
import getAllUsersSortedByRole from "./getAllUsersSortedByRole.js";
import changeUserRole from "./changeUserRole.js";
import changeUserStatus from "./changeUserStatus.js";

export default {
  login,
  register,
  getAllUsers,
  getUserByToken,
  updateUser,
  uploadImage,
  getAllUsersSortedByRole,
  changeUserRole,
  changeUserStatus,
};
