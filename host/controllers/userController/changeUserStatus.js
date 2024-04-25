import createHttpError from "http-errors";
import { userDAO } from "../../repositories/index.js";

async function changeUserStatus(req, res, next) {
  const { userId, newStatus } = req.body;
  try {
    await userDAO.changeUserStatus(userId, newStatus);
    res.send("User status updated successfully");
  } catch (error) {
    next(createHttpError(500, error.message));
  }
}

export default changeUserStatus;
