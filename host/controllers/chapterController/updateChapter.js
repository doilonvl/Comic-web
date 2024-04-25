import chapterDAO from "../../repositories/chapterRepositories/index.js";

export default async function updateChapter(req, res, next) {
  try {
    const { chapter } = req.body;
    const { cid } = req.params;
    res.status(200).json(await chapterDAO.updateChapter(cid, chapter));
  } catch (error) {
    res.status(500).json(error);
  }
}
