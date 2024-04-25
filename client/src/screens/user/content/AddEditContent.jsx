import { useRef, useState, useEffect } from "react";
import { Button, Col, Row, Form, Container, Card } from "react-bootstrap";
import { ArrowLeftCircle } from "react-bootstrap-icons";
import { Link, useParams } from "react-router-dom";
import DefaultTemplate from "../../../templates/DefaultTemplate";
import axios from "axios";
import { BASE_URL } from "../../../components/common/utilities/initials";
import { toast } from "react-toastify";

const AddEditContent = () => {
  const { sid, cid } = useParams();
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);
  const [contentParagraphs, setContentParagraphs] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const inputRef = useRef();

  useEffect(() => {
    axios
      .get(`${BASE_URL}/chapterContent/${cid}`)
      .then((response) => {
        setContentParagraphs(response.data.paragraph || []);
      })
      .catch((error) => console.error("Failed to fetch content: ", error));
  }, [cid]);

  const handleOnChangeValue = (e) => {
    setValue(e.target.value);
  };

  const handleAddOrUpdate = () => {
    setLoading(true);
    let updatedParagraphs = [...contentParagraphs];

    if (editIndex !== null) {
      updatedParagraphs[editIndex] = value.trim();
    } else {
      updatedParagraphs.push(value.trim());
    }

    axios
      .put(`${BASE_URL}/chapterContent/${cid}`, {
        paragraph: updatedParagraphs,
      })
      .then(() => {
        setContentParagraphs(updatedParagraphs);
        setLoading(false);
        setEditIndex(null);
        toast.success(
          editIndex !== null
            ? "Nội dung truyện đã được cập nhật thành công!"
            : "Nội dung truyện đã được thêm thành công!"
        );
      })
      .catch((error) => {
        console.error("Error updating content:", error);
        setLoading(false);
        toast.error("Đã xảy ra lỗi trong quá trình cập nhật!.");
      });

    setValue("");
  };

  const handleDelete = () => {
    if (editIndex === null) {
      toast.warn("Vui lòng chọn một đoạn văn để xóa.");
      return;
    }

    setLoading(true);
    let updatedParagraphs = [
      ...contentParagraphs.slice(0, editIndex),
      ...contentParagraphs.slice(editIndex + 1),
    ];

    axios
      .put(`${BASE_URL}/chapterContent/${cid}`, {
        paragraph: updatedParagraphs,
      })
      .then(() => {
        setContentParagraphs(updatedParagraphs);
        setLoading(false);
        setEditIndex(null);
        toast.success("Đoạn văn đã được xóa thành công!");
      })
      .catch((error) => {
        console.error("Error deleting content:", error);
        setLoading(false);
        toast.error("Đã xảy ra lỗi trong quá trình xóa!.");
      });
  };

  const handleEdit = (index) => {
    setEditIndex(index);
    setValue(contentParagraphs[index]);
  };

  return (
    <DefaultTemplate>
      <Container>
        <Row className="d-flex justify-content-center">
          <Col xs={12} className="text-center mb-4">
            <Link to={`/author/mystory/listchapter/${sid}`}>
              <ArrowLeftCircle color="black" className="mt-3" size={28} />
            </Link>
          </Col>
          <Col xs={12} md={10} className="mb-4">
            <Card>
              <Card.Body>
                {contentParagraphs.map((paragraph, index) => (
                  <p
                    key={index}
                    onClick={() => handleEdit(index)}
                    style={{ cursor: "pointer" }}
                  >
                    {paragraph}
                  </p>
                ))}
              </Card.Body>
            </Card>
          </Col>
          <Col xs={12} md={10}>
            <Form>
              <Form.Group className="mb-3" controlId="formContent">
                <Form.Control
                  as="textarea"
                  onChange={handleOnChangeValue}
                  value={value}
                  placeholder="Nhập nội dung của bạn ở đây..."
                  style={{ height: "250px", resize: "none" }}
                />
              </Form.Group>
              <div className="d-flex justify-content-between">
                <Button
                  variant="primary"
                  disabled={value === "" || loading}
                  onClick={handleAddOrUpdate}
                >
                  {editIndex !== null ? "Cập nhật" : "Thêm mới"}
                </Button>
                {editIndex !== null && (
                  <Button
                    variant="danger"
                    disabled={loading}
                    onClick={handleDelete}
                  >
                    Xóa
                  </Button>
                )}
              </div>
            </Form>
          </Col>
        </Row>
      </Container>
    </DefaultTemplate>
  );
};

export default AddEditContent;
