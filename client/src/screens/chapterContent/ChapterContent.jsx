import React, { useEffect, useState, useContext } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import {
  ChevronDoubleLeft,
  ChevronDoubleRight,
  ChevronLeft,
  ChevronRight,
  HouseFill,
  List,
} from "react-bootstrap-icons";
import TopViewStories from "../../components/TopViewStories";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import Content from "../../components/common/chapterContent";
import { setChapterNo } from "../../components/common/data/dataChapter/dataSlice";
import DefaultTemplate from "../../templates/DefaultTemplate";
import FetchData from "./FetchData";
import { header, PUT } from "../../components/common/utilities/type.js";
import Comment from "../../components/Comment.js";
import SettingsPanel from "./SettingsPanel.js";
import { AppProvider } from "../../contexts/AppContext";

const ChapterContent = () => {
  const dispatch = useDispatch();
  const { sid, cid } = useParams();
  const navigate = useNavigate();
  const chapteres = useSelector((state) => state.listChapter.data);
  const chapterNo = useSelector((state) => state.listChapter.chapterNo);
  const story = useSelector((state) => state.listStory.story);
  const [timerCompleted, setTimerCompleted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [settings, setSettings] = useState({
    fontSize: "16",
    fontFamily: "Arial",
    backgroundColor: "#ffffff",
  });
  const toggleSettings = () => setShowSettings(!showSettings);

  useEffect(() => {
    navigate(`/get_story/${sid}/chapter/${chapterNo}`);
  }, [sid, chapterNo, navigate]);
  FetchData(sid, cid);
  useEffect(() => {
    const timer = setTimeout(() => {
      setTimerCompleted(true);
      if (!timerCompleted) {
        updateViewCount(sid);
      }
    }, 30000);

    return () => clearTimeout(timer);
  }, [sid, chapterNo]);

  const updateViewCount = (sid) => {
    fetch(`http://localhost:9999/story/update_view_count/${sid}`, {
      method: PUT,
      headers: header,
      body: JSON.stringify({ view: story.view + 1 }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Error while updating view count");
        }
        console.log("View count updated successfully");
      })
      .catch((error) => {
        console.error("Failed to update view count:", error);
      });
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

  const handleOnchangeChapter = (e) => {
    const newChapterNo = +e.target.value;
    navigate(`/get_story/${sid}/chapter/${newChapterNo}`);
    dispatch(setChapterNo(newChapterNo));
    updateChapterHistory(sid, newChapterNo);
  };

  const handleMovePrev = (e) => {
    const newChapterNo = +chapterNo - 1;
    dispatch(setChapterNo(newChapterNo));
    navigate(`/get_story/${sid}/chapter/${newChapterNo}`);
    updateChapterHistory(sid, newChapterNo);
  };

  const handleMoveNext = (e) => {
    const newChapterNo = +chapterNo + 1;
    dispatch(setChapterNo(newChapterNo));
    navigate(`/get_story/${sid}/chapter/${newChapterNo}`);
    updateChapterHistory(sid, newChapterNo);
  };

  return (
    <AppProvider value={{ settings, setSettings }}>
      <DefaultTemplate>
        <Row className="mt-5 mb-4">
          <Col xs={8}>
            <Row>
              <Col xs={12} className="">
                <Row className="text-center">
                  <Col xs={12}>
                    <h2 className="text-info">{story.name}</h2>
                  </Col>
                </Row>
                <Row>
                  <Col xs={12} className="d-flex justify-content-center">
                    <ul className="d-flex mb-3 p-0 top_container_detail">
                      <li className="fw-bold pe-2">Tác giả:</li>
                      <li className="text-muted">{story.uploader?.userName}</li>
                    </ul>
                  </Col>
                </Row>
                <Row className="d-flex justify-content-center">
                  <Col className="d-flex justify-content-end" xs={4}>
                    <span className="mt-1 me-2">
                      <Link to="/">
                        <HouseFill size={24} color="red" />
                      </Link>
                    </span>
                    <span className="mt-1">
                      <Link to={`/detail/${story._id}`}>
                        <List size={28} color="red" />{" "}
                      </Link>
                    </span>
                    <Button
                      onClick={(e) => handleMovePrev(e)}
                      disabled={parseInt(chapterNo) === 1}
                      className="bg-white border-0 px-2 pt-1"
                    >
                      <ChevronLeft
                        onClick={(e) => handleMovePrev(e)}
                        disabled={parseInt(chapterNo) === 1}
                        className="fw-bold"
                        size={24}
                        color="red"
                      />
                    </Button>
                  </Col>
                  <Col xs={4}>
                    <Form.Group>
                      <Form.Select
                        className="form-control"
                        value={chapterNo}
                        onChange={(e) => handleOnchangeChapter(e)}
                      >
                        {chapteres.map((chapter) => (
                          <option
                            value={chapter.chapterNo}
                            key={chapter.chapterNo}
                          >
                            Chương {chapter.chapterNo}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col xs={4}>
                    <Button
                      onClick={(e) => handleMoveNext(e)}
                      disabled={parseInt(chapterNo) === chapteres.length}
                      className="bg-white border-0 px-2 pt-1"
                    >
                      <ChevronRight
                        onClick={(e) => handleMoveNext(e)}
                        disabled={parseInt(chapterNo) === chapteres.length}
                        className="fw-bold"
                        size={24}
                        color="red"
                      />
                    </Button>
                  </Col>
                </Row>
              </Col>
              <Col xs={12}>
                <Content settings={settings} />
              </Col>
            </Row>
            <Row className="mt-4 mb-5">
              <Col xs={12} className="text-center">
                <Button
                  onClick={(e) => handleMovePrev(e)}
                  disabled={parseInt(chapterNo) === 1}
                  className="btn-danger me-1"
                >
                  <ChevronDoubleLeft
                    onClick={(e) => handleMovePrev(e)}
                    disabled={parseInt(chapterNo) === 1}
                  />
                  Chương Trước
                </Button>
                <Button
                  onClick={(e) => handleMoveNext(e)}
                  disabled={parseInt(chapterNo) === chapteres.length}
                  className="btn-danger ms-1"
                >
                  Chương Sau
                  <ChevronDoubleRight
                    onClick={(e) => handleMoveNext(e)}
                    disabled={parseInt(chapterNo) === chapteres.length}
                  />
                </Button>
              </Col>
            </Row>
            <Row>
              <Col xs={12}>
                <Comment sid={sid} />
              </Col>
            </Row>
          </Col>

          <Col xs={4}>
            <TopViewStories />
          </Col>
        </Row>
        <SettingsPanel
          settings={settings}
          setSettings={setSettings}
          showSettings={showSettings}
          toggleSettings={toggleSettings}
        />
      </DefaultTemplate>
    </AppProvider>
  );
};

export default ChapterContent;
