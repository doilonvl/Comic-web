import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const ViewAllHistoryStories = () => {
  const navigate = useNavigate();
  const [historyContents, setHistoryContents] = useState([]);

  useEffect(() => {
    const chapterHistory =
      JSON.parse(localStorage.getItem("chapterHistory")) || [];
    if (chapterHistory.length > 0) {
      Promise.all(
        chapterHistory.map(({ storyId, chapterNo }) =>
          fetch(
            `http://localhost:9999/story/content/${storyId}/${chapterNo}`
          ).then((res) => res.json())
        )
      ).then((data) => {
        setHistoryContents(data);
      });
    }
  }, []);

  const imageStyle = {
    width: "150px", // Chỉ định chiều rộng cố định
    height: "190px", // Chỉ định chiều cao cố định
    objectFit: "cover", // Đảm bảo hình ảnh phủ đầy không gian mà không bị méo
    padding: "10px",
  };

  const cardStyle = {
    marginBottom: "20px",
    padding: "15px",
  };

  const cardBodyStyle = {
    padding: "10px",
  };

  return (
    <Row
      className={"border"}
      style={{
        width: "80%",
        marginLeft: "auto",
        marginRight: "auto",
        marginTop: "30px",
      }}
    >
      <Col className="mt-2 mb-3 pt-1 pb-1 border-bottom border-2 border-info">
        <h5>Toàn Bộ Truyện Đã Đọc</h5>
      </Col>
      {historyContents.map((content, index) => (
        <Row key={index} className={"pb-3"} style={cardStyle}>
          <Col
            xs={12}
            onClick={() =>
              navigate(
                `/get_story/${content.storyId}/chapter/${content.chapterNo}`
              )
            }
          >
            <Row style={{ width: "50%" }}>
              <Col xs={4}>
                <img
                  src={content.storyImage}
                  alt={content.storyName}
                  style={imageStyle}
                />
              </Col>
              <Col xs={8} style={cardBodyStyle}>
                <div>{content.storyName}</div>
                <div>
                  Chương {content.chapterNo}: {content.chapterName}
                </div>
              </Col>
            </Row>
          </Col>
        </Row>
      ))}
    </Row>
  );
};

export default ViewAllHistoryStories;
