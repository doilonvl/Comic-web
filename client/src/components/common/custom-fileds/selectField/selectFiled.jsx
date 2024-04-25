import { Form } from "react-bootstrap";

const SelectField = (props) => {
    const {field, form, type = "text", label="", placeholder="", disabled=false} = props
    const {name} = field; 
    return ( 
        <Form.Group>
            {label && <Form.Label htmlFor={name}>{label}</Form.Label>}
            <Form.Control {...field} id={name} placeholder={placeholder} disabled={disabled} type={type} />
        </Form.Group>
     );
}
 
export default SelectField;