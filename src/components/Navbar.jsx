import lightIcon from "/images/lightModeIcon.png";
import darkIcon from "/images/darkModeIcon.png";
import LogoName from "./LogoName";

import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";

import "bootstrap/dist/css/bootstrap.css";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";

function CollapsibleExample({ theme, bg, handleClick }) {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
    window.location.reload();
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      bg={bg === "dark" ? "dark" : "myColor"}
      variant={theme}
    >
      <Container>
        <Navbar.Brand as={Link} to="/">
          <LogoName h="7vh" />
        </Navbar.Brand>

        <Navbar.Brand onClick={handleClick}>
          <img
            src={bg === "dark" ? lightIcon : darkIcon}
            alt="mode"
            className="mode"
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/library">
              My Library
            </Nav.Link>

            <Nav.Link as={Link} to="/stories">
              Stories
            </Nav.Link>

            <Nav.Link as={Link} to="/motivationCandy">
              Motivation Candy
            </Nav.Link>
          </Nav>

          <Nav>
            <Nav.Link as={Link} to="/about">
              About Us
            </Nav.Link>

            {!user ? (
              <>
                <Nav.Link as={Link} to="/login">
                  Login
                </Nav.Link>

                <Nav.Link as={Link} to="/register">
                  Register
                </Nav.Link>
              </>
            ) : (
              <>
                <Navbar.Text className="me-3">
                  Hi, {user.name}
                </Navbar.Text>

                <Nav.Link onClick={logout}>
                  Logout
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;
