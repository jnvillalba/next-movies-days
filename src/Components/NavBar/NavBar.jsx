import React, { useEffect, useMemo, useState } from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, useLocation } from "react-router-dom";
import HomeButton from "../Home/HomeButton";
import "./NavBar.css";

// Centralize logo configurations
const STUDIO_CONFIGS = {
  marvel: {
    logoSrc:
      "https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg",
    logoWidth: 80,
    navLinks: [
      { to: "/2025", label: "2025" },
      { to: "/2026", label: "2026" },
      { to: "/2027", label: "2027" },
      { to: "/tba", label: "TBA" },
    ],
  },
  sony: {
    logoSrc:
      "https://sony.scene7.com/is/content/sonyglobalsolutions/sony-logo?$S7Product$",
    logoWidth: 100,
    navLinks: [],
  },
  dc: {
    logoSrc:
      "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3d/DC_Comics_logo.svg/800px-DC_Comics_logo.svg.png",
    logoWidth: 35,
    navLinks: [],
  },
  default: {
    logoSrc: "https://upload.wikimedia.org/wikipedia/en/d/df/Swlogo.png",
    logoWidth: 70,
    navLinks: [],
  },
};

export default function NavBar({ studio = "default" }) {
  const location = useLocation();
  const [navBg, setNavBg] = useState("red");

  // Memoize studio configuration to prevent unnecessary re-renders
  const studioConfig = useMemo(
    () => STUDIO_CONFIGS[studio] || STUDIO_CONFIGS.default,
    [studio]
  );

  useEffect(() => {
    // Simplified background color logic
    const darkBackgroundPaths = ["/DC", "/Sony", "/SW"];
    setNavBg(
      darkBackgroundPaths.includes(window.location.pathname) ? "black" : "red"
    );
  }, [location]);

  return (
    <Navbar
      style={{ backgroundColor: navBg, color: "white" }}
      expand="md"
      variant="light"
    >
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/">
          <img
            src={studioConfig.logoSrc}
            width={studioConfig.logoWidth}
            alt={`${studio} Logo`}
          />
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav" />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto justify-content-center">
            {studioConfig.navLinks.map((link) => (
              <Nav.Link key={link.to} as={Link} to={link.to}>
                {link.label}
              </Nav.Link>
            ))}
          </Nav>

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
  );
}
