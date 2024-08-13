

import lightIcon from '/images/lightModeIcon.png'
import darkIcon from '/images/darkModeIcon.png'
import LogoName from './LogoName'
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import 'bootstrap/dist/css/bootstrap.css';
import { Link } from 'react-router-dom';
import '../App.css'
function CollapsibleExample({theme,bg,handleClick}) {
  return (
    <Navbar collapseOnSelect expand="lg"  bg={bg==="dark"?"dark":"myColor"} variant={theme}>
      <Container>
        <Navbar.Brand as={Link} to='/'><LogoName h="7vh"/></Navbar.Brand>
        <Navbar.Brand onClick={handleClick}><img src={(bg==='dark')?lightIcon:darkIcon} alt="mode" onClick={handleClick} className='mode'/></Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to='/library'>My Library</Nav.Link>
            <Nav.Link as={Link} to='/stories'>Stories</Nav.Link>
            <Nav.Link as={Link} to='/motivationCandy'>Motivation Candy</Nav.Link>
          </Nav>
          <Nav>
           
            <Nav.Link as={Link} to='/about'>
              About Us
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;