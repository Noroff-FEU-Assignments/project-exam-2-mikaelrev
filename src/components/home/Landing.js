import React from "react";
import Heading from "../layout/Heading";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import { NavLink } from "react-router-dom";

function Landing() {
  return (
    <Container>
      <Row className="justify-content-md-center">
        <Col className="col-md-auto text-center mt-5">
          <Heading content="Home" />

          <p>A place to share your music taste</p>
          <NavLink to="/register">
            <Button variant="success">Create an account</Button>
          </NavLink>
        </Col>
      </Row>
    </Container>
  );
}

export default Landing;
