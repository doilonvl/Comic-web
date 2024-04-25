import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getChapter } from "../../../components/common/data/dataChapter/dataSlice";
import { fetchContentSuccess } from "../../../components/common/data/dataContent/dataSlice";
const FetchData = (sid, cid) => {
    const dispatch = useDispatch();
    useEffect(() => {
        fetch("http://localhost:9999/chapterContent")
            .then(res => res.json())
            .then(data => dispatch(fetchContentSuccess(data.find(d => d.storyId === +sid && d.chapterId === +cid))));
    }, [sid, cid, dispatch]);
    useEffect(() => {
        fetch(`http://localhost:9999/chapter`)
            .then(res => res.json())
            .then(data => dispatch(getChapter(data.find(d => d.id === +cid && d.storyId === +sid))));
    }, [sid, dispatch, cid]);
}

export default FetchData;