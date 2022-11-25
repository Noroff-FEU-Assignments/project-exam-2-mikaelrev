import Heading from "../layout/Heading";
import CreatePost from "./CreatePost";
import GetProfileInfo from "./GetProfileInfo";
import GetProfilePosts from "./GetProfilePosts";
import { Container, Row } from "react-bootstrap";

export default function ProfilePage() {
  return (
    <>
      <Container className="mt-3">
        <Heading content="My profile" />
        <Row className="mt-5">
          <GetProfileInfo />
        </Row>
        <Row>
          <CreatePost />
        </Row>
        <Row>
          <GetProfilePosts />
        </Row>
      </Container>
    </>
  );
}
