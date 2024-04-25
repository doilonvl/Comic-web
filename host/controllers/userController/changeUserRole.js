import createHttpError from "http-errors";
import { userDAO } from "../../repositories/index.js";

async function changeUserRole(req, res, next) {
  const { userId, newRole } = req.body;

  try {
    await userDAO.changeUserRole(userId, newRole);
    res.send("User role updated successfully");
  } catch (error) {
    next(createHttpError(500, error.message));
  }
}

export default changeUserRole;
