import { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import CalTime from "./common/utilities/calTime";
import axios from "axios";

const SliderComponent = (sid) => {
  const [stories, setStories] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:9999/story/updated")
      .then((res) => setStories(res.data))
      .catch((err) => console.log(err));
  }, []);
  const settings = {
    autoplaySpeed: 2500,
    slidesToShow: stories.length < 5 ? stories.length : 5,
    slidesToScroll: 1,
    initialSlide: 1,
    arrows: true,
    cssEase: "linear",
    autoplay: true,
    pauseOnHover: true,
    infinite: true,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  console.log(stories);
  return (
    <Row className="pt-3 pb-2 d-flex justify-content-center">
      <Col xs={10} className="border-2 border-bottom border-info pb-4">
        <h4 className="text-info">Truyện đề cử</h4>
        <Slider {...settings}>
          {stories.map((story) => (
            <Card key={story._id} className="card_slider">
              <Card.Body className="body_card_slider position-relative overflow-hidden p-0">
                <Link to={`/get_story/${story._id}`}>
                  <Card.Img
                    className="img_card_slide border border-dark"
                    src={story.image}
                    alt={story.name}
                  />
                </Link>
                {story.chapters.map((chapter) => (
                  <ul
                    key={chapter._id}
                    className="m-0 p-0 pt-1 pb-1 bg-dark h-25 back_ground_opacity list-unstyled position-absolute bottom-0 start-0 end-0 ms-2 me-2"
                    style={{ zIndex: 99999 }}
                  >
                    <li className="text-center">
                      <h6 className="slider_list_item ps-1 pe-1 mb-1 text-white">
                        {story.name}
                      </h6>
                      <Link
                        to={`/detail/${story._id}/chapter/${chapter.chapterNo}`}
                        className="m-0 pe-2 text-decoration-none text-white chapter_list_view name_chapter"
                      >
                        Chương {chapter.chapterNo}
                        {chapter.name === "" ? "" : ` - ${chapter.name}`}
                      </Link>
                      <i className="m-0 time_update fw-lighter text-white chapter_list_view_time">
                        {CalTime(chapter.publishedDate)}
                      </i>
                    </li>
                  </ul>
                ))}
              </Card.Body>
            </Card>
          ))}
        </Slider>
      </Col>
    </Row>
  );
};

export default SliderComponent;
