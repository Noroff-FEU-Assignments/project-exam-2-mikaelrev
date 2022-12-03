import React, { useContext } from "react";
import Heading from "../layout/Heading";
import PostsByFollowed from "./PostsByFollowed";
import Hero from "./Hero";
import AuthContext from "../../context/AuthContext";
import CreatePost from "./CreatePost";

function HomePage() {
  const [auth] = useContext(AuthContext);

  return (
    <>
      {auth ? (
        <div className="mt-3">
          <Heading size="1" content="Home" />
          <CreatePost />
          <PostsByFollowed />
        </div>
      ) : (
        <Hero />
      )}
    </>
  );
}

export default HomePage;
