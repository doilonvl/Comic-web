import storyCategoryRepositories from "../../repositories/storyCategoryRepositories/index.js";

const getStoryCategories = async (req, res) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(401).send("Access denied.");
  try {
    const { sid } = req.params;
    res
      .status(200)
      .json(await storyCategoryRepositories.getStoryCategories(sid));
  } catch (error) {
    res.status(500).json(error.message);
  }
};
export default getStoryCategories;
