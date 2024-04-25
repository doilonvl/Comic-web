import {
  Button,
  Card,
  Dropdown,
  Form,
  FormControl,
  InputGroup,
  Modal,
  Row,
  Spinner,
  Table,
} from "react-bootstrap";
import { BASE_URL } from "../../common/utilities/initials";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

const StoryListAdmin = () => {
  const [showModal, setShowModal] = useState(false);
  const [showProfanityDetailModal, setShowProfanityDetailModal] =
    useState(false);
  const [currentStory, setCurrentStory] = useState(null);
  const [stories, setStories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("inactive");
  const [searchQuery, setSearchQuery] = useState("");
  const jwt = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
  useEffect(() => {
    const fetchStories = async () => {
      setIsLoading(true);
      const url = `${BASE_URL}/story/get_stories_by_status?status=${filter}&search=${searchQuery}`;
      const res = await axios.get(url, config);
      setStories(res.data);
      setIsLoading(false);
    };
    fetchStories();
  }, [filter, searchQuery]);

  const handleStatusChange = async (id, status) => {
    try {
      await axios.patch(`${BASE_URL}/story/${id}/status`, { status }, config);
      const url = `${BASE_URL}/story/get_stories_by_status?status=${filter}&search=${searchQuery}`;
      const res = await axios.get(url, config);
      setStories(res.data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleShowModal = (story) => {
    setCurrentStory(story);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setCurrentStory(null);
    setShowModal(false);
  };

  const handleOpenDetailModal = () => {
    setShowProfanityDetailModal(true);
  };

  const handleCloseDetailModal = () => {
    setShowProfanityDetailModal(false);
  };

  return (
    <Card className="mb-3">
      <Card.Header
        style={{
          color: "black",
          fontSize: "1.5em",
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        QUẢN LÝ TRUYỆN
      </Card.Header>
      <Card.Body>
        <Form inline className="justify-content-end">
          <InputGroup>
            <FormControl
              type="text"
              placeholder="Search"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Dropdown onSelect={(e) => setFilter(e)}>
              <Dropdown.Toggle
                id="dropdown-basic"
                variant={filter !== "active" ? "success" : "danger"}
              >
                {filter === "active" ? "Deactive" : "Active"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item eventKey="inactive">Active</Dropdown.Item>
                <Dropdown.Item eventKey="active">Deactive</Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </InputGroup>
        </Form>
        <Table striped bordered hover>
          <thead>
            <tr>
              <th style={{ width: "5%", textAlign: "center" }}>#</th>
              <th style={{ width: "10%" }}>Cover</th>
              <th style={{ width: "40%" }}>Title</th>
              <th style={{ width: "10%" }}>Uploader</th>
              <th style={{ width: "25%" }}>Actions</th>
              <th style={{ width: "15%" }}>Profanity Status</th>
            </tr>
          </thead>
          {isLoading ? (
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Spinner animation="border" role="status"></Spinner>
            </div>
          ) : (
            <tbody>
              {stories.map((story, index) => (
                <tr key={story._id}>
                  <td className="text-center">{index + 1}</td>
                  <td>
                    <img
                      src={story.image}
                      alt={story.name}
                      style={{ width: "100px", height: "auto" }}
                    />
                  </td>
                  <td>{story.name}</td>
                  <td>{story.uploader?.userName}</td>
                  <td>
                    {filter === "active" ? (
                      <Button
                        variant="danger"
                        onClick={() =>
                          handleStatusChange(story._id, "inactive")
                        }
                      >
                        Deactivate
                      </Button>
                    ) : (
                      <Button
                        variant="success"
                        onClick={() => handleStatusChange(story._id, "active")}
                      >
                        Activate
                      </Button>
                    )}
                    <Link to={`/get_story/${story._id}`} className="ms-3">
                      Review
                    </Link>
                  </td>
                  <td
                    style={{
                      color: story.containsProfanity ? "red" : "green",
                      cursor: "pointer",
                      fontWeight: "bold",
                    }}
                    onClick={() => handleShowModal(story)}
                  >
                    {story.containsProfanity
                      ? "Contains Profanity"
                      : "No Profanity"}
                  </td>
                </tr>
              ))}
            </tbody>
          )}
        </Table>
        <Modal show={showModal} onHide={handleCloseModal} centered>
          <Modal.Header closeButton>
            <Modal.Title>Profanity Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {currentStory && currentStory.containsProfanity
              ? `Profane words: ${currentStory.profaneWords.join(", ")}`
              : "No profanity in this story."}
          </Modal.Body>
          <Modal.Footer>
            {currentStory && currentStory.containsProfanity && (
              <Button onClick={handleOpenDetailModal}>Show More Details</Button>
            )}
            <Button variant="secondary" onClick={handleCloseModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal
          show={showProfanityDetailModal}
          onHide={handleCloseDetailModal}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Profanity Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {currentStory && (
              <>
                <h5>Profanity in Name:</h5>
                <p>{currentStory.profanityDetails.inName.join(", ")}</p>
                <h5>Profanity in Chapters:</h5>
                {currentStory.profanityDetails.inChapters.map(
                  (chapter, index) => (
                    <div key={index}>
                      {console.log(chapter)}
                      <h6>Chapter {chapter.chapterNo}:</h6>
                      <p>{chapter.profaneWords.join(", ")}</p>
                    </div>
                  )
                )}
              </>
            )}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleCloseDetailModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
      </Card.Body>
    </Card>
  );
};

export default StoryListAdmin;
