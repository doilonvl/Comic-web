import { useEffect, useRef, useState } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { Chat } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import CalTime from "./common/utilities/calTime";
import { DELETE, header, POST, PUT } from "./common/utilities/type";
import axios from "axios";
const FormComment = ({ sid }) => {
  const commentValue = useRef("");
  const commentReplyValue = useRef("");
  const [comment, setComment] = useState("");
  const [commentNo, setCommentNo] = useState(0);
  const [editNo, setEditNo] = useState(0);
  const [editReplyNo, setEditReplyNo] = useState(0);
  const [replyNo, setReplyNo] = useState(0);
  const [deleteNo, setDeleteNo] = useState(0);
  const [reply, setReply] = useState("");
  const [edit, setEdit] = useState("");
  const [editReply, setEditReply] = useState("");
  const [comments, setComments] = useState([]);
  const [replies, setReplies] = useState([]);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({});
  //   const user = JSON.parse(localStorage.getItem("user"));

  const jwt = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
  console.log(user);
  useEffect(() => {
    fetch("http://localhost:9999/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
    axios
      .get("http://localhost:9999/users", config)
      .then((res) => setUser(res.data));
  }, [sid]);
  useEffect(() => {
    fetch("http://localhost:9999/replies")
      .then((res) => res.json())
      .then((data) => setReplies(data));
  }, [sid, replyNo, deleteNo, editReplyNo]);
  useEffect(() => {
    setDeleteNo(0);
    fetch("http://localhost:9999/comments")
      .then((res) => res.json())
      .then((data) =>
        setComments(data.filter((d) => d.storyId === parseInt(sid)))
      );
  }, [sid, editNo, replyNo, deleteNo, commentNo]);
  const newComment = comments.map((comment) => ({ ...comment, replies: [] }));
  users.forEach((user) => {
    newComment.forEach((comment) => {
      if (comment.userId === user._id) {
        comment.userImg = user.img;
        comment.userName = user.username;
      }
    });
  });
  replies.forEach((r) => {
    newComment.forEach((comment) => {
      if (r.commentId === comment.id) {
        comment.replies.push(r);
      }
    });
  });
  users.forEach((user) => {
    newComment.forEach((comment) => {
      comment.replies.forEach((reply) => {
        if (reply.userId === user._id) {
          reply.userImg = user.img;
          reply.userName = user.username;
        }
      });
    });
  });
  const handleSetComment = (e) => {
    setComment(e.target.value);
    setCommentNo(e.target.value.length);
  };
  const handleSend = () => {
    if (user._id) {
      toast.warning("Bạn cần phải đăng nhập để có thể bình luận!");
    } else if (comment.trim().length === 0) {
      toast.warning("Bạn chưa nhập nội dung!");
    } else {
      fetch("http://localhost:9999/comments", {
        method: POST,
        body: JSON.stringify({
          userId: user._id,
          storyId: parseInt(sid),
          comment: comment,
          date: new Date(),
          status: 0,
        }),
        headers: header,
      });
      setComment("");
      setCommentNo(0);
    }
  };
  const handleEdit = (c) => {
    if (user === null) {
      toast.warning("Bạn cần phải đăng nhập để có thể bình luận!");
    } else if (edit.trim().length === 0) {
      toast.warning("Bạn chưa nhập nội dung!");
    } else {
      fetch("http://localhost:9999/comments/" + c.id, {
        method: PUT,
        body: JSON.stringify({
          userId: user._id,
          storyId: parseInt(sid),
          comment: edit,
          date: new Date(),
          status: 0,
        }),
        headers: header,
      });
      setEditNo(0);
      setEdit("");
    }
  };
  const handleDelete = (id) => {
    setDeleteNo(1);
    fetch("http://localhost:9999/comments/" + id, {
      method: DELETE,
    });
  };
  const handleReply = (c) => {
    if (user._id) {
      toast.warning("Bạn cần phải đăng nhập để có thể bình luận!");
    } else if (reply.trim().length === 0) {
      toast.warning("Bạn chưa nhập nội dung!");
    } else {
      fetch("http://localhost:9999/replies", {
        method: POST,
        body: JSON.stringify({
          userId: user._id,
          reply: reply,
          commentId: c.id,
          date: new Date(),
          status: 0,
        }),
        headers: header,
      });
      setReply("");
      setReplyNo(0);
    }
  };
  const handleEditComment = (c) => {
    setEditNo(c.id);
    setEdit(commentValue.current.innerText);
  };
  const handleEditCommentReply = (id) => {
    setEditReplyNo(id);
    setEditReply(commentReplyValue.current.innerText);
  };
  const handleDeleteReply = (id) => {
    setDeleteNo(1);
    fetch("http://localhost:9999/replies/" + id, {
      method: DELETE,
    });
  };
  const handleEditReply = (reply) => {
    if (user._id) {
      toast.warning("Bạn cần phải đăng nhập để có thể bình luận!");
    } else if (editReply.trim().length === 0) {
      toast.warning("Bạn chưa nhập nội dung!");
    } else {
      fetch("http://localhost:9999/replies/" + reply._id, {
        method: PUT,
        body: JSON.stringify({
          userId: user._id,
          reply: editReply,
          commentId: reply.commentId,
          date: new Date(),
          status: 0,
        }),
        headers: header,
      });
      setEditReplyNo(0);
      setEditReply("");
    }
  };
  const handleReport = (c) => {
    fetch("http://localhost:9999/comments/" + c.id, {
      method: PUT,
      body: JSON.stringify({
        userId: c.userId,
        storyId: c.storyId,
        comment: c.comment,
        date: c.date,
        status: 1,
        id: 1,
      }),
      headers: header,
    });
    toast.success("Chúng tôi đã nhận được phán ánh của bạn!");
  };
  const handleReportReply = (reply) => {
    fetch("http://localhost:9999/replies/" + reply.id, {
      method: PUT,
      body: JSON.stringify({
        userId: reply.userId,
        reply: reply.reply,
        commentId: reply.commentId,
        date: reply.date,
        status: 1,
        id: 1,
      }),
      headers: header,
    });
    toast.success("Chúng tôi đã nhận được phán ánh của bạn!");
  };
  return (
    <Row className="pb-5 mb-5">
      <Col xs={12}>
        <h3 className="fw-normal text-info mt-2 pb-1 d-flex border-3 border-bottom border-info">
          <p className="ps-4 m-0">
            <Chat size={22} />
          </p>
          <p className="m-0 lh-base ms-1">Bình luận</p>
        </h3>
      </Col>
      <Col xs={12}>
        <Row className="d-flex justify-content-center">
          <Col xs={8}>
            <Form.Group>
              <Form.Control
                placeholder="Bình luận của bạn..."
                aria-label="Bình luận"
                value={comment}
                onChange={(e) => handleSetComment(e)}
              />
            </Form.Group>
          </Col>
          <Col xs={2}>
            <Button onClick={() => handleSend()} className="px-4">
              Gửi
            </Button>
          </Col>
        </Row>
      </Col>
      <Col xs={12}>
        <ul className="list-unstyled m-0 mt-4 p-0 ps-5">
          {newComment.map((c) => (
            <li key={c._id}>
              <Row>
                <Col xs={1}>
                  <img
                    className="rounded-5 border mw-100"
                    src={`${
                      typeof c.img === "undefined"
                        ? "https://cdn.landesa.org/wp-content/uploads/default-user-image.png"
                        : c.img
                    }`}
                    alt={c.username}
                  />
                </Col>
                <Col xs={11}>
                  <Row>
                    <Col xs={11}>
                      <Row className={"bg-grey pt-1 pb-2 rounded-4"}>
                        <Col xs={12}>
                          <p className="lh-sm m-0 fw-bold">{c.userName}</p>
                        </Col>
                        <Col xs={12}>
                          {editNo === c._id ? (
                            ""
                          ) : (
                            <p
                              className="m-0 lh-sm text-break"
                              ref={commentValue}
                            >
                              {c.comment}
                            </p>
                          )}
                          {editNo === c._id ? (
                            <Row>
                              <Col xs={9}>
                                <Form.Group>
                                  <Form.Control
                                    placeholder="Bình luận của bạn..."
                                    aria-label="Bình luận"
                                    value={edit}
                                    onChange={(e) => setEdit(e.target.value)}
                                  />
                                </Form.Group>
                              </Col>
                              <Col xs={2}>
                                <Button
                                  onClick={() => handleEdit(c)}
                                  className="px-4"
                                >
                                  Gửi
                                </Button>
                              </Col>
                            </Row>
                          ) : (
                            ""
                          )}
                        </Col>
                      </Row>
                    </Col>
                    <Col xs={12}>
                      <ul className="list-unstyled m-0 mt-1 mb-1 p-0 d-flex">
                        <li
                          onClick={() => setReplyNo(c._id)}
                          className="fs-10 text-info me-1 ms-1 custom-cursor"
                        >
                          Trả lời
                        </li>
                        {user._id !== c.userId ? (
                          <li
                            onClick={() => handleReport(c)}
                            className="fs-10 text-info me-1 ms-1 custom-cursor"
                          >
                            Báo cáo
                          </li>
                        ) : user._id === c.userId ? (
                          <>
                            <li
                              onClick={() => handleDelete(c.id)}
                              className="fs-10 text-info me-1 ms-1 custom-cursor"
                            >
                              Xóa
                            </li>
                            <li
                              onClick={() => handleEditComment(c)}
                              className="fs-10 text-info me-1 ms-1 custom-cursor"
                            >
                              Chỉnh sửa
                            </li>
                          </>
                        ) : (
                          ""
                        )}
                        <li className="color_grey fs-10 ms-1">
                          {CalTime(c.date)}
                        </li>
                      </ul>
                      {replyNo === c._id ? (
                        <Row>
                          <Col xs={9}>
                            <Form.Group>
                              <Form.Control
                                placeholder="Bình luận của bạn..."
                                aria-label="Bình luận"
                                value={reply}
                                onChange={(e) => setReply(e.target.value)}
                              />
                            </Form.Group>
                          </Col>
                          <Col xs={2}>
                            <Button
                              onClick={() => handleReply(c)}
                              className="px-4"
                            >
                              Gửi
                            </Button>
                          </Col>
                        </Row>
                      ) : (
                        ""
                      )}
                    </Col>
                    <Col xs={12}>
                      <Row>
                        <Col xs={12}>
                          <ul className="list-unstyled m-0 mt-1 p-0">
                            {c.replies.map((reply) => (
                              <li key={reply._id}>
                                <Row>
                                  <Col xs={1}>
                                    <img
                                      className="rounded-5 border mw-100"
                                      src={`${
                                        typeof c.img === "undefined"
                                          ? "https://cdn.landesa.org/wp-content/uploads/default-user-image.png"
                                          : c.img
                                      }`}
                                      alt={c.userName}
                                    />
                                  </Col>
                                  <Col xs={11}>
                                    <Row>
                                      <Col xs={11}>
                                        <Row
                                          className={
                                            "bg-grey pt-1 pb-2 rounded-4"
                                          }
                                        >
                                          <Col xs={12}>
                                            <p className="lh-sm m-0 fw-bold">
                                              {reply.userName}
                                            </p>
                                          </Col>
                                          <Col xs={12}>
                                            {editReplyNo === reply._id ? (
                                              ""
                                            ) : (
                                              <p
                                                className="m-0 lh-sm text-break"
                                                ref={commentReplyValue}
                                              >
                                                {reply.reply}
                                              </p>
                                            )}
                                            {editReplyNo === reply._id ? (
                                              <Row>
                                                <Col xs={9}>
                                                  <Form.Group>
                                                    <Form.Control
                                                      placeholder="Bình luận của bạn..."
                                                      aria-label="Bình luận"
                                                      value={editReply}
                                                      onChange={(e) =>
                                                        setEditReply(
                                                          e.target.value
                                                        )
                                                      }
                                                    />
                                                  </Form.Group>
                                                </Col>
                                                <Col xs={2}>
                                                  <Button
                                                    onClick={() =>
                                                      handleEditReply(reply)
                                                    }
                                                    className="px-4"
                                                  >
                                                    Gửi
                                                  </Button>
                                                </Col>
                                              </Row>
                                            ) : (
                                              ""
                                            )}
                                          </Col>
                                        </Row>
                                      </Col>
                                      <Col xs={12}>
                                        <ul className="list-unstyled m-0 mt-1 p-0 mb-1 d-flex">
                                          {user._id !== reply.userId ? (
                                            <li
                                              onClick={() =>
                                                handleReportReply(reply)
                                              }
                                              className="fs-10 text-info me-1 ms-1 custom-cursor"
                                            >
                                              Báo cáo
                                            </li>
                                          ) : user._id === reply.userId ? (
                                            <>
                                              <li
                                                onClick={() =>
                                                  handleDeleteReply(reply._id)
                                                }
                                                className="fs-10 text-info me-1 ms-1 custom-cursor"
                                              >
                                                Xóa
                                              </li>
                                              <li
                                                onClick={() =>
                                                  handleEditCommentReply(
                                                    reply._id
                                                  )
                                                }
                                                className="fs-10 text-info me-1 ms-1 custom-cursor"
                                              >
                                                Chỉnh sửa
                                              </li>
                                            </>
                                          ) : (
                                            ""
                                          )}
                                          <li className="color_grey fs-10 ms-1">
                                            {CalTime(reply.date)}
                                          </li>
                                        </ul>
                                      </Col>
                                    </Row>
                                  </Col>
                                </Row>
                              </li>
                            ))}
                          </ul>
                        </Col>
                      </Row>
                    </Col>
                  </Row>
                </Col>
              </Row>
            </li>
          ))}
        </ul>
      </Col>
    </Row>
  );
};

export default FormComment;
