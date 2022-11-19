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
        <Navbar.Brand className="ps-5">LOGO</Navbar.Brand>
      </NavLink>
      <Navbar.Toggle aria-controls="basic-navbar-nav" className="me-3" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="ps-5">
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
