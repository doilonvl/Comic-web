import createHttpError from "http-errors";
import { chapterDAO, storyDAO } from "../../repositories/index.js";
import Filter from "bad-words";
import leoProfanity from "leo-profanity";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const filter = new Filter();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const badWordsViPath = path.resolve(
  __dirname,
  "../../utils/vn_offensive_words.txt"
);

const badWordsVi = fs
  .readFileSync(badWordsViPath, "utf-8")
  .split("\n")
  .filter((word) => word && !word.startsWith("#"));

leoProfanity.loadDictionary("en");
leoProfanity.add(badWordsVi);

const getProfaneWords = (text) => {
  let profaneWords = [];
  const textArray = Array.isArray(text) ? text : [text];
  for (let paragraph of textArray) {
    if (typeof paragraph === "string") {
      const words = paragraph.split(" ");
      for (let word of words) {
        if (filter.isProfane(word) || leoProfanity.check(word)) {
          profaneWords.push(word);
        }
      }
    }
  }
  return profaneWords;
};
const getStoriesByStatus = async (req, res, next) => {
  try {
    const { status, search } = req.query;
    const stories = await storyDAO.getStoriesByStatus(status, search);

    const storiesWithProfanityCheck = await Promise.all(
      stories.map(async (story) => {
        const storyObject = story.toObject();
        const chapters = await chapterDAO.getChapterByStoryId(storyObject._id);

        const containsProfanityInName =
          filter.isProfane(storyObject.name) ||
          leoProfanity.check(storyObject.name);

        const profaneWordsInName = getProfaneWords(storyObject.name);

        const profaneChapters = [];
        for (let chapter of chapters) {
          const content = await storyDAO.getStoryDetail(chapter._id);
          if (content && content.paragraph) {
            const profaneWords = getProfaneWords(content.paragraph);
            if (profaneWords.length > 0) {
              profaneChapters.push({
                chapterNo: chapter.chapterNo,
                profaneWords,
              });
            }
          }
        }

        const containsProfanityInChapters = profaneChapters.length > 0;

        return {
          ...storyObject,
          containsProfanity:
            containsProfanityInName || containsProfanityInChapters,
          profaneWords: profaneWordsInName,
          profanityDetails: {
            inName: containsProfanityInName ? profaneWordsInName : [],
            inChapters: containsProfanityInChapters ? profaneChapters : [],
          },
        };
      })
    );
    res.status(200).json(storiesWithProfanityCheck);
  } catch (error) {
    next(createHttpError(500, error.message));
  }
};

export default getStoriesByStatus;
