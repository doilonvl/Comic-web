import storyRepositories from "../../repositories/storyRepositories/index.js";
import jwt from "jsonwebtoken";

const getStoriesByUser = async (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("Access denied.");
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const userId = decoded.userId;
    const result = await storyRepositories.getStoriesByUser(userId);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export default getStoriesByUser;
