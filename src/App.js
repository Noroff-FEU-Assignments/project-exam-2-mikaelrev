import React from "react";
import Container from "react-bootstrap/Container";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import "./App.css";
import HomePage from "./components/home/HomePage";
import ExplorePosts from "./components/explorePosts/ExplorePosts";
import FindFriends from "./components/findFriends/FindFriends";
import LoginPage from "./components/login/LoginPage";
import RegisterPage from "./components/register/RegisterPage";
import { AuthProvider } from "./context/AuthContext";

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout />

        <Container>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/posts" element={<ExplorePosts />} />
            <Route path="/profiles" element={<FindFriends />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
          </Routes>
        </Container>
      </Router>
    </AuthProvider>
  );
}

export default App;
