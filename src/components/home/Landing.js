import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { NavLink } from "react-router-dom";

export default function Landing() {
  return (
    <Row className="mt-3">
      <Col
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <p>A place to share your music taste</p>
        <NavLink to="/register">
          <Button variant="success">Create an account</Button>
        </NavLink>
      </Col>
    </Row>
  );
}
