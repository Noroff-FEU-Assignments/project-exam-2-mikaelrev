import Heading from "../layout/Heading";
import GetProfileInfo from "./GetProfileInfo";
import GetProfilePosts from "./GetProfilePosts";
import { Col, Row } from "react-bootstrap";
import GetFollowers from "./GetFollowers";

export default function ProfilePage() {
  return (
    <Col>
      <Row className="my-3">
        <Heading content="My profile" />
      </Row>

      <Row>
        <GetProfileInfo />
      </Row>
      <Row className="mb-5">
        <GetFollowers />
        <GetProfilePosts />
      </Row>
    </Col>
  );
}
