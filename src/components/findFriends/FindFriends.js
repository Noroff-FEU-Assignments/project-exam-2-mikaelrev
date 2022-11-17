import React from "react";
import Heading from "../layout/Heading";
import ProfilesList from "./ProfilesList";

export default function FindFriends() {
  return (
    <div>
      <Heading content="Find new friends" />
      <ProfilesList />
    </div>
  );
}
