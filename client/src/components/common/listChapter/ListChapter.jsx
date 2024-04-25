import React, { memo, useEffect, useRef, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchChapterSuccess,
  setChapterNo,
} from "../data/dataChapter/dataSlice";
import calTime from "../utilities/calTime";
import axios from "axios";
import { BASE_URL } from "../utilities/initials";

const ListChapter = () => {
  const dispatch = useDispatch();
  const [more, setMore] = useState(10);
  const { sid } = useParams();
  const { data: listChapter } = useSelector((state) => state.listChapter);
  console.log(listChapter);
  // const listChapterCopy = [...listChapter];
  // const newListChapter = listChapterCopy.sort((a, b) => b["_id"] - a["_id"]);
  // const newListChapter_10 = newListChapter.slice(0, more);
  const limit = 10;
  useEffect(() => {
    // axios
    //   .get(`${BASE_URL}/story/get_story/${sid}`, config)
    //   .then((res) => dispatch(fetchStorySuccess(res.data)))
    //   .catch((err) => console.log(err.message));
    axios
      .get(`${BASE_URL}/chapter/${sid}/story?limit=${limit}`)
      .then((res) => dispatch(fetchChapterSuccess(res.data)))
      .catch((err) => console.log(err.message));
  }, [dispatch, sid]);

  const handleMore = () => {
    setMore(listChapter.length);
  };

  const updateChapterHistory = (storyId, chapterNo) => {
    let chapterHistory =
      JSON.parse(localStorage.getItem("chapterHistory")) || [];

    const existingIndex = chapterHistory.findIndex(
      (item) => item.storyId === storyId
    );
    if (existingIndex !== -1) {
      chapterHistory[existingIndex] = { storyId, chapterNo };
    } else {
      chapterHistory.push({ storyId, chapterNo });
    }

    localStorage.setItem("chapterHistory", JSON.stringify(chapterHistory));
  };

  const handleChapterSelection = (storyId, chapterId) => {
    dispatch(setChapterNo(chapterId));
    updateChapterHistory(storyId, chapterId);
  };
  return (
    <Col xs={12}>
      {listChapter.length > 0 ? (
        <Row>
          <Col xs={12} className="">
            <ul className={`align-middle content_header mb-0 p-0 `}>
              {listChapter.map((chapter) => (
                <li
                  key={chapter.chapterNo}
                  className={`content_header_list_item pt-2 pb-2 mx-4 px-2`}
                >
                  <Row className="d-flex justify-content-between">
                    <Col xs={6}>
                      <span>
                        <Link
                          className="name_chapter text-dark"
                          onClick={() =>
                            handleChapterSelection(sid, chapter.chapterNo)
                          }
                          to={`/get_story/${sid}/chapter/${chapter._id}`}
                        >
                          Chương {chapter.chapterNo}{" "}
                          {chapter.name ? `- ${chapter.name}` : ""}
                        </Link>
                      </span>
                    </Col>
                    <Col xs={4}>{calTime(chapter.publishedDate)}</Col>
                  </Row>
                </li>
              ))}
              {more < listChapter.length ? (
                <li className="text-center custom-cursor">
                  <span onClick={handleMore}>Xem thêm</span>
                </li>
              ) : (
                ""
              )}
            </ul>
          </Col>
        </Row>
      ) : (
        ""
      )}
    </Col>
  );
};

export default memo(ListChapter);
