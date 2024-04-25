import React, { memo, useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row, Table } from "react-bootstrap";
import { Pen } from "react-bootstrap-icons";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import FetchData from "./FetchData";
import CheckBox from "../../common/custom-fileds/CheckboxField";
import calTime from "../../common/utilities/calTime";
import {
  activeChapter,
  fetchChapterSuccess,
  getChapter,
  setChapterNo,
} from "../../common/data/dataChapter/dataSlice";
import { createContent } from "../../common/data/dataContent/dataSlice";
import axios from "axios";
import { BASE_URL } from "../../common/utilities/initials";
import { fetchStorySuccess } from "../../common/data/dataStory/dataSlice";

const ListChapter = () => {
  const dispatch = useDispatch();
  const inputRef = useRef("");
  const { sid } = useParams();
  const [user, setUser] = useState({});
  const listChapter = useSelector((state) => state.listChapter.data);
  const chapter = useSelector((state) => state.listChapter.chapter);
  const story = useSelector((state) => state.listStory.story);
  const listContent = useSelector((state) => state.content.data);
  let limit = 10;
  const jwt = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
  useEffect(() => {
    axios
      .get(`${BASE_URL}/users`, config)
      .then((res) => dispatch(setUser(res.data)))
      .catch((err) => console.log(err.message));
  }, []);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/story/get_story/${sid}`, config)
      .then((res) => dispatch(fetchStorySuccess(res.data)))
      .catch((err) => console.log(err.message));
    axios
      .get(`${BASE_URL}/chapter/${sid}/story?limit=${limit}`, config)
      .then((res) => dispatch(fetchChapterSuccess(res.data)))
      .catch((err) => console.log(err.message));
  }, [sid]);
  // FetchData(sid, chapterId);
  const handleInputChange = (e) => {
    dispatch(getChapter({ ...chapter, name: e.target.value }));
  };
  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [chapter]);
  const handleNewName = (chapter, name) => {
    dispatch(getChapter(chapter));
  };
  const handleSubmit = () => {
    console.log(chapter);
    axios
      .put(
        `${BASE_URL}/chapter/${chapter?._id}/update`,
        { chapter: chapter },
        config
      )
      .then(() => {
        axios
          .get(`${BASE_URL}/chapter/${sid}/story?limit=${limit}`, config)
          .then((res) => dispatch(fetchChapterSuccess(res.data)))
          .catch((err) => console.log(err.message));
        dispatch(getChapter({}));
      })
      .catch((err) => console.log(err.message));
  };
  const handleCreateContetChapter = (chapter) => {
    let count = listContent.reduce((acc, content) => {
      if (chapter.id === content.chapterId) {
        acc += 1;
      }
      return acc;
    }, 0);
    if (count === 0) {
      dispatch(createContent({ storyId: +sid, chapterId: chapter.id }));
    }
  };
  const handleCreateChapter = (chapter) => {
    axios
      .put(
        `${BASE_URL}/chapter/${chapter?._id}/update`,
        { chapter: { ...chapter, isActive: true } },
        config
      )
      .then(() => {
        axios
          .get(`${BASE_URL}/chapter/${sid}/story?limit=${10}`, config)
          .then((res) => dispatch(fetchChapterSuccess(res.data)))
          .catch((err) => console.log(err.message));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <Row>
      {listChapter && listChapter?.length > 0 ? (
        <Col xs={12}>
          <Row>
            <Col xs={12}>
              <Table
                striped
                bordered
                size="sm"
                className={`align-middle text-center content_header border mb-0 p-0`}
              >
                <thead>
                  <tr className="text-center">
                    <th>#</th>
                    <th>Số chương</th>
                    {user.role === 3 ? <th>Mã truyện</th> : ""}
                    <th>Tên chương</th>
                    <th>Ngày phát hành</th>
                    {user._id === story.uploader?._id && (
                      <>
                        <th>Kích hoạt</th>
                        <th>Hành động</th>
                      </>
                    )}
                  </tr>
                </thead>
                <tbody>
                  {listChapter.map((c, index) => (
                    <tr
                      key={c._id}
                      className={`Content_header_List_item pt-2 pb-2 mx-4 px-2 ${
                        index === listChapter?.length - 1 ? "last_item" : ""
                      }`}
                    >
                      <td>{index + 1}</td>
                      <td>
                        <Link
                          className="name_chapter text-dark"
                          onClick={() => dispatch(setChapterNo(c.chapterNo))}
                          to={`/detail/${sid}/chapter/${c._id}`}
                        >
                          Chương {c.chapterNo}
                        </Link>
                      </td>
                      {user.role === 3 && <td>{c._id}</td>}
                      <td
                        onClick={() => handleNewName(c, c.name)}
                        className={`${
                          chapter?._id === c._id &&
                          !c.isActive &&
                          user._id === story.uploader?._id &&
                          !c.active &&
                          "d-none"
                        } ${
                          user._id === story.uploader?._id && !c.active
                            ? "custom-cursor text-primary"
                            : ""
                        }`}
                      >
                        {!c.isActive
                          ? user._id === story.uploader?._id &&
                            c.name?.length === 0
                            ? "+"
                            : c.name
                          : c.name?.length === 0
                          ? "..."
                          : c.name}
                      </td>
                      {chapter?._id === c._id &&
                      user._id === story.uploader?._id &&
                      !c.isActive ? (
                        <td className={`d-flex justify-content-center gap-3`}>
                          <Form.Control
                            placeholder="Aa"
                            xs={9}
                            value={chapter?.name}
                            onChange={handleInputChange}
                            ref={inputRef}
                          />
                          <Button onClick={handleSubmit}>Lưu</Button>
                        </td>
                      ) : (
                        ""
                      )}
                      <td>
                        {!c.active
                          ? "Chưa được phát hành"
                          : calTime(c.publishedDate)}
                      </td>
                      {user._id === story.uploader?._id ? (
                        <>
                          <td>
                            <CheckBox
                              name="active"
                              required={false}
                              disabled={c.isActive}
                              checked={c.isActive}
                              // id={c}
                              handleOnchange={() => handleCreateChapter(c)}
                            />
                          </td>
                          <td>
                            {c.active ? (
                              ""
                            ) : (
                              <Link
                                onClick={() => handleCreateContetChapter(c)}
                                to={`${
                                  !c.isActive
                                    ? `/author/mystory/listchapter/${sid}/content/${c._id}`
                                    : ""
                                }`}
                              >
                                <Pen
                                  color={`${!c.isActive ? "black" : "grey"}`}
                                  className="pb-1"
                                  size={22}
                                />
                              </Link>
                            )}
                          </td>
                        </>
                      ) : (
                        ""
                      )}
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Col>
          </Row>
        </Col>
      ) : (
        <Row>
          <Col xs={12} className="text-center border-0">
            {/* <h2 className="m-0">
                                    Đang Cập Nhật
                                </h2> */}
          </Col>
        </Row>
      )}
    </Row>
  );
};

export default memo(ListChapter);
