import React from "react";
import Heading from "../layout/Heading";
import RegisterForm from "./RegisterForm";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

function RegisterPage() {
  return (
    <Container>
      <Row>
        <Col>
          <Heading content="Register" />
          <RegisterForm />
        </Col>
      </Row>
    </Container>
  );
}

export default RegisterPage;
