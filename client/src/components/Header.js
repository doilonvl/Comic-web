import React, { useState, useEffect, useRef } from "react";
import {
  Form,
  Container,
  Nav,
  Navbar,
  NavDropdown,
  Row,
  Col,
  Image,
} from "react-bootstrap";
import { EyeFill, HouseFill, Lightbulb } from "react-bootstrap-icons";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "./common/utilities/initials";
import UserContext from "../contexts/UserContext";
import { useContext } from "react";
import { ThemeContext } from "../contexts/ThemeContext";
import { setFilterCate } from "./common/data/dataCategory/dataSlice";
import { useDispatch, useSelector } from "react-redux";

const Header = () => {
  const navigate = useNavigate("");
  const dispatch = useDispatch();
  const componentRef = useRef(null);
  const [stories, setStories] = useState([]);
  const { toggleTheme, theme } = useContext(ThemeContext);
  const { filterCat } = useSelector((state) => state.listCategory);
  const [categories, setCategories] = useState([]);
  const [searchStory, setSearchStory] = useState("");
  const [user, setUser] = useState(null);
  const jwt = localStorage.getItem("token");
  const [activeKey, setActiveKey] = useState("/");
  const { user: contextUser, setUser: setContextUser } =
    useContext(UserContext);
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
  const lengthCat = Math.ceil(categories.length / 3);
  let countCat = 0;
  useEffect(() => {
    axios
      .get(`${BASE_URL}/categories/all_catergories`)
      .then((res) => setCategories(res.data));
  }, []);
  useEffect(() => {
    if (searchStory.length > 0)
      axios
        .get(`${BASE_URL}/story/search/${searchStory}`)
        .then((res) => setStories(res.data))
        .catch((err) => console.log(err));
  }, [searchStory]);
  useEffect(() => {
    if (jwt) {
      axios
        .get(`${BASE_URL}/users`, config)
        .then((res) => {
          setUser(res.data);
          setContextUser(res.data);
        })
        .catch((err) => console.log(err.message));
    }
  }, [jwt]);
  const handleLogout = () => {
    setUser(null);
    setContextUser(null);
    localStorage.removeItem("token");
    navigate("/");
  };
  const handleOnclickTop = (e, id) => {
    navigate(`/get_story/${id}`);
    setSearchStory("");
  };
  const handleSearchCat = (id) => {
    navigate(`/search`);
    dispatch(setFilterCate(id));
  };
  const handleNavHome = () => {
    dispatch(setFilterCate(""));
  };
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        componentRef.current &&
        !componentRef.current.contains(event.target)
      ) {
        setSearchStory("");
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);
  return (
    <div>
      <Container>
        <Row className="p-2">
          <Col xs={4}>
            <Row className="d-flex justify-content-center align-items-center">
              <Col>
                <Link to="/">
                  <img
                    width="30%"
                    fluid
                    src="https://res.cloudinary.com/dnzy2vddm/image/upload/v1710159093/ucmibn4gkzjbwujaj2xi.png"
                    alt="dozo-novelhub-logo"
                  />
                </Link>
              </Col>
            </Row>
          </Col>
          <Col xs={4} className="position-relative">
            <Form.Group className="d-flex">
              <Form.Control
                type="search"
                placeholder="Tìm kiếm truyện"
                className="me-2 square-input placeholder-color"
                aria-label="Search"
                value={searchStory}
                onChange={(e) => setSearchStory(e.target.value)}
              />
            </Form.Group>
            <ul
              ref={componentRef}
              style={{ zIndex: 100000 }}
              className={`list-unstyled m-0 p-0 position-absolute border form-control ${
                stories.length === 0 && "d-none"
              } ${searchStory.length === 0 && "d-none"}`}
            >
              {stories.map(
                (story, index) =>
                  index < 5 && (
                    <li className="px-3" key={story._id}>
                      <Row key={story._id} className={""}>
                        <Col xs={12}>
                          <Row
                            className={`pt-1 pb-1 ${
                              index < stories.length - 1 && "border-bottom"
                            }`}
                          >
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
                              <ul
                                className="top_container_detail p-0 m-0"
                                id="collasible-nav-dropdown"
                              >
                                <li
                                  onClick={(e) =>
                                    handleOnclickTop(e, story._id)
                                  }
                                  className="top_name_item pt-1 fw-bold"
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
                                          {story.viewCount}
                                        </span>
                                      </p>
                                    </Col>
                                  </Row>
                                </li>
                                <li className="top_name_item fw-bold text-info">
                                  {story.uploader.userName}
                                </li>
                                <li className="top_name_item">
                                  {story?.categories
                                    ?.map((c) => c.name)
                                    .join(", ")}
                                </li>
                              </ul>
                            </Col>
                          </Row>
                        </Col>
                      </Row>
                    </li>
                  )
              )}
            </ul>
          </Col>
          <Col xs={2} className="d-flex justify-content-end align-items-center">
            <Lightbulb
              onClick={toggleTheme}
              size={40}
              style={{ cursor: "pointer" }}
            />
          </Col>
          <Col xs={2} className="ml-auto">
            <Navbar collapseOnSelect expand="lg" className="">
              <Navbar.Collapse id="responsive-navbar-nav">
                {!user ? (
                  <Nav>
                    <Nav.Link
                      as={Link}
                      className="fw-bold light-grey"
                      to="/login"
                    >
                      Đăng nhập
                    </Nav.Link>
                    <Nav.Link
                      as={Link}
                      className="fw-bold light-grey"
                      eventKey={2}
                      to="/register"
                    >
                      Đăng ký
                    </Nav.Link>
                  </Nav>
                ) : (
                  <>
                    <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                    <NavDropdown
                      className="fw-bold"
                      title={
                        <>
                          <Image
                            className="rounded-2 me-1"
                            height={35}
                            src={
                              contextUser && contextUser.img === ""
                                ? "https://cdn.landesa.org/wp-content/uploads/default-user-image.png"
                                : contextUser && contextUser.img
                            }
                            alt={contextUser && contextUser.username}
                          />
                          <span>{user && user.username}</span>
                        </>
                      }
                      id="basic-nav-dropdown"
                    >
                      <NavDropdown.Item disabled>
                        <span
                          className="fw-bold"
                          style={{
                            color:
                              user &&
                              { 1: "black", 2: "orange", 3: "red" }[user.role],
                          }}
                        >
                          {user &&
                            { 1: "User", 2: "Uploader", 3: "Admin" }[user.role]}
                        </span>
                      </NavDropdown.Item>
                      <NavDropdown.Divider />
                      {user.role === 3 ? (
                        <NavDropdown.Item as={Link} to="/admin/dashboard">
                          Admin Dashboard
                        </NavDropdown.Item>
                      ) : (
                        ""
                      )}
                      <NavDropdown.Item as={Link} to="/profile">
                        Trang cá nhân
                      </NavDropdown.Item>
                      {user.role !== 3 && (
                        <NavDropdown.Item as={Link} to="/author/addstory">
                          Tạo truyện mới
                        </NavDropdown.Item>
                      )}
                      {user.role === 2 ? (
                        <NavDropdown.Item as={Link} to="/author/mystory">
                          Truyện của tôi
                        </NavDropdown.Item>
                      ) : (
                        ""
                      )}
                      <NavDropdown.Divider />
                      <NavDropdown.Item onClick={handleLogout}>
                        Logout
                      </NavDropdown.Item>
                    </NavDropdown>
                  </>
                )}
              </Navbar.Collapse>
            </Navbar>
          </Col>
        </Row>
      </Container>
      <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary-custom">
        <Container className="">
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav" className="gap-4">
            <Nav
              variant="underline"
              activeKey={activeKey}
              onSelect={setActiveKey}
              className="me-3"
            >
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/"
                  onClick={handleNavHome}
                  eventKey="/"
                  className={theme === "light" ? "light" : "dark"}
                >
                  <HouseFill className="pb-1" size={25} />
                  <span className="ms-1 mt-1 fw-bold">Trang Chủ</span>
                </Nav.Link>
              </Nav.Item>
              <Nav.Item>
                <Nav.Link
                  as={Link}
                  to="/search"
                  eventKey="/search"
                  className={theme === "light" ? "light" : "dark"}
                >
                  <span className="fw-bold">Tìm Truyện</span>
                </Nav.Link>
              </Nav.Item>
            </Nav>
            <Nav className="flex-1">
              <NavDropdown
                title="Thể loại"
                id="collasible-nav-dropdown"
                className="fw-bold"
              >
                <div className="m-0 p-0 header_dropdown_width d-flex flex-row justify-content-around">
                  {Array.from({ length: 3 }, (_, i) => {
                    let index = countCat;
                    return (
                      <div className={`d-flex flex-column`}>
                        {categories.map((category, j) => {
                          if (lengthCat + index > j && j >= index) {
                            countCat += 1;
                            return (
                              <div
                                key={category._id}
                                onClick={() => handleSearchCat(category._id)}
                                className={`p-1 fw-normal name_chapter  ${
                                  filterCat === category._id
                                    ? "fw-bold text-info"
                                    : ""
                                }`}
                              >
                                <Link
                                  to={"/"}
                                  className="text-decoration-none text-dark"
                                >
                                  {category.name}
                                </Link>{" "}
                              </div>
                            );
                          }
                          return false;
                        })}
                      </div>
                    );
                  })}
                </div>
              </NavDropdown>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </div>
  );
};

export default Header;
