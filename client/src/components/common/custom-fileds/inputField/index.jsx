import { useImperativeHandle, useRef} from "react";
import { Col, Form } from "react-bootstrap"; 
import { forwardRef } from "react";

const InputField = (props, ref) => {
    const inputValue = useRef();
    const { type = "text", id = "", label = "", value = "", accept = "", placeholder = "", handleInputChange = () => { }, disabled = false, required = true, feedback = "Look good!", feedbackInvalid = "Bạn chưa nhập đúng giá trị", xs = 12, pattern = "^[a-zA-Z0-9_]*$", requiredValue = "*", className=""} = props

    const handleOnchangeValue = (e) => {
        handleInputChange(e)
    }
    useImperativeHandle(ref, () => ({
        focus: () => {
            inputValue.current.focus();
        }
    }));
    return (
        <Form.Group as={Col} xs={xs} className={`p-0 mb-3 ${className}`}>
            {label && <Form.Label htmlFor={id} >{label} {requiredValue && <span className="text-danger">{requiredValue}</span>} </Form.Label>}
            <Form.Control
                ref={inputValue}
                required={required}
                name={id}
                id={id}
                type={type}
                value={value}
                onChange={(e) => handleOnchangeValue(e)}
                placeholder={placeholder}
                pattern={pattern}
                disabled={disabled}
                accept={accept}
            />
            {value ? (<Form.Control.Feedback>{feedback}</Form.Control.Feedback>) : (<Form.Control.Feedback type="invalid">{feedbackInvalid}</Form.Control.Feedback>)}
        </Form.Group>
    );
}

export default forwardRef(InputField);