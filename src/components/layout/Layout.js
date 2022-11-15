import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
} from "react-router-dom";
import Container from "react-bootstrap/Container";
import HomePage from "../home/HomePage";
import ExplorePosts from "../explorePosts/ExplorePosts";
import FindFriends from "../findFriends/FindFriends";
import LoginPage from "../login/LoginPage";
import RegisterPage from "../register/RegisterPage";

function Layout() {
  return (
    <Router>
      <Navbar bg="dark" variant="dark" expand="lg">
        <NavLink to="/" exact>
          <Navbar.Brand>LOGO</Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/posts" className="nav-link">
              Discover
            </NavLink>
            <NavLink to="/profiles" className="nav-link">
              Find new friends
            </NavLink>
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
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
  );
}

export default Layout;
