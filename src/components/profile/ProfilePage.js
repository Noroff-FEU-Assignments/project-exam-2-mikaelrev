import Heading from "../layout/Heading";
import CreatePost from "./CreatePost";
import GetProfileInfo from "./GetProfileInfo";
import { Container, Row } from "react-bootstrap";

export default function ProfilePage() {
  return (
    <>
      <Container className="mt-3">
        <Heading content="info" />
        <Row justify-content-md-center>
          <GetProfileInfo />

          <CreatePost />
        </Row>
      </Container>
    </>
  );
}
