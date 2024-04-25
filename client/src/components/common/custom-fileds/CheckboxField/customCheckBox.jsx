import { Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import "./checkbox.css";

const Box = ({ label, checked, onClick }) => {
  return (
    <div
      className={`custom-checkbox ${checked ? "checked" : ""}`}
      onClick={onClick}
    >
      {label}
    </div>
  );
};

const CustomCheckBox = (props) => {
  const dispatch = useDispatch();
  const {
    label = "",
    id = "",
    checked = "",
    disabled = false,
    required = true,
    feedback = "Look good!",
    xs = 12,
    pattern = "[A-Za-z0-9]",
    name = "",
    handleOnchange = () => {},
    valid,
  } = props;

  const toggleCheckbox = () => {
    dispatch(handleOnchange(id));
  };

  return (
    <Form.Group>
      <Box label={label} checked={checked} onClick={toggleCheckbox} />
    </Form.Group>
  );
};

export default CustomCheckBox;
