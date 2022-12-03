import React from "react";
import { Row, Col, Button, Image } from "react-bootstrap";
import { NavLink } from "react-router-dom";
import Heading from "../layout/Heading";

export default function Hero() {
  return (
    <>
      <Row className="my-5 align-items-center">
        <Col md>
          <Image src="https://images.unsplash.com/photo-1522039176993-33264c54767e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1172&q=80" />
        </Col>
        <Col md>
          <Heading size="1" content="We all have the best taste in music" />
          <p>
            Now it's time to share it with the world. Join us and let everyone
            know that you actually do have the best taste
          </p>
          <NavLink to="/register">
            <Button className="mt-2 py-3" variant="success">
              Create an account
            </Button>
          </NavLink>
        </Col>
      </Row>
      <Row className="mb-5 align-items-center" bg="success">
        <Col md className="order-md-last">
          <Image src="https://images.unsplash.com/photo-1443186547344-2437c72a228e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MzY5fHxmcmllbmRzJTIwbXVzaWN8ZW58MHx8MHx8&auto=format&fit=crop&w=600&q=60" />
        </Col>
        <Col md>
          <Heading
            size="2"
            content="Find new music, and new friends while you're at it"
          />
          <p>
            Have the same favorite artist? Awesome. That's the first step to
            becoming really good friends
          </p>
        </Col>
      </Row>
    </>
  );
}
