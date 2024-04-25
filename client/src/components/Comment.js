import { useContext, useEffect, useState } from "react";
import {
  Container,
  InputGroup,
  Form,
  Button,
  ListGroup,
  Image,
  Pagination,
} from "react-bootstrap";
import { Chat } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import { fetchUserByToken } from "../api/user.js";
import { ThemeContext } from "../contexts/ThemeContext.js";

export default function Comment({
  sid,
  currentPage,
  setCurrentPage,
  highlightCommentId,
}) {
  const { theme } = useContext(ThemeContext);
  const [comments, setComments] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [commentCount, setCommentCount] = useState(0);

  useEffect(() => {
    async function getCommentsByStoryId(id, page) {
      try {
        const response = await fetch(
          `http://localhost:9999/comment/story/${id}?page=${page}&limit=5`
        );
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        setComments(data.comments);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error("There was a problem with your fetch operation:", error);
      }
    }
    getCommentsByStoryId(sid, currentPage);
  }, [sid, currentPage, commentCount]);

  async function commentHandler(e) {
    e.preventDefault();
    const fd = new FormData(e.target);
    const comment = Object.fromEntries(fd.entries());
    comment.storyId = sid;
    if(!comment.comment) return
    try {
      const token = localStorage.getItem("token");
      const user = await fetchUserByToken(token);
      if (!user || !user._id) {
        throw new Error("Invalid user data");
      }
      comment.userId = user._id;

      await createComment(comment);
      e.target.reset();
      setCommentCount((prev) => prev + 1); // Update to trigger re-fetch
    } catch (error) {
      console.error("Error posting comment:", error);
      toast.warn("Bạn cần đăng nhập để bình luận");
    }
  }

  async function createComment(comment) {
    try {
      const response = await fetch("http://localhost:9999/comment", {
        method: "POST",
        body: JSON.stringify(comment),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const resData = await response.json();
      return resData;
    } catch (error) {
      console.error("Error creating comment:", error);
      throw error; // Re-throw to be caught in commentHandler
    }
  }

  const handlePageChange = (pageNumber) => {
    if (pageNumber !== currentPage) {
      setCurrentPage(pageNumber);
    }
  };

  const handleItemClick = (clickedComment) => {
    setComments(
      comments.map((comment) =>
        comment._id === clickedComment._id
          ? { ...comment, clicked: true }
          : comment
      )
    );
  };

  return (
    <Container fluid className={`mb-5 ${theme}`}>
      <h3 className="fw-normal text-info mt-2 pb-1 d-flex border-3 border-bottom border-info">
        <p className="ps-4 m-0">
          <Chat size={22} />
        </p>
        <p className="m-0 lh-base ms-1">Bình luận</p>
      </h3>
      <Form onSubmit={commentHandler}>
        <InputGroup className="mb-3">
          <Form.Control
            className={`${theme}`}
            as="textarea"
            rows={2}
            name="comment"
            placeholder="Bình luận của bạn"
            style={{
              backgroundColor: theme === 'dark' ? '#374151' : '#fff',
              color: theme === 'dark' ? '#d1d3cd' : '#4b535e',
            }}
          />
          <Button type="submit" variant="outline-primary">
            Comment
          </Button>
        </InputGroup>
      </Form>
      <ListGroup>
        {comments.map((comment, index) => (
          <ListGroup.Item
            key={index}
            style={{
              backgroundColor: theme === 'dark' ? '#1e2937' : '#fff',
              color: theme === 'dark' ? '#d1d3cd' : '#4b535e',
              ...comment._id === highlightCommentId ? { backgroundColor: comment.clicked ? 'transparent' : 'aqua' } : {}
            }}
            // className={`${theme === 'dark' ? 'dark' : 'light'}`}
            onClick={() => handleItemClick(comment)}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                gap: "20px",
              }}
            >
              <Image
                src={comment.userId.img}
                style={{ height: "30px", width: "30px", objectFit: "cover" }}
                roundedCircle
              />
              <div style={{ flex: 1 }}>
                <strong>{comment.userId.userName}</strong>
                <p className="mb-0">{comment.comment}</p>
                {/* reply */}
              </div>
              {/* <Button variant="link" className="ps-0">Trả lời</Button> */}
            </div>
          </ListGroup.Item>
        ))}
      </ListGroup>
      <Pagination className="justify-content-center mt-2">
        {[...Array(totalPages).keys()].map((num) => (
          <Pagination.Item
            key={num + 1}
            active={num + 1 === currentPage}
            onClick={() => handlePageChange(num + 1)}
          >
            {num + 1}
          </Pagination.Item>
        ))}
      </Pagination>
    </Container>
  );
}
