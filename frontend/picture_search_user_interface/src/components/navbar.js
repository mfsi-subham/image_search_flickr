import React from 'react'
import {Navbar, Nav, NavDropdown} from 'react-bootstrap'
import Logo from '../assets/images/logo.svg'

const navbar = props => {
    return(
        <div>
            <Navbar collapseOnSelect expand="lg" bg="info" variant="dark" fixed="top">
                <Navbar.Brand href="#home">
                    <img
                        alt=""
                        src={Logo}
                        width="32"
                        height="32"
                        className="d-inline-block align-top"
                    />{' '}
                    Picture Search
                </Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="ml-auto p-1 ">
                        <Nav.Link  href="#1"><strong>Home</strong></Nav.Link>
                        <Nav.Link href="#2"><strong>Favourite Photos</strong></Nav.Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>

        </div>

    );
};

export default navbar