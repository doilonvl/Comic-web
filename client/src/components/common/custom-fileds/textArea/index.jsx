import { useImperativeHandle, useRef } from "react";
import { forwardRef } from "react";
import { Col, InputGroup } from "react-bootstrap";
import Form from 'react-bootstrap/Form';

const TextArea = (props, ref) => {
    const inputValue = useRef();
    const { label = "", id = "", value = "", placeholder = "", handleInputChange = () => {}, disabled = false, required = true, feedback = "Look good!", feedbackInvalid = "Bạn chưa nhập đúng giá trị", xs = 12, pattern = "^[a-zA-Z0-9_]*$", requiredValue = "*" } = props

    const handleOnchangeValue = (e) => {
        handleInputChange(e)
    }
    useImperativeHandle(ref, () => ({
        focus: () => {
            inputValue.current.focus();
        }
    }));
    return (
        <Form.Group as={Col} xs={xs} className="p-0 mb-3" >
            {label && <Form.Label htmlFor={id}>{label}  {requiredValue && <span className="text-danger">{requiredValue}</span>} </Form.Label>}
            <InputGroup>
                <Form.Control
                    rows={1}
                    as="textarea"
                    aria-label="With textarea"
                    placeholder={placeholder}
                    name={id}
                    id={id}
                    value={value}
                    onChange={(e) => handleOnchangeValue(e)}
                    disabled={disabled}
                    required={required}
                    pattern={pattern}
                    ref={inputValue}
                />
                {value ? (<Form.Control.Feedback>{feedback}</Form.Control.Feedback>) : (<Form.Control.Feedback type="invalid">{feedbackInvalid}</Form.Control.Feedback>)}
            </InputGroup>
        </Form.Group>
    );
}

export default forwardRef(TextArea);