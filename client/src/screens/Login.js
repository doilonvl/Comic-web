import { useEffect, useRef, useState } from "react";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";
import { ArrowLeft } from "react-bootstrap-icons";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import FormGroup from "../components/FormGroup";
import "../styles/register.css";

const initFormValue = {
  userName: "",
  email: "",
  phoneNumber: "",
  password: "",
  passwordConfirm: "",
};

const isEmptyValue = (value) => {
  const regex = /^[\s]*$/;
  return regex.test(value);
};

const isPhoneNumber = (value) => {
  const phoneNumberRegex = /^(0|\+84)\d{9}$/;
  return phoneNumberRegex.test(value);
};
const isPassword = (value) => {
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  return passwordRegex.test(value);
};
function Login() {
  const navigate = useNavigate();
  const inputPhoneNumber = useRef("");
  const inputPassword = useRef("");
  const inputCheck = useRef(null);
  const [formValue, setFormValue] = useState(initFormValue);
  const [formError, setFormError] = useState({});
  const [acountExist, setAcountExist] = useState(false);
  const [password, setPassword] = useState(false);
  const [customer, setCustomer] = useState({});
  const [rem, setRem] = useState(true);
  if (localStorage.getItem("register_success")) {
    toast.success(
      "You have successfully registered, please login to continue buying tickets."
    );
    localStorage.removeItem("register_success");
  }
  const validateForm = (parentElement, e) => {
    const formErrorMessage = parentElement.querySelector(".form-message");
    const { name } = e;
    let formMessage;
    const error = {};
    if (isEmptyValue(formValue.password)) {
      error["password"] = "Password can not is empty";
    } else {
      if (!isPassword(formValue.password)) {
        error["password"] =
          "Ít nhất 8 ký tự, chữ thường, chữ hoa, số, có thể chưa ký tự đặc biệt.";
      }
    }
    if (isEmptyValue(formValue.phoneNumber)) {
      error["phoneNumber"] = "Phonne number can not is empty";
    } else {
      if (!isPhoneNumber(formValue.phoneNumber)) {
        error["phoneNumber"] = "Phone number format is not correct";
      }
    }

    Object.keys(error).forEach((e) => {
      if (e === name) {
        formMessage = error[e];
      }
    });
    setFormError(error);
    if (formMessage) {
      formErrorMessage.innerText = formMessage;
      parentElement.classList.add("invalid");
    } else {
      formErrorMessage.innerText = "";
      parentElement.classList.remove("invalid");
    }
    return Object.keys(error).length === 0;
  };
  const handleOnChange = (e) => {
    const { value, name } = e.target;
    if (name !== "active") {
      setFormValue({
        ...formValue,
        [name]: value,
      });
    }
    if (name === "password") {
      setPassword(value);
    }
    setRem(inputCheck.current.checked);
  };
  const getParentElement = (element) => {
    let formGroup = ".form-group_register";
    let parentElement;
    while (element.parentElement) {
      if (element.parentElement.matches(formGroup)) {
        parentElement = element.parentElement;
        break;
      }
      element = element.parentElement;
    }
    return parentElement;
  };
  useEffect(() => {
    const getRem = localStorage.getItem("rem");
    const getCustomer = JSON.parse(localStorage.getItem("user"));
    if (getRem && getCustomer) {
      setFormValue(getCustomer);
    }
  }, []);
  const handleOnBlur = (e) => {
    validateForm(getParentElement(e.target), e.target);
  };
  const handleOnFocus = (e) => {
    const formErrorMessage = getParentElement(e.target).querySelector(
      ".form-message"
    );
    formErrorMessage.innerText = "";
    getParentElement(e.target).classList.remove("invalid");
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (!inputPhoneNumber.current || !inputPassword.current) {
      return;
    }
    const requestBody = {
      phoneNumber: formValue.phoneNumber,
      password: formValue.password,
    };

    fetch("http://localhost:9999/Users/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(requestBody),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        } else {
          throw new Error("Failed to log in");
        }
      })
      .then((data) => {
        setAcountExist(true);
        setCustomer(data.user);
        localStorage.setItem("token", data.token);
        sessionStorage.setItem("login_success", "login_success");
        navigate("/");
      })
      .catch((error) => {
        console.error("Login failed:", error);
        toast.error("Login failed. Please check your credentials.");
      });
  };

  return (
    <Container className="mt-5 pt-2">
      <Row>
        <Col xs={12} className="mt-2 mb-3">
          <h3>
            <Link className="btn-home_link" to={"/"}>
              <ArrowLeft /> Homepage
            </Link>
          </h3>
        </Col>
      </Row>
      <Row className="border center-xs middle-xs">
        <Col
          md={6}
          className="d-none d-sm-block d-sm-none d-md-block left-part-login"
        ></Col>
        <Col xs={12} md={6} className="right-part">
          <Form
            className="border-0"
            id="form-1"
            onSubmit={(e) => handleOnSubmit(e)}
          >
            <Card>
              <Card.Header className="pt-4 pb-4">
                <h1 style={{ paddingLeft: 25 }}>User login</h1>
              </Card.Header>
              <Card.Body className="pb-0">
                <FormGroup
                  className="form-group_register"
                  xs={12}
                  inputRef={inputPhoneNumber}
                  label={"Phone number"}
                  placeholder={"Enter your phone number"}
                  name={"phoneNumber"}
                  value={formValue.phoneNumber}
                  onBlur={handleOnBlur}
                  onFocus={handleOnFocus}
                  onChange={handleOnChange}
                />
                <FormGroup
                  className="form-group_register"
                  xs={12}
                  inputRef={inputPassword}
                  type={"password"}
                  label={"Password"}
                  placeholder={"Enter your password"}
                  name={"password"}
                  value={formValue.password}
                  onBlur={handleOnBlur}
                  onFocus={handleOnFocus}
                  onChange={handleOnChange}
                />
                <Row>
                  <Col xs={12} className="pl-4">
                    <Form.Group className="form-group_register">
                      <Form.Check
                        ref={inputCheck}
                        onBlur={(e) => handleOnBlur(e)}
                        onFocus={(e) => handleOnFocus(e)}
                        onChange={(e) => handleOnChange(e)}
                        type={"checkbox"}
                        id={"active"}
                        checked={rem}
                        name={"active"}
                        label="Remmember me"
                      />
                      <span className="d-none form-message"></span>
                    </Form.Group>
                  </Col>
                </Row>
              </Card.Body>
              <Card.Footer sx={12} className="text-center">
                <Row>
                  <Col xs={12} className="pt-2">
                    <Button type="submit" className="pl-4 pr-4">
                      Login
                    </Button>
                  </Col>
                  <Col className="pb-2">
                    <span>
                      Don't have an account?{" "}
                      <Link to={"/register"} className="text-primary">
                        register
                      </Link>{" "}
                      now.
                    </span>
                  </Col>
                </Row>
              </Card.Footer>
            </Card>
          </Form>
        </Col>
      </Row>
    </Container>
  );
}

export default Login;
