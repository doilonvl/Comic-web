import { Button, Col, Container, Form, Image, InputGroup, Row } from "react-bootstrap";
import "../UserDetails.css";
import { Upload } from "react-bootstrap-icons";
import { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../common/utilities/initials";

const ProfileDetail = ({ user, setUser }) => {
  const [username, setUsername] = useState(user.userName);
  const [email, setEmail] = useState(user.email);
  const [phoneNumber, setPhoneNumber] = useState(user.phoneNumber);
  const [image, setImage] = useState(user.img);
  const [imagePreviewUrl, setImagePreviewUrl] = useState(null);
  const token = localStorage.getItem("token");

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhoneNumberChange = (event) => {
    setPhoneNumber(event.target.value);
  };

  const handleUpload = (event) => {
    const file = event.target.files[0];
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("File is too large. Please select a file smaller than 2MB.");
      return;
    }
    setImage(file);

    const imageUrl = URL.createObjectURL(file);
    setImagePreviewUrl(imageUrl);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const updatedUser = {
        userName: username,
        email: email,
        phoneNumber: phoneNumber,
      };

      if (image) {
        const formData = new FormData();
        formData.append("image", image);
        const response = await axios.post(
          `${BASE_URL}/users/upload`,
          formData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        updatedUser.image = response.data.image;
      }

      const updateResponse = await axios.put(
        `${BASE_URL}/users/update`,
        updatedUser,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setUser(updateResponse.data);
    } catch (error) {
      console.error("Error:", error);
    }
  };
  return (
    <Container className="user-page clearfix">
      <h1 className="postname">Thông tin tài khoản</h1>
      <div className="account-info clearfix">
        <h2 className="posttitle">Cập nhật thông tin tài khoản</h2>
        <Form onSubmit={handleSubmit}>
          <Row>
            <InputGroup className="mb-3">
              <InputGroup.Text id="basic-addon3">
                Username
              </InputGroup.Text>
              <Form.Control type="text"
                placeholder="Enter username"
                value={username}
                onChange={handleUsernameChange} />
            </InputGroup>
          </Row>
          <Row>
            <InputGroup className="mb-3">
              <InputGroup.Text>
                Email
              </InputGroup.Text>
              <Form.Control type="email"
                placeholder="Enter email"
                value={email}
                onChange={handleEmailChange} />
            </InputGroup>
          </Row>
          <Row>
            <InputGroup className="mb-3">
              <InputGroup.Text>
                Số điện thoại
              </InputGroup.Text>
              <Form.Control type="text"
                placeholder="Enter phoneNumber"
                value={phoneNumber}
                onChange={handlePhoneNumberChange}
                disabled
              />
            </InputGroup>
            <Row>
              <Form.Group controlId="custom-file" className="mb-3">
              <InputGroup.Text>
                Avatar
              </InputGroup.Text>
                <Form.Group>
                  <Image
                    src={imagePreviewUrl || image}
                    alt="Current Avatar"
                    rounded
                    className="mb-3"
                  />
                  <div className="custom-file">
                    <Form.Control
                      type="file"
                      hidden
                      id="custom-file"
                      accept="image/jpeg, image/png"
                      onChange={handleUpload}
                    />
                    <label className="custom-file-label" htmlFor="custom-file">
                      Upload ảnh <Upload></Upload>
                    </label>
                  </div>
                  <div>
                    <Form.Text className="text-muted">
                      Only JPEG and PNG images less than 2MB are accepted.
                    </Form.Text>
                  </div>
                  <div>
                    <Form.Text className="text-danger">
                      Inapporiate images will be banned forever.
                    </Form.Text>
                  </div>
                </Form.Group>
              </Form.Group>
            </Row>
          </Row>
          <Button type="submit">Update</Button>
        </Form>
      </div>
    </Container>
  );
};

export default ProfileDetail;
