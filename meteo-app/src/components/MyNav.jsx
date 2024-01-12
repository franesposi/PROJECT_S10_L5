import { Container, Nav, Navbar, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import SearchLocation from "./SearchLocation";
import { ThreeDotsVertical } from "react-bootstrap-icons";
import logo from "../assets/logo.png";

const MyNav = () => {
  const refreshPage = () => {
    window.location.reload();
  };

  return (
    <Container fluid>
      <Row>
        <Navbar expand="lg" className="mt-3 p-0">
          <Link to={"/"} className="text-decoration-none" onClick={() => refreshPage()}>
            <div className="navbar-brand ms-4" style={{ color: "#8B0000" }}>
              <img src={logo} alt="" style={{ width: "55px" }} />
            </div>
          </Link>
          <SearchLocation />
          <Navbar.Toggle
            aria-controls="basic-navbar-nav"
            className="border-0 bg-white m-0 p-0 me-2"
            style={{ width: "30px" }}
          >
            <ThreeDotsVertical color="#3498db" />
          </Navbar.Toggle>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto" style={{ marginLeft: "20em" }}>
              <Link to={"/"} className="nav-link" onClick={() => refreshPage()}>
                <p>Home</p>
              </Link>
              <Nav.Link href="#link">Latest search</Nav.Link>
              <Nav.Link href="#link">Map</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </Row>
    </Container>
  );
};

export default MyNav;
