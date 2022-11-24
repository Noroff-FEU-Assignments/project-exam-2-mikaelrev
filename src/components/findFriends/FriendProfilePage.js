import Heading from "../layout/Heading";
import GetProfilePosts from "./GetProfilePosts";
import GetProfileInfo from "../profile/GetProfileInfo";
import { Container, Row } from "react-bootstrap";

export default function FriendProfilePage() {
  return (
    <>
      <Container className="mt-3">
        <Heading content="My profile" />
        <Row>
          <GetProfileInfo />
          <GetProfilePosts />
        </Row>
      </Container>
    </>
  );
}
