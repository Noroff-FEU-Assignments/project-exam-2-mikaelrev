import Heading from "../layout/Heading";
import CreatePost from "./CreatePost";
import GetProfileInfo from "./GetProfileInfo";
import GetProfilePosts from "./GetProfilePosts";
import Row from "react-bootstrap/Row";

export default function ProfilePage() {
  return (
    <>
      <Row className="my-3">
        <Heading content="My profile" />
      </Row>

      <Row>
        <GetProfileInfo />
      </Row>
      <Row>
        <CreatePost />
      </Row>
      <Row>
        <GetProfilePosts />
      </Row>
    </>
  );
}
