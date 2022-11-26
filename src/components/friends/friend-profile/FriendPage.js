import Heading from "../../layout/Heading";
import { Col, Row } from "react-bootstrap";
import GetFriendInfo from "./GetFriendInfo";
import GetFriendPosts from "./GetFriendPosts";

export default function FriendPage() {
  return (
    <Col className="mt-3">
      <Heading content="My profile" />
      <Row>
        <GetFriendInfo />
      </Row>
      <Row>
        <GetFriendPosts />
      </Row>
    </Col>
  );
}
