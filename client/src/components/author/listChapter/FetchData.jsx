import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChapter } from "../../common/data/dataChapter/dataSlice";
import { fetchContentsSuccess } from "../../common/data/dataContent/dataSlice";

const FetchData = (sid, chapterId) => {
  const dispatch = useDispatch();
  const listContentQuantity = useSelector((state) => state.content.quantity);
  // useEffect(() => {
  //   fetch("http://localhost:9999/chapter")
  //     .then((res) => res.json())
  //     .then((data) =>
  //       dispatch(getChapter(data.find((d) => d.id === chapterId)))
  //     );
  // }, [chapterId, dispatch]);
  useEffect(() => {
    // fetch("http://localhost:9999/chapterContent")
    //   .then((res) => res.json())
    //   .then((data) =>
    //     dispatch(fetchContentsSuccess(data.filter((d) => d.storyId === +sid)))
    //   );
  }, [sid, dispatch, listContentQuantity]);
};

export default FetchData;
