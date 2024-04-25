import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import {
  fetchChapterSuccess,
  getChapter,
} from "../../common/data/dataChapter/dataSlice";
import { fetchContentsSuccess } from "../../common/data/dataContent/dataSlice";
import { fetchStorySuccess } from "../../common/data/dataStory/dataSlice";

const FetchData = (sid) => {
  const dispatch = useDispatch();
  // useEffect(() => {
  //   fetch("http://localhost:9999/chapter?storyId=" + sid)
  //     .then((res) => res.json())
  //     .then((data) => dispatch(fetchChapterSuccess(data)));
  // }, [sid, dispatch]);
  // useEffect(() => {
  //   fetch("http://localhost:9999/chapterContent")
  //     .then((res) => res.json())
  //     .then((data) =>
  //       dispatch(fetchContentsSuccess(data.filter((d) => d.storyId === +sid)))
  //     );
  // }, [sid, dispatch]);
  // useEffect(() => {
  //   fetch("http://localhost:9999/Stories")
  //     .then((res) => res.json())
  //     .then((data) =>
  //       dispatch(fetchStorySuccess(data.find((d) => d.id === +sid)))
  //     );
  // }, [sid, dispatch]);
};

export default FetchData;
