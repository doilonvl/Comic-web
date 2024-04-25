import { useContext, useEffect, useState } from "react";
import { useParams, useLocation } from "react-router-dom";
import { Button, Col, Row } from "react-bootstrap";
import {
  ExclamationCircleFill,
  EyeFill,
  PersonFill,
  RssFill,
} from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import FormRate from "./FormRate";
import SplitNumber from "./common/utilities/SplitNumber";
import time from "./time";
import FormComment from "./FormComment";
import { DELETE, header, POST, PUT } from "./common/utilities/type";
import category from "./common/utilities/category";
import userLogedIn from "./user/userLogedIn";
import { useDispatch, useSelector } from "react-redux";
import rateAvg from "./common/utilities/rateAvg";
import {
  fetchChapterSuccess,
  setChapterNo,
} from "./common/data/dataChapter/dataSlice";
import ListChapter from "./common/listChapter/ListChapter";
import { fetchCategorySuccess } from "./common/data/dataCategory/dataSlice";
import Comment from "./Comment";
import Rate from "./Rate";
import { fetchStoryById, fetchCategoriesByStoryId } from '../api/story.js'
import { fetchRateInfo } from '../api/rate.js'
import { fetchPageByCommentId } from '../api/comment.js'
import { formatDateAndTime } from '../util.js'
import { ThemeContext } from '../contexts/ThemeContext.js'
import UserContext from "../contexts/UserContext";
import axios from "axios";
const StoryDetail = () => {
  const location = useLocation();
  const commentIdFromHash = location.hash ? location.hash.slice(1) : null;

  const { sid } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate("");
  const [story, setStory] = useState({});
  const [rateInfo, setRateInfo] = useState({ average: 0, count: 0 });
  const [followQuantity, setFollowQuantity] = useState([]);
  const [followStory, setFollowStory] = useState({});
  const [followStatus, setFollowStatus] = useState(0);
  const chapteres = useSelector((state) => state.listChapter.data);
  const { user } = useContext(UserContext);
  const { theme } = useContext(ThemeContext)
  const jwt = localStorage.getItem("token");
  const [update, setUpdate] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [storyCategories, setStoryCategories] = useState([]);

  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
  useEffect(() => {
    async function getRateInfo(storyId) {
      const info = await fetchRateInfo(storyId);
      setRateInfo(info);
    }
    getRateInfo(sid);
  }, [sid, update]);

  useEffect(() => {
    fetch("http://localhost:9999/categories/all_catergories")
      .then((res) => res.json())
      .then((data) => dispatch(fetchCategorySuccess(data)));
  }, [dispatch]);
  useEffect(() => {
    fetch(`http://localhost:9999/story/chapters/${sid}`)
      .then((res) => res.json())
      .then((data) => dispatch(fetchChapterSuccess(data)));
  }, [dispatch, sid]);
  useEffect(() => {
    async function getStoryById(id) {
      try {
        const fetchStory = await fetchStoryById(id);
        setStory(fetchStory);
      } catch (error) {
        toast.error("Không thể lấy dữ liệu truyện");
      }
    }
    getStoryById(sid);
  }, [sid]);

  useEffect(() => {
    axios
      .get("http://localhost:9999/story/follow_story/" + sid)
      .then((response) => {
        const data = response.data;
        setFollowQuantity(data.filter((d) => d.storyId === sid));
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [followStatus, sid]);
  useEffect(() => {
    if (user !== null) {
      axios
        .get(`http://localhost:9999/story/follows`, config)
        .then((response) => {
          const data = response.data;
          setFollowStory(
            data.find((d) => d.userId === user._id && d.storyId._id === sid)
          );
        })
        .catch((error) => {
          console.error("Error fetching data:", error);
        });
    }
  }, [followStatus, sid, user]);

  useEffect(() => {
    const fetchStoryDetails = async () => {
      const storyResponse = await fetch(
        `http://localhost:9999/story/get_story/${sid}`
      );
      if (storyResponse.ok) {
        const storyData = await storyResponse.json();
        setStory(storyData);
      }
    };

    fetchStoryDetails();
  }, [sid]);

  useEffect(() => {
    const fetchPageNumber = async () => {
      if (commentIdFromHash) {
        try {
          const response = await fetchPageByCommentId(commentIdFromHash);
          if (response.page) {
            setCurrentPage(response.page);
          }
        } catch (error) {
          console.error("Error fetching page number:", error);
        }
      }
    };

    fetchPageNumber();
  }, [commentIdFromHash]);

  useEffect(() => {
    async function getCategoriesByStoryId(storyId) {
      const categories = await fetchCategoriesByStoryId(storyId);
      setStoryCategories(categories);
    }
    getCategoriesByStoryId(sid);
  }, [sid]);

  const readFromStart = () => {
    if (chapteres.length === 0) {
      toast.warning('Truyện chưa có chapter')
      return
    }
    const firstChapter = chapteres.reduce((prev, current) =>
      prev.chapterNo < current.chapterNo ? prev : current
    );

    if (!firstChapter) {
      console.error("Không tìm thấy chương đầu tiên.");
      return;
    }

    navigate(`/get_story/${sid}/chapter/${firstChapter.chapterNo}`);
    dispatch(setChapterNo(firstChapter.chapterNo));
    updateChapterHistory(sid, firstChapter._id, firstChapter.chapterNo);
  };

  const readLatestChapter = () => {
    if (chapteres.length === 0) {
      toast.warning('Truyện chưa có chapter')
      return
    }
    const latestChapter = chapteres.reduce((prev, current) =>
      prev.chapterNo > current.chapterNo ? prev : current
    );

    if (!latestChapter) {
      console.error("Không tìm thấy chương mới nhất.");
      return;
    }

    navigate(`/get_story/${sid}/chapter/${latestChapter.chapterNo}`);
    dispatch(setChapterNo(latestChapter.chapterNo));
    updateChapterHistory(sid, latestChapter._id, latestChapter.chapterNo);
  };

  const updateChapterHistory = (storyId, chapterId, chapterNo) => {
    let chapterHistory =
      JSON.parse(localStorage.getItem("chapterHistory")) || [];

    const existingIndex = chapterHistory.findIndex(
      (item) => item.storyId === storyId
    );
    if (existingIndex !== -1) {
      chapterHistory[existingIndex] = { storyId, chapterId, chapterNo };
    } else {
      chapterHistory.push({ storyId, chapterId, chapterNo });
    }

    localStorage.setItem("chapterHistory", JSON.stringify(chapterHistory));
  };

  const handleFollow = (e) => {
    if (user === null) {
      navigate("/login");
    } else {
      setFollowStatus(parseInt(e.target.value) ? 0 : 1);
      const follower = {
        storyId: sid,
        userId: user._id,
      };

      if (e.target.innerText === "Theo dõi") {
        axios
          .post("http://localhost:9999/story/follow/" + sid, follower, config)
          .then(() => {
            toast.success(
              `Bạn đã theo dõi truyện ${story.name}. Chúng tôi sẽ gửi thông báo cho bạn khi truyện cập nhật`
            );
          })
          .catch((error) => {
            console.error("Error following story:", error);
          });
      } else {
        axios
          .post("http://localhost:9999/story/unfollow/" + sid, follower, config)
          .then(() => {
            toast.error(
              `Bạn đã hủy theo dõi truyện ${story.name}. Bạn sẽ không nhận thông báo từ chúng tôi nữa`
            );
          })
          .catch((error) => {
            console.error("Error unfollowing story:", error);
          });
      }
    }
  };
  function handleUpdate() {
    setUpdate(!update);
  }

  return (
    <Row className={`${theme}`}>
      <Col xs={12} className="text-center">
        <h3>{story.name}</h3>
        <p
        >
          [Cập nhật lúc {formatDateAndTime(story.updatedAt)}]
        </p>
      </Col>
      <Col xs={12}>
        <Row>
          <Col xs={4} className="d-flex justify-content-end">
            <img
              className="img_detail border border-dark"
              src={story?.image}
              alt={story.name}
            />
          </Col>
          <Col xs={8} className="d-flex justify-content-start">
            <ul className="">
              <li className="d-flex">
                <p className="m-0">
                  <PersonFill size={24} />
                </p>
                <p className="story_detail_item m-0">
                  <strong>Tác giả:</strong> {story.uploader?.userName}</p>

              </li>
              <li className="d-flex ">
                <p className="m-0">
                  <ExclamationCircleFill size={24} />
                </p>
                <p className="story_detail_item m-0">
                  <strong>Tình Trạng:</strong> {story.status}
                </p>
              </li>
              <li className="d-flex ">
                <p className="m-0">
                  <RssFill size={24} />
                </p>
                <p className="story_detail_item m-0"><strong>Thể loại:</strong> {storyCategories.map(link => link.categoryId?.name).join(', ')}</p>
              </li>
              <li className="d-flex ">
                <p className="m-0">
                  <EyeFill size={24} />
                </p>
                <p className="story_detail_item m-0"><strong>Lượt xem:</strong> {SplitNumber(parseInt(story.viewCount))}</p>
              </li>
              <li className="d-flex ">
                <p className="story_detail_item m-0 ps-0 text-primary">
                  {/* {story.name} */}
                  <small className="story_detail_item m-0 ps-0">
                    Xếp hạng: {!isNaN(rateInfo.average) ? rateInfo.average : 0}
                    /5 sao với {rateInfo.count} Lượt đánh giá.
                  </small>
                </p>
              </li>
              <li className="d-flex ">
                {/* <FormRate sid={sid} onchangeRateNo={getRateNo} story={story} /> */}
                <Rate sid={sid} update={handleUpdate} />
              </li>
              <li className="d-flex ">
                {story?.uploader?._id === user?._id ? (
                  ""
                ) : (
                  <Button
                    onClick={(e) => handleFollow(e)}
                    value={followStatus}
                    className={`m-0 p-0 px-3 pt-1 pb-1                                                                                                                                         mb-2 btn-danger`}
                  >
                    {typeof followStory !== "undefined"
                      ? Object.keys(followStory).length === 0
                        ? "Theo dõi"
                        : "Bỏ theo dõi"
                      : "Theo dõi"}
                  </Button>
                )}
                <p className="story_detail_item m-0">{SplitNumber(followQuantity.length)} người Đã Theo Dõi</p>
              </li>
              <li className="d-flex ">
                <p>
                  <Button
                    onClick={(e) => readFromStart(e)}
                    className="bg-warning border-0 me-2"
                  >
                    Đọc từ đầu
                  </Button>
                  <Button
                    onClick={(e) => readLatestChapter(e, story)}
                    className="bg-warning border-0 ms-2"
                  >
                    Đọc mới nhất
                  </Button>
                </p>
              </li>
            </ul>
          </Col>
          <Col xs={12}>
            <Row className="d-flex justify-content-end">
              <Col xs={12} className={""}>
                <div className="fw-normal mt-2 pb-1 d-flex border-1 border-top border-info">
                  <p>{story.description}</p>
                </div>
              </Col>
            </Row>
          </Col>
          <Col xs={12}>
            <Row>
              <ListChapter />
            </Row>
          </Col>
        </Row>
        <Row>
          <Col xs={12}>
            {/* <FormComment sid={sid} /> */}
            {/* comment */}
            <Comment
              sid={sid}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              highlightCommentId={commentIdFromHash}
            />
          </Col>
        </Row>
      </Col>
    </Row>
  );
};

export default StoryDetail;
