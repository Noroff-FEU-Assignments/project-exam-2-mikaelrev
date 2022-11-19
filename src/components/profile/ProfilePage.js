import Heading from "../layout/Heading";
import CreatePost from "./CreatePost";
import GetProfileInfo from "./GetProfileInfo";

export default function ProfilePage() {
  return (
    <>
      <Heading content="My profile" />
      <CreatePost />
      <GetProfileInfo />
    </>
  );
}
