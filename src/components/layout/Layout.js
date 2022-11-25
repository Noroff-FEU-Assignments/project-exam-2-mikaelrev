import React, { useContext } from "react";
import { Container, Navbar, Nav, Button } from "react-bootstrap";
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
      <Container>
        <NavLink to="/">
          <Navbar.Brand>LOGO</Navbar.Brand>
        </NavLink>
        <Navbar.Toggle aria-controls="basic-navbar-nav" className="me-3" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ps-5">
            <NavLink to="/" className="nav-link">
              Home
            </NavLink>
            <NavLink to="/my-profile" className="nav-link">
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
                <Button variant="success" onClick={logout}>
                  Log out
                </Button>
              </>
            ) : (
              <Button variant="success">
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
