import { useImperativeHandle, useRef } from 'react'
import { Col, Form, Row } from 'react-bootstrap'


export default function FormGroup({ md, inputRef="", type = 'text', label, placeholder = '', name="", value="", onBlur=()=>{}, onFocus=()=>{}, onChange=()=>{} }) {
    const input = useRef()
    useImperativeHandle(inputRef ,() => value)
    return (
        <Row>
            <Col md={md}>
                <Form.Group className='form-group_register'>
                    <Form.Label htmlFor={name}>{label} <span style={{ color: 'red' }}>*</span></Form.Label>
                    <Form.Control
                        className='form-control_register'
                        ref={inputRef}
                        onBlur={(e) => onBlur(e)}
                        onFocus={(e) => onFocus(e)}
                        value={value}
                        onChange={(e) => onChange(e)} 
                        type={type}
                        id={name}
                        name={name} placeholder={placeholder} />
                    <span className='form-message'></span>
                </Form.Group>
            </Col>
        </Row>
    )
}

