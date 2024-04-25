import express from "express";
import ChapterContent from "../../models/ChapterContent.js";
import Chapter from "../../models/Chapter.js";

const ChapterContentRouter = express.Router();

ChapterContentRouter.put("/:chapterId", async (req, res) => {
  const { chapterId } = req.params;
  const { paragraph } = req.body;
  try {
    let chapterContent = await ChapterContent.findOne({ chapterId });

    if (!chapterContent) {
      const chapter = await Chapter.findById(chapterId);
      if (!chapter) {
        return res.status(404).send("Chapter not found");
      }
      chapterContent = new ChapterContent({
        chapterId,
        storyId: chapter.storyId,
        paragraph,
      });
    } else {
      chapterContent.paragraph = paragraph;
    }

    await chapterContent.save();
    res.status(200).json(chapterContent);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

ChapterContentRouter.get("/:cid", async (req, res) => {
  const { cid } = req.params;

  try {
    const content = await ChapterContent.findOne({ chapterId: cid });

    if (!content) {
      return res.status(404).json({ message: "Content not found" });
    }

    res.json(content);
  } catch (error) {
    console.error("Error fetching chapter content:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default ChapterContentRouter;
