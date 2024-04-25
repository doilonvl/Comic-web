import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchChapterSuccess } from "../../components/common/data/dataChapter/dataSlice";
import { fetchContentSuccess } from "../../components/common/data/dataContent/dataSlice";
import { fetchStorySuccess } from "../../components/common/data/dataStory/dataSlice";
import axios from "axios";

const FetchData = (sid) => {
  const dispatch = useDispatch();
  const chapterNo = useSelector((state) => state.listChapter.chapterNo);
  useEffect(() => {
    if (sid) {
      fetch(`http://localhost:9999/story/chapters/${sid}`)
        .then((res) => res.json())
        .then((chapters) => {
          if (chapters && chapters.length > 0) {
            dispatch(fetchChapterSuccess(chapters));

            const currentChapter = chapters.find(
              (chapter) => chapter.chapterNo === chapterNo
            );
            if (currentChapter) {
              fetch(
                `http://localhost:9999/story/chapterContent/${currentChapter._id}`
              )
                .then((res) => res.json())
                .then((content) => {
                  if (content) {
                    dispatch(fetchContentSuccess(content));
                    if (content.storyId) {
                      dispatch(fetchStorySuccess(content.storyId));
                    }
                  }
                })
                .catch((error) =>
                  console.error(
                    "Failed to fetch current chapter content and story:",
                    error
                  )
                );
            }
          }
        })
        .catch((error) => console.error("Failed to fetch chapters:", error));
    }
  }, [sid, chapterNo, dispatch]);
  useEffect(() => {
    axios
      .get(`http://localhost:9999/story/get_story/${sid}`)
      .then((res) => dispatch(fetchStorySuccess(res.data)))
      .catch((err) => console.log(err));
  }, [sid]);
};

export default FetchData;
