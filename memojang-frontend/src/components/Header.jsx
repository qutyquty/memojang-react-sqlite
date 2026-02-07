import { Container, Nav, Navbar } from 'react-bootstrap';

const Header = () => {
  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" fixed="top">
        <Container>
          {/* 브랜드 로고 */}
          <Navbar.Brand href="/">Memojang</Navbar.Brand>

          {/* 햄버거 버튼 */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" />

          {/* 메뉴 래핑 */}
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav>
              <Nav.Link href="/">Home</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};

export default Header;