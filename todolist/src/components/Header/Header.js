import React, { Component } from 'react'
import {Navbar, NavDropdown, NavItem, Nav, MenuItem} from 'react-bootstrap'

class Header extends Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect fixedTop="true">
        <Navbar.Header>
          <Navbar.Brand>
            <a href="#brand">LEEING</a>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <NavItem eventKey={1} href="#">
              Home
            </NavItem>
            <NavItem eventKey={2} href="#">
              TODO
            </NavItem>
            <NavDropdown eventKey={3} title="Admin" id="basic-nav-dropdown">
              <MenuItem eventKey={3.1}>Action</MenuItem>
              <MenuItem eventKey={3.2}>Another action</MenuItem>
              <MenuItem eventKey={3.3}>Something else here</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Separated link</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <NavItem eventKey={1} href="#">
              @github
            </NavItem>
            <NavItem eventKey={2} href="#">
              Logout
            </NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}
export default Header