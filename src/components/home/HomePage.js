import React, { useContext } from "react";
import PostsByFollowed from "./PostsByFollowed";
import RegisterPage from "../register/RegisterPage";
import AuthContext from "../../context/AuthContext";
import CreatePost from "./CreatePost";

function HomePage() {
  const [auth] = useContext(AuthContext);

  return (
    <>
      {auth ? (
        <>
          <PostsByFollowed />
          <CreatePost />
        </>
      ) : (
        <RegisterPage />
      )}
    </>
  );
}

export default HomePage;
