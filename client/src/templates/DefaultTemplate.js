import React from "react";
import { Container } from "react-bootstrap";

const DefaultTemplate = ({ children }) => {
  return (
    <>
      <Container className="mt-3">{children}</Container>
    </>
  );
};
export default DefaultTemplate;
