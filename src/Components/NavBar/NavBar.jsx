import { Container, Nav, Navbar } from "react-bootstrap";
import { Link, NavLink } from "react-router";
import dcLogo from "../../assets/DC_logo.svg";
import HomeButton from "../Home/HomeButton";
import "./NavBar.css";
// Centralize logo configurations
const STUDIO_CONFIGS = {
  marvel: {
    logoSrc:
      "https://upload.wikimedia.org/wikipedia/commons/b/b9/Marvel_Logo.svg",
    logoWidth: 80,
    navLinks: [
      { to: "/2026", label: "2026" },
      { to: "/2027", label: "2027" },
      { to: "/2028", label: "2028" },
      { to: "/tba", label: "TBA" },
      { to: "/orden", label: "All" },
    ],
    bgColor: "red",
  },
  sony: {
    logoSrc:
      "https://sony.scene7.com/is/content/sonyglobalsolutions/sony-logo?$S7Product$",
    logoWidth: 100,
    navLinks: [],
    bgColor: "black",
  },
  dc: {
    logoSrc: dcLogo,
    logoWidth: 35,
    navLinks: [],
    bgColor: "#0476F2",
  },
  default: {
    logoSrc: "https://upload.wikimedia.org/wikipedia/en/d/df/Swlogo.png",
    logoWidth: 70,
    navLinks: [],
    bgColor: "black",
  },
};

export default function NavBar({ studio = "default" }) {
  const studioConfig = STUDIO_CONFIGS[studio] || STUDIO_CONFIGS.default;

  return (
    <Navbar
      className="custom-navbar"
      style={{ backgroundColor: studioConfig.bgColor, color: "white" }}
      expand="md"
      collapseOnSelect
      data-bs-theme="dark"
    >
      <Container>
        {/* Logo */}
        <Navbar.Brand as={Link} to="/">
          <img
            className="nav-img-logo"
            src={studioConfig.logoSrc}
            width={studioConfig.logoWidth}
            alt={`${studio} Logo`}
          />
        </Navbar.Brand>

        <Navbar.Toggle
          aria-controls="basic-navbar-nav"
          label="Abrir o cerrar menú"
        />

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="m-auto justify-content-center">
            {studioConfig.navLinks.map((link) => (
              <Nav.Link
                key={link.to}
                as={NavLink}
                to={link.to}
                eventKey={link.to}
              >
                {link.label}
              </Nav.Link>
            ))}
          </Nav>

          <Nav>
            <Nav.Link
              as={Link}
              to="/"
              eventKey="/"
              aria-label="Ir al inicio"
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
