import { useContext, useState } from "react";
import { Container, Row, Col, Figure, Nav, Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import UserContext from "../../contexts/UserContext";
import {
  BookmarkHeartFill,
  BoxArrowLeft,
  ChatLeftDots,
  ChevronDown,
  ChevronUp,
  InfoCircle,
  Kanban,
  ListUl,
  Speedometer,
} from "react-bootstrap-icons";
import StoryListAdmin from "./adminComponents/StoryListAdmin";
import CategoryManagement from "./adminComponents/CategoryManagement";
import UserManagement from "./adminComponents/UserManagement";

const AdminDetails = () => {
  const { user, setUser } = useContext(UserContext);
  const [isNavVisible, setNavVisible] = useState(false);
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
    <Container>
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
                  className={`hvr-sweep-to-right ${
                    activeTab === 0 ? "active" : ""
                  }`}
                  onClick={() => setActiveTab(0)}
                >
                  <a href="#">
                    <Kanban></Kanban> Quản lý truyện
                  </a>
                </li>
                <li
                  className={`hvr-sweep-to-right ${
                    activeTab === 1 ? "active" : ""
                  }`}
                  onClick={() => setActiveTab(1)}
                >
                  <a href="#">
                    <InfoCircle></InfoCircle> Quản lý thể loại
                  </a>
                </li>
                <li
                  className={`hvr-sweep-to-right ${
                    activeTab === 2 ? "active" : ""
                  }`}
                  onClick={() => setActiveTab(2)}
                >
                  <a href="#">
                    <BookmarkHeartFill></BookmarkHeartFill> Quản lý account
                  </a>
                </li>
              </ul>
            </Nav>
          )}
        </Col>
        <Col md={9} sm={8}>
          {activeTab === 0 && <StoryListAdmin />}
          {activeTab === 1 && <CategoryManagement />}
          {activeTab === 2 && <UserManagement />}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminDetails;
