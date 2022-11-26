import Heading from "../layout/Heading";
import CreatePost from "./CreatePost";
import GetProfileInfo from "./GetProfileInfo";
import GetProfilePosts from "./GetProfilePosts";
import { Container, Row } from "react-bootstrap";

export default function ProfilePage() {
  return (
    <Container>
      <Row className="my-3">
        <Heading content="My profile" />
      </Row>

      <Row>
        <GetProfileInfo />
      </Row>
      <Row className="mb-5">
        <CreatePost />
        <GetProfilePosts />
      </Row>
    </Container>
  );
}
