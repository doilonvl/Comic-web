import { useEffect, useRef, useState } from "react";
import { Button, Col, Row } from "react-bootstrap";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import CalTime from "../../../components/common/utilities/calTime";
import { fetchFeedbackSuccess } from "../../../components/common/data/dataBoxChat/dataSlice";
import InputField from "../../../components/common/custom-fileds/inputField/index";
import DefaultTemplate from "../../../templates/DefaultTemplate";
import HeaderChat from "./headerChat";
import { header } from "../../../components/common/utilities/type";
import { setStory } from "../../../app/slices/storiesSlice";
import { BASE_URL } from "../../../components/common/utilities/initials";
import io from "socket.io-client";

const socket = io(BASE_URL);

const Feedback = () => {
  const dispatch = useDispatch();
  const navigation = useNavigate();
  const inputValue = useRef();
  const { sid } = useParams();
  const [value, setValue] = useState("");
  const [limit, setLimit] = useState(30);
  const [endBlock, setEndBlock] = useState(true);
  const { data, count: quantity } = useSelector(
    (state) => state.feedback.feedbacks
  );
  const listFeedback = data ? data.slice() : [];
  listFeedback.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
  let groupedMessages = [];
  let currentGroup = [];
  let count = 0;
  listFeedback.forEach((message, index) => {
    if (
      index === 0 ||
      message.userId._id !== listFeedback[index - 1].userId._id
    ) {
      if (currentGroup.length > 0) {
        groupedMessages.push({
          messages: currentGroup,
          user: currentGroup[0].userId,
        });
      }
      currentGroup = [message];
    } else {
      currentGroup.push(message);
    }
  });
  if (currentGroup.length > 0) {
    groupedMessages.push({
      messages: currentGroup,
      user: currentGroup[0].userId,
    });
  }
  const targetDivRef = useRef(null);
  const handleInputChange = (event) => {
    setValue(event.target.value);
  };
  const handleSubmit = () => {
    const regex = /^[\s]*$/;
    if (regex.test(value)) return;
    const feedback = {
      storyId: sid,
      userId: "65de17c3ffbca6da2a45e695",
      feedback: value,
      status: "normal",
    };
    socket.emit("chat message", feedback);
    axios
      .post("http://localhost:9999/feedback/add_new", feedback, {
        headers: header,
      })
      .then(() => getListFeedback(sid, limit));
    setValue("");
    inputValue.current.focus();
  };
  const handleScroll = (event) => {
    const { scrollTop, clientHeight, scrollHeight } = event.target;
    const check =
      Math.ceil(scrollTop + clientHeight) === scrollHeight - 7 ||
      Math.ceil(scrollTop + clientHeight) === scrollHeight;
    if (scrollTop === 0 && quantity > limit) {
      setLimit(limit + 20);
      event.target.scrollTop = 100;
    }
    if (check) setEndBlock(true);
    else setEndBlock(false);
  };
  useEffect(() => {
    axios
      .get(`${BASE_URL}/feedback/${sid}?limit=${limit}&skip=${0}`)
      .then((res) => dispatch(fetchFeedbackSuccess(res.data)))
      .catch((err) => console.log(err.message));
  }, [sid, limit, dispatch]);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/story/get_story/${sid}`)
      .then((res) => dispatch(setStory(res.data)))
      .catch((err) => console.log(err.message));
  }, [sid, dispatch]);
  useEffect(() => {
    if (targetDivRef.current && endBlock) {
      targetDivRef.current.scrollIntoView({ block: "end" });
    }
  }, [data, endBlock]);
  const getListFeedback = async (sid, limit) =>
    axios
      .get(`${BASE_URL}/feedback/${sid}?limit=${limit}&skip=${0}`)
      .then((res) => dispatch(fetchFeedbackSuccess(res.data)))
      .catch(() => navigation("/login"));
  const handleRecalMessage = async (id) => {
    await axios
      .patch(
        `${BASE_URL}/feedback/recall_message/${id}`,
        { status: "recall" },
        { headers: header }
      )
      .then(() => getListFeedback(sid, limit))
      .catch((e) => console.log(e.message));
  };
  const handelDeleteMessage = async (id) => {
    await axios
      .delete(
        `${BASE_URL}/feedback/delete_message/${id}`,
        { status: "recall" },
        { headers: header }
      )
      .then(() => getListFeedback(sid, limit))
      .catch((e) => console.log(e.message));
  };
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Đã kết nối với máy chủ Socket.IO");
    });
    socket.on("chat message", (msg) => {
      axios
        .get(`${BASE_URL}/feedback/${sid}?limit=${limit}&skip=${0}`)
        .then((res) => dispatch(fetchFeedbackSuccess(res.data)))
        .catch(() => navigation("/login"));
    });
    socket.on("disconnect", () => {
      console.log("A client disconnected");
    });
    // return () => {
    //   socket.disconnect();
    // };
  }, [dispatch, sid, limit, navigation]);
  return (
    <DefaultTemplate>
      <div
        className="bc_article d-flex flex-column overflow-hidden"
        style={{ height: "calc(100vh - 144px)" }}
      >
        <HeaderChat />
        <div className="bc_article-chat_view d-flex flex-column flx-1">
          <div
            className="bc_article-message_view flx-1 px-3"
            onScroll={handleScroll}
          >
            {groupedMessages.map(({ user, messages }) => (
              <div
                key={count + "key"}
                className={`${
                  "65d7110044acd31351cfc500" === user._id ? "d-flex" : ""
                }`}
              >
                {"65d7110044acd31351cfc500" === user._id ? (
                  <div className="d-flex align-items-end me-2">
                    <img
                      className="rounded-circle border img_32"
                      src={`${
                        user.image ||
                        "https://th.bing.com/th/id/OIP.wRtvON_8JKRQghdROw5QvQHaHa?rs=1&pid=ImgDetMain"
                      }`}
                      alt=""
                    />
                  </div>
                ) : (
                  ""
                )}
                <div className="flx">
                  {messages.map((f, index) => {
                    count += 1;
                    return (
                      <div
                        key={f._id}
                        ref={
                          listFeedback.length === count ? targetDivRef : null
                        }
                      >
                        <Row>
                          <Col xs={12}>
                            <div
                              className={`${
                                "65d7110044acd31351cfc500" !== f.userId._id
                                  ? "float-end d-flex justify-content-end me-2 align-items-end gap-1"
                                  : "float-start d-flex justify-content-start "
                              } ms-2 w-75 ${
                                index === listFeedback.length - 1 ? "mb-2" : ""
                              }`}
                            >
                              {"65d7110044acd31351cfc500" !== f.userId._id &&
                              f.status === "normal" ? (
                                <div className="position-relative">
                                  <svg
                                    style={{ marginBottom: "-10px" }}
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="24"
                                    height="24"
                                    fill="currentColor"
                                    className="bi bi-three-dots custom-cursor px-1 pt-1 pb-1"
                                    viewBox="0 0 16 16"
                                  >
                                    <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3" />
                                  </svg>
                                  <div
                                    style={{ userSelect: "none" }}
                                    className="bc-action d-flex flex-column gap-1 position-absolute "
                                  >
                                    <div
                                      onClick={() => handleRecalMessage(f._id)}
                                      className="custom-cursor px-1 rounded enter"
                                    >
                                      Thu hồi
                                    </div>
                                    <div
                                      onClick={() => handelDeleteMessage(f._id)}
                                      className="text-danger rounded custom-cursor px-1 enter"
                                    >
                                      Xóa
                                    </div>
                                  </div>
                                </div>
                              ) : (
                                ""
                              )}
                              <span
                                style={{
                                  minWidth: "100px",
                                  borderRadius: "18px",
                                }}
                                className={`lh-sm pb-2 pt-1 text-break ${
                                  f.status === "normal"
                                    ? "bg-primary"
                                    : "bg-secondary"
                                } mt-2 px-3 text-white align-baseline`}
                              >
                                {f.status === "normal"
                                  ? f.feedback
                                  : "Tin nhắn đã được thu hồi"}{" "}
                              </span>
                            </div>
                          </Col>
                        </Row>
                      </div>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
          <div
            className="d-flex justify-content-center border rounded align-items-center my-1"
            style={{ gap: "1.5rem", margin: "0 46px", height: "56px" }}
          >
            <div className="flx-1 mt-3">
              <InputField
                handleInputChange={handleInputChange}
                placeholder="Aa..."
                value={value}
                ref={inputValue}
                className={"bc-group_input"}
              />
            </div>
            <div className="custom-cursor">
              <Button
                disabled={value === ""}
                className="bg-white text-info"
                style={{ outline: "none", border: "none" }}
                onClick={handleSubmit}
              >
                Send
              </Button>
            </div>
          </div>
        </div>
      </div>
    </DefaultTemplate>
  );
};

export default Feedback;
