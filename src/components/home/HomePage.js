import React, { useContext } from "react";
import PostsByFollowed from "./PostsByFollowed";
import RegisterPage from "../register/RegisterPage";
import AuthContext from "../../context/AuthContext";

function HomePage() {
  const [auth] = useContext(AuthContext);

  return <>{auth ? <PostsByFollowed /> : <RegisterPage />}</>;
}

export default HomePage;
