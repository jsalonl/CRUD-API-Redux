import { Container, Nav, Navbar } from "react-bootstrap"
import { NavLink } from "react-router-dom"

const NavbarApp = () => {
  return(
    <Navbar bg="dark" variant="dark">
        <Container>
          <Navbar.Brand href="#home">Navbar</Navbar.Brand>
          <Nav className="me-auto">
            <NavLink to="/" className="nav-link">Home</NavLink>
            <NavLink to="/users" className="nav-link">Usuarios</NavLink>
          </Nav>
        </Container>
      </Navbar>
  )
}

export default NavbarApp