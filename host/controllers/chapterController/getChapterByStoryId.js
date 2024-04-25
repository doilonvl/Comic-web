import chapterDAO from "../../repositories/chapterRepositories/index.js";

export default async function getAllComments(req, res, next) {
  try {
    const { sid } = req.params;
    const { limit } = req.query;
    res.status(201).json(await chapterDAO.getChapterByStoryId(sid, limit));
  } catch (error) {
    res.status(500).json(error);
  }
}
