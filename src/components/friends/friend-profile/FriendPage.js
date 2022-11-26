import Heading from "../../layout/Heading";
import { Container, Row } from "react-bootstrap";
import GetFriendInfo from "./GetFriendInfo";
import GetFriendPosts from "./GetFriendPosts";

export default function FriendPage() {
  return (
    <>
      <Container className="mt-3">
        <Heading content="My profile" />
        <Row>
          <GetFriendInfo />
        </Row>
        <Row>
          <GetFriendPosts />
        </Row>
      </Container>
    </>
  );
}
