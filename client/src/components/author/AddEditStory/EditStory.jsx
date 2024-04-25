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
import { useParams } from "react-router-dom";
import { FormLabel } from "react-bootstrap";
// import "./Add.css";
const animatedComponents = makeAnimated();
const EditStory = () => {
  const { categories } = useSelector((state) => state.story);
  const { sid } = useParams();
  const [storyCategories, setStoryCategories] = useState([]);
  const [formValues, setFormValues] = useState({
    name: "a",
    description: "a",
    image: "a",
  });
  const dispatch = useDispatch();
  const jwt = localStorage.getItem("token");
  const config = {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwt}`,
    },
  };
  useEffect(() => {
    axios
      .get(`${BASE_URL}/story/get_story/${sid}`, config)
      .then((res) => setFormValues(res.data))
      .catch((err) => console.log(err.message));
    axios
      .get(`${BASE_URL}/story_categories/all_story_catergories/${sid}`, config)
      .then((res) =>
        setStoryCategories(
          res.data.map((c) => ({
            value: c.categoryId._id,
            label: c.categoryId.name,
          }))
        )
      )
      .catch((err) => console.log(err.message));
    axios
      .get(`${BASE_URL}/categories/all_catergories`, config)
      .then((res) =>
        dispatch(
          setCategories(
            res.data.map((c) => ({
              value: c._id,
              label: c.name,
            }))
          )
        )
      )
      .catch((e) => console.log(e.message));
  }, [dispatch, sid]);
  const handleSubmit = () => {
    axios
      .put(
        `${BASE_URL}/story/update_story/${sid}`,
        {
          ...formValues,
          categories: storyCategories,
        },
        config
      )
      .catch((e) => console.log(e.message));
  };
  const initialValues = Yup.object().shape({
    name: Yup.string().required("Vui lòng nhập tên"),
    description: Yup.string().required("Vui lòng nhập mô tả"),
    image: Yup.string().required("Vui lòng nhập mô gắn ảnh"),
  });
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
                    value={formValues.name}
                    className={`${
                      touched.name && errors.name ? "error" : ""
                    } form-control`}
                    id="name"
                    onChange={(event) => {
                      setFormValues({
                        ...formValues,
                        name: event.target.value,
                      });
                      handleChange(event);
                    }}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="name"
                    component="div"
                    className="lg_error_message"
                  />
                </div>
                <div>
                  <label>Mô tả truyện</label>
                  <Field
                    type="text"
                    name="description"
                    value={formValues.description}
                    className={`${
                      touched.description && errors.description ? "error" : ""
                    } form-control`}
                    id="description"
                    onChange={(event) => {
                      setFormValues({
                        ...formValues,
                        description: event.target.value,
                      });
                      handleChange(event);
                    }}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="description"
                    component="div"
                    className="lg_error_message"
                  />
                </div>
                <div>
                  <label>Gắn liên kết ảnh truyện</label>
                  <Field
                    value={formValues.image}
                    type="text"
                    name="image"
                    className={`${
                      touched.image && errors.image ? "error" : ""
                    } form-control`}
                    id="image"
                    onChange={(event) => {
                      setFormValues({
                        ...formValues,
                        image: event.target.value,
                      });
                      handleChange(event.target.value);
                    }}
                    onBlur={handleBlur}
                  />
                  <ErrorMessage
                    name="image"
                    component="div"
                    className="lg_error_message"
                  />
                </div>
                <div>
                  <label>Thể loại truyện</label>
                  <Field
                    component={Select}
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    isMulti
                    value={storyCategories}
                    options={categories}
                    onChange={(selectedOptions) =>
                      setStoryCategories(selectedOptions)
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

export default EditStory;
