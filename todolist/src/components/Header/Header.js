import React, { Component } from 'react'
import {Navbar, NavDropdown, NavItem, Nav, MenuItem} from 'react-bootstrap'

class Header extends Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect fixedTop={true}>
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#brand">LEE</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#">
              Home
            </NavItem>
            <NavItem eventKey={2} href="#">
              About
            </NavItem>
            <NavDropdown eventKey={3} title="Todos" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>All</MenuItem>
              <MenuItem eventKey={3.2}>Done</MenuItem>
              <MenuItem eventKey={3.3}>Undone</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Others</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">
              Logout
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
export default Header