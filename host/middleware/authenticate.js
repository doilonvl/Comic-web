import jwt from "jsonwebtoken";
import { userDAO } from "../repositories/index.js";

const authenticate = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await userDAO.getUserById(decoded.userId);
    if (!user) {
      throw new Error("No user found with this id");
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Unauthorized" });
  }
};


export default authenticate;
