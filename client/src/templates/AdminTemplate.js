import { Container } from "react-bootstrap";
import Header from "../components/common/headerAdmin/Header";

const AdminTemplate = ({ children }) => {
  return (
    <div>
      <Container className="mt-3">{children}</Container>
    </div>
  );
};

export default AdminTemplate;
