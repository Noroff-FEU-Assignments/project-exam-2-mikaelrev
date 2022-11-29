import React, { useContext } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
import { NavLink, useNavigate } from "react-router-dom";
import AuthContext from "../../context/AuthContext";

function Layout() {
  const [auth, setAuth] = useContext(AuthContext);

  const navigate = useNavigate();

  function logout() {
    setAuth(null);
    navigate("/");
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container className="w-75">
        <NavLink to="/">
          <Navbar.Brand>LOGO</Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            {auth ? (
              <>
                <NavLink to="/my-profile" className="nav-link">
                  My Profile
                </NavLink>
                <NavLink to="/posts" className="nav-link">
                  Discover
                </NavLink>
                <NavLink to="/profiles" className="nav-link">
                  Find new friends
                </NavLink>
                <Button variant="light" onClick={logout}>
                  Log out
                </Button>
              </>
            ) : (
              <Button variant="light">
                <NavLink to="/login" className="nav-link p-0">
                  Log in
                </NavLink>
              </Button>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Layout;
