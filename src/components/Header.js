import { Navbar, Container } from "react-bootstrap";

const Header = () => {
  return (
    <Navbar expand="lg" variant="dark" bg="primary">
      <Container>
        <Navbar.Brand href="#">
          <b>Plan Chooser</b>
        </Navbar.Brand>
      </Container>
    </Navbar>
  );
};

export default Header;
