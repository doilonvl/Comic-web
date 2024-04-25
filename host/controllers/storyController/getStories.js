import { storyDAO } from "../../repositories/index.js";

export default async function getStories(req, res) {
  try {
    const { status, categoryId } = req.query;
    const stories = await storyDAO.getStories({ status, categoryId });
    res.status(200).json(stories);
  } catch (error) {
    res.status(500).json(error.message);
  }
}
