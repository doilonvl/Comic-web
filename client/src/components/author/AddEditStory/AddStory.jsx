import { useEffect, useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import Row from "react-bootstrap/Row";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "./storySlice";
import DefaultTemplate from "../../../templates/DefaultTemplate";
import * as Yup from "yup";
import axios from "axios";
import { BASE_URL } from "../../common/utilities/initials";
import { useNavigate } from "react-router-dom";

const animatedComponents = makeAnimated();
const AddStory = () => {
  const { categories } = useSelector((state) => state.story);
  const [categoriesChoice, setCategoriesChoice] = useState([]);
  const [user, setUser] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formValues = {
    name: "",
    description: "",
    image: "",
    viewCount: 0,
    isActive: false,
  };
  const jwt = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
  useEffect(() => {
    axios
      .get(`${BASE_URL}/categories/all_catergories`, config)
      .then((res) => dispatch(setCategories(res.data)))
      .catch((e) => console.log(e.message));
    axios
      .get(`${BASE_URL}/users`, config)
      .then((res) => setUser(res.data))
      .catch((err) => console.log(err.message));
  }, []);
  const handleSubmit = async (values) => {
    const formData = new FormData();
    formData.append("image", selectedFile);

    try {
      const uploadResponse = await axios.post(
        `${BASE_URL}/story/upload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${jwt}`,
          },
        }
      );
      if (uploadResponse.status === 200) {
        const storyResponse = await axios.post(
          `${BASE_URL}/story/create_story`,
          {
            ...values,
            uploader: user._id,
            categories: categoriesChoice,
            image: uploadResponse.data,
            isActive: false,
          },
          config
        );

        if (storyResponse.status === 201) {
          navigate("/");
        }
      }
    } catch (e) {
      console.log(e.message);
    }
  };
  const initialValues = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập tên"),
    description: Yup.string().required("Vui lòng nhập mô tả"),
  });

  const handleStoryImageUpload = async (event) => {
    const file = event.target.files[0];
    const maxSize = 2 * 1024 * 1024;
    if (file.size > maxSize) {
      alert("File is too large. Please select a file smaller than 2MB.");
      return;
    }
    setSelectedFile(file);
  };

  return (
    <DefaultTemplate>
      <Row className="justify-content-center">
        <Col xs={5}>
          <Formik
            initialValues={formValues}
            onSubmit={(values) => {
              handleSubmit(values);
            }}
            validationSchema={initialValues}
          >
            {({ errors, touched, handleChange, handleBlur }) => (
              <Form className="d-flex flex-column gap-3">
                <div>
                  <label>Tên truyện</label>
                  <Field
                    type="text"
                    name="name"
                    className={`${
                      touched.name && errors.name ? "error" : ""
                    } form-control`}
                    id="name"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                <div>
                  <label>Mô tả truyện</label>
                  <Field
                    as="textarea" rows={3}
                    name="description"
                    className={`${
                      touched.description && errors.description ? "error" : ""
                    } form-control`}
                    id="description"
                    fullWidth
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="lg_error_message"
                  />
                </div>
                <div>
                  <label>Upload Story Image</label>
                  <input
                    type="file"
                    name="image"
                    className={`form-control`}
                    id="image"
                    accept="image/jpeg, image/png"
                    fullWidth
                    onChange={(e) => handleStoryImageUpload(e)}
                  />
                </div>
                <div>
                  <label>Thể loại truyện</label>
                  <Field
                    component={Select}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    options={categories.map((category) => ({
                      value: category._id,
                      label: category.name,
                    }))}
                    onChange={(selectedOptions) =>
                      setCategoriesChoice(selectedOptions)
                    }
                  />
                </div>
                <Button
                  style={{ background: "#1A73E8", marginTop: 16 }}
                  type="submit"
                  className="btn-sbm pointer"
                  sx={{
                    fontSize: "16px",
                    color: "#FFFFFF",
                  }}
                >
                  Tạo
                </Button>
              </Form>
            )}
          </Formik>
        </Col>
      </Row>
    </DefaultTemplate>
  );
};

export default AddStory;
