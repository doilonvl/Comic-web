import jwt from "jsonwebtoken";
import { userDAO } from "../repositories/index.js";

const authenticateAdmin = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userDAO.getUserById(decoded.userId);
    if (!user) {
      throw new Error("No user found with this id");
    }
    if (user.role !== 3) {
      throw new Error("Unauthorized: Admin access required");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export default authenticateAdmin;
