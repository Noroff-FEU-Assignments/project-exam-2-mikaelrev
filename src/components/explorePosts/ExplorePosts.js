import React from "react";
import Heading from "../layout/Heading";
import PostsList from "./PostsList";

export default function ExplorePosts() {
  return (
    <div>
      <Heading content="Explore Posts" />
      <PostsList />
    </div>
  );
}
