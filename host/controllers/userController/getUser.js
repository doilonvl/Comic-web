import userRepositories from "../../repositories/userRepositories/index.js";
import jwt from "jsonwebtoken";

const getUser = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("Access denied.");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const id = decoded.userId;
    res.status(200).json(await userRepositories.getUserById({ id }));
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export default getUser;
