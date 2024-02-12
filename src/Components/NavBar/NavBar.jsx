import React from "react";
import { Navbar, Container, Nav } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import "./NavBar.css";
import HomeButton from "../Home/HomeButton";

export default function NavBar({ studio }) {
  const [navBg, setNavBg] = React.useState("red");
  const location = useLocation();
  React.useEffect(() => {
    if (
      window.location.pathname !== "/DC" &&
      window.location.pathname !== "/Sony" &&
      window.location.pathname !== "/SW"
    ) {
      setNavBg("red");
    } else {
      setNavBg("black");
    }
  }, [location]);

  let customNav;
  let logo;

  switch (studio) {
    case "marvel":
      logo = (
        <Navbar.Brand as={Link} to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg"
            width="80"
            alt="Marvel Logo"
          />
        </Navbar.Brand>
      );
      customNav = (
        <Nav className="m-auto justify-content-center">
          <Nav.Link as={Link} to="/2024">
            2024
          </Nav.Link>
          <Nav.Link as={Link} to="/2025">
            2025
          </Nav.Link>
          <Nav.Link as={Link} to="/2026">
            2026
          </Nav.Link>
          <Nav.Link as={Link} to="/2027">
            2027
          </Nav.Link>
          <Nav.Link as={Link} to="/tba">
            TBA
          </Nav.Link>
        </Nav>
      );
      break;
    case "sony":
      logo = (
        <Navbar.Brand as={Link} to="/">
          <img
            src="https://sony.scene7.com/is/content/sonyglobalsolutions/sony-logo?$S7Product$"
            width="100"
            alt="Sony Logo"
          />
        </Navbar.Brand>
      );
      customNav = <Nav className="m-auto justify-content-center"></Nav>;
      break;
    case "dc":
      logo = (
        <Navbar.Brand as={Link} to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/DC_Comics_logo.svg/800px-DC_Comics_logo.svg.png"
            width="35"
            alt="DC Comics Logo"
          />
        </Navbar.Brand>
      );
      customNav = <Nav className="m-auto justify-content-center"></Nav>;
      break;
    default:
      logo = (
        <Navbar.Brand as={Link} to="/">
          <img
            src="https://upload.wikimedia.org/wikipedia/en/d/df/Swlogo.png"
            width="70"
            alt="Logo"
          />
        </Navbar.Brand>
      );
      customNav = <Nav className="m-auto justify-content-center"></Nav>;
  }

  return (
    <>
      <Navbar
        style={{ backgroundColor: navBg, color: "white" }}
        expand="md"
        variant="light"
      >
        <Container>
          {logo}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="m-auto justify-content-center">{customNav}</Nav>
            <Nav>
              <Nav.Link
                as={Link}
                to="/Home"
                className="m-auto justify-content-center"
              >
                <HomeButton />
              </Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}
/*


*/
