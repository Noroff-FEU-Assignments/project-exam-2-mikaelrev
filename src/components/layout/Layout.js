import React from "react";
import { useContext } from "react";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

function Layout() {
  const [auth, setAuth] = useContext(AuthContext);

  const navigate = useNavigate();

  function logout() {
    setAuth(null);
    navigate("/login");
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <NavLink to="/">
        <Navbar.Brand>LOGO</Navbar.Brand>
      </NavLink>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">
          <NavLink to="/" className="nav-link">
            Home
          </NavLink>
          <NavLink to="/my-profile/Mikael" className="nav-link">
            My Profile
          </NavLink>
          <NavLink to="/posts" className="nav-link">
            Discover
          </NavLink>
          <NavLink to="/profiles" className="nav-link">
            Find new friends
          </NavLink>
          {auth ? (
            <>
              <button onClick={logout}>Log out</button>
            </>
          ) : (
            <NavLink to="/login" className="nav-link">
              Login
            </NavLink>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
}

export default Layout;
