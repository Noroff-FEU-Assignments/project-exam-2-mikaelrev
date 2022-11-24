import Heading from "../layout/Heading";
import CreatePost from "./CreatePost";
import GetProfileInfo from "./GetProfileInfo";
import GetMyPosts from "./GetMyPosts";
import { Container, Row } from "react-bootstrap";

export default function ProfilePage() {
  return (
    <>
      <Container className="mt-3">
        <Heading content="My profile" />
        <Row>
          <GetProfileInfo />

          <CreatePost />
        </Row>
        <Row>
          <GetMyPosts />
        </Row>
      </Container>
    </>
  );
}
