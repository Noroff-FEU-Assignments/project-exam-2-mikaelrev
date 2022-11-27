import React, { useContext } from "react";
import Landing from "./Landing";
import PostsByFollowed from "./PostsByFollowed";
import AuthContext from "../../context/AuthContext";

function HomePage() {
  const auth = useContext(AuthContext);

  return <>{auth ? <PostsByFollowed /> : <Landing />}</>;
}

export default HomePage;
