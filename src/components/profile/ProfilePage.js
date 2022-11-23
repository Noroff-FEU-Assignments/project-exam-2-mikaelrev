import Heading from "../layout/Heading";
import CreatePost from "./CreatePost";
import GetProfileInfo from "./GetProfileInfo";
import { Container } from "react-bootstrap";

export default function ProfilePage() {
  return (
    <Container className="mt-3">
      <Heading content="My profile" />
      <CreatePost />
      <GetProfileInfo />
    </Container>
  );
}
