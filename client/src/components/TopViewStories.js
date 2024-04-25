import { memo, useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { EyeFill } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import CountView from "./common/utilities/countView";
import axios from "axios";
import { BASE_URL } from "./common/utilities/initials";

const TopViewStories = () => {
  const navigate = useNavigate("");
  const [stories, setStories] = useState([]);
  useEffect(() => {
    axios
      .get(`${BASE_URL}/story/top_stories`)
      .then((res) => setStories(res.data));
  }, []);
  const handleOnclickTop = (e, id) => {
    navigate(`/get_story/${id}`);
  };

  return (
    <Row className={"border"}>
      <Col className="mt-2 mb-3 pt-1 pb-1 border-bottom border-2 border-info">
        <h5>Truyện Hàng Đầu</h5>
      </Col>
      <Col xs={12}>
        {stories.map((story, index) =>
          index <= 6 ? (
            <Row key={story._id} className={"pb-3"}>
              <Col xs={1} className={"container_top_number"}>
                <p className={`m-0 top_number top_number_${index + 1}`}>
                  0{index + 1}
                </p>
              </Col>
              <Col xs={11}>
                <Row>
                  <Col
                    xs={4}
                    className="top_container_img"
                    onClick={(e) => handleOnclickTop(e, story._id)}
                  >
                    <img
                      className="top_img_item"
                      src={story.image}
                      alt={story.name}
                    ></img>
                  </Col>
                  <Col xs={8}>
                    <ul className="top_container_detail p-0 m-0">
                      <li
                        onClick={(e) => handleOnclickTop(e, story._id)}
                        className="top_name_item pb-2 pt-1"
                      >
                        {story.name}
                      </li>
                      <li>
                        <Row>
                          <Col xs={7}>
                            <p className="m-0 top_chapter_item">
                              Chương {story.chapters}
                            </p>
                          </Col>
                          <Col xs={5}>
                            <p className="m-0 top_view_item d-flex">
                              <span className="m-0 me-1">
                                <EyeFill />
                              </span>
                              <span className="m-0">
                                {CountView(story.viewCount)}
                              </span>
                            </p>
                          </Col>
                        </Row>
                      </li>
                    </ul>
                  </Col>
                </Row>
              </Col>
            </Row>
          ) : (
            ""
          )
        )}
      </Col>
    </Row>
  );
};

export default memo(TopViewStories);
