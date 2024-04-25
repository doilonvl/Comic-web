import { Form, Col } from "react-bootstrap";

const CheckBox = (props) => {
  const {
    label = "",
    id = "",
    checked = "",
    disabled = false,
    required = true,
    xs = 12,
    pattern = "[A-Za-z0-9]",
    name = "",
    handleOnchange = () => {},
    valid,
  } = props;

  return (
    <Form.Group as={Col} xs={xs}>
      <Form.Check
        name={name}
        id={JSON.stringify(id)}
        type={"checkbox"}
        onChange={handleOnchange}
        value={JSON.stringify(id)}
        label={label}
        disabled={disabled}
        required={required}
        pattern={pattern}
        feedbackType={valid}
        checked={checked}
      />
    </Form.Group>
  );
};

export default CheckBox;
