import React, { useContext } from "react";
import PostsByFollowed from "./PostsByFollowed";
import Hero from "./Hero";
import AuthContext from "../../context/AuthContext";
import CreatePost from "./CreatePost";

function HomePage() {
  const [auth] = useContext(AuthContext);

  return (
    <>
      {auth ? (
        <>
          <CreatePost />
          <PostsByFollowed />
        </>
      ) : (
        <Hero />
      )}
    </>
  );
}

export default HomePage;
