import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

function Headnav() {
  return (
    <Navbar
      bg="dark"
      data-bs-theme="dark"
      expand="lg"
      className="bg-body-tertiary"
    >
      <Container>
        <Navbar.Brand href="/">Auto Trade</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/">Home</Nav.Link>
            <NavDropdown title="Stock" id="basic-nav-dropdown">
              <NavDropdown.Item href="/kiwoom">키움</NavDropdown.Item>
              <NavDropdown.Item href="/kiwoom/wallet">
                키움 계좌 조회
              </NavDropdown.Item>
              <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
            <NavDropdown title="COIN" id="basic-nav-dropdown">
              <NavDropdown.Item href="/binance">BINANCE</NavDropdown.Item>
              <NavDropdown.Item href="/bitget">BITGET</NavDropdown.Item>
              <NavDropdown.Item href="/upbit">Upbit</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
            <NavDropdown title="ASSET" id="basic-nav-dropdown">
              <NavDropdown.Item href="/upbit">TOTAL</NavDropdown.Item>
              <NavDropdown.Item href="/upbit">STOCK</NavDropdown.Item>
              <NavDropdown.Item href="/upbit">COIN</NavDropdown.Item>
              <NavDropdown.Divider />
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default Headnav;
