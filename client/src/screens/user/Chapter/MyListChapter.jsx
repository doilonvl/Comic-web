import { Col, Row } from "react-bootstrap";
import { ArrowLeftCircle, Chat, PlusCircle } from "react-bootstrap-icons";
import { useDispatch } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ListChapter from "../../../components/author/listChapter/ListChapter";
import DefaultTemplate from "../../../templates/DefaultTemplate";
import axios from "axios";
import { BASE_URL } from "../../../components/common/utilities/initials";
import { fetchChapterSuccess } from "../../../components/common/data/dataChapter/dataSlice";

const MyListChapter = () => {
  const { sid } = useParams();
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
  const handleCreateChapter = () => {
    console.log("create chapter");
    axios
      .post(
        `${BASE_URL}/chapter`,
        { storyId: sid, name: "", chapterNo: 0, isActive: false },
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
    <DefaultTemplate>
      <Row>
        <Col xs={12} className="d-flex justify-content-between px-5">
          <div>
            <span>
              <Link to={`/author/mystory`}>
                <ArrowLeftCircle color="black" className="pb-1" size={22} />
              </Link>
            </span>
            <span>
              <Link to={`/author/mystory/${sid}/boxchat`}>
                <Chat color="black" className="pb-1" size={22} />
              </Link>
            </span>
          </div>
          <div>
            <span>
              <PlusCircle
                color={"black"}
                onClick={handleCreateChapter}
                className="pb-1"
                size={22}
              />
            </span>
          </div>
        </Col>
        <Col xs={12}>
          <ListChapter />
        </Col>
      </Row>
    </DefaultTemplate>
  );
};

export default MyListChapter;
