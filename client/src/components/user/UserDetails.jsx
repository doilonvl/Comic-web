import React, { useContext, useState } from "react";
import { Container, Row, Col, Figure, Nav, Spinner } from "react-bootstrap";
import "./UserDetails.css";
import {
  BookmarkHeartFill,
  BoxArrowLeft,
  ChatLeftDots,
  ChevronDown,
  ChevronUp,
  InfoCircle,
  ListUl,
  Speedometer,
} from "react-bootstrap-icons";
import CommonDetail from "./userProfileComponent/CommonDetail";
import FollowListDetail from "./userProfileComponent/FollowListDetail";
import CommentDetail from "./userProfileComponent/CommentDetail";
import ProfileDetail from "./userProfileComponent/ProfileDetail";
import UserContext from "../../contexts/UserContext";
import { Link, useNavigate } from "react-router-dom";
import ListSotry from "../author/myListStory/ListStory";

const UserDetails = () => {
  const { user, setUser } = useContext(UserContext);
  const [isNavVisible, setNavVisible] = useState(true);
  const [activeTab, setActiveTab] = useState(0);
  const navigate = useNavigate();

  if (!user) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
        <Spinner animation="border" role="status" />
      </div>
    );
  }

  return (
    <Container className="mt-3">
      <Row>
        <Col md={3} sm={4}>
          <section className="user-sidebar">
            <div className="userinfo clearfix">
              <Figure
                className="figure-container"
                onClick={() => setNavVisible(!isNavVisible)}
              >
                <Figure.Image
                  className="avatar user-name"
                  width={80}
                  alt="avatar"
                  src={user.img}
                />
                <Figure.Caption>
                  <div className="title">Tài khoản của</div>
                  <div className="user-name">{user.userName}</div>
                </Figure.Caption>
              </Figure>
              <div
                className="chevron-up"
                onClick={() => setNavVisible(!isNavVisible)}
              >
                {isNavVisible ? <ChevronDown /> : <ChevronUp />}
              </div>
            </div>
          </section>
          {isNavVisible && (
            <Nav className="user-sidelink clearfix">
              <ul className="p-0">
                <li
                  className={`hvr-sweep-to-right ${activeTab === 0 ? "active" : ""
                    }`}
                  onClick={() => setActiveTab(0)}
                >
                  <Link>
                    <Speedometer></Speedometer> Thông tin chung
                  </Link>
                </li>
                <li
                  className={`hvr-sweep-to-right ${activeTab === 1 ? "active" : ""
                    }`}
                  onClick={() => setActiveTab(1)}
                >
                  <Link>
                    <InfoCircle></InfoCircle> Thông tin tài khoản
                  </Link>
                </li>
                <li
                  className={`hvr-sweep-to-right ${activeTab === 2 ? "active" : ""
                    }`}
                  onClick={() => setActiveTab(2)}
                >
                  <Link>
                    <BookmarkHeartFill></BookmarkHeartFill> Truyện theo dõi
                  </Link>
                </li>
                <li
                  className={`hvr-sweep-to-right ${activeTab === 3 ? "active" : ""
                    }`}
                  onClick={() => setActiveTab(3)}
                >
                  <Link>
                    <ChatLeftDots></ChatLeftDots> Bình luận
                  </Link>
                </li>
                <li
                  className={`hvr-sweep-to-right ${activeTab === 4 ? "active" : ""
                    }`}
                  onClick={() => setActiveTab(4)}
                >
                  <Link>
                    <ListUl></ListUl> Truyện đã đăng
                  </Link>
                </li>
                <li
                  className={`hvr-sweep-to-right ${activeTab === 5 ? "active" : ""
                    }`}
                  onClick={() => {
                    setUser(null);
                    localStorage.removeItem("token");
                    navigate("/");
                  }}
                >
                  <a href="/">
                    <BoxArrowLeft></BoxArrowLeft> Đăng xuất
                  </a>
                </li>
              </ul>
            </Nav>
          )}
        </Col>
        <Col md={9} sm={8}>
          {activeTab === 0 && (
            <CommonDetail setActiveTab={setActiveTab} user={user} />
          )}
          {activeTab === 1 && <ProfileDetail user={user} setUser={setUser} />}
          {activeTab === 2 && <FollowListDetail />}
          {activeTab === 3 && <CommentDetail />}
          {activeTab === 4 && <ListSotry />}
        </Col>
      </Row>
    </Container>
  );
};

export default UserDetails;
