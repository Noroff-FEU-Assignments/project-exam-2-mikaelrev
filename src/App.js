import React from "react";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import "./App.css";
import HomePage from "./components/home/HomePage";
import ProfilePage from "./components/profile/ProfilePage";
import ExplorePosts from "./components/explorePosts/ExplorePosts";
import ProfilesList from "./components/findFriends/ProfilesList";
import LoginPage from "./components/login/LoginPage";
import RegisterPage from "./components/register/RegisterPage";
import GetPostDetails from "./components/explorePosts/GetPostDetails";
import { AuthProvider } from "./context/AuthContext";
import GetFriendProfile from "./components/findFriends/GetFriendProfile";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout />

        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/my-profile/Mikael" element={<ProfilePage />} />
            <Route path="/posts" element={<ExplorePosts />} />
            <Route path="/details/:id" element={<GetPostDetails />} />
            <Route path="/profiles" element={<ProfilesList />} />
            <Route path="/profiles/:name" element={<GetFriendProfile />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
