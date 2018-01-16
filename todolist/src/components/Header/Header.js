import React, { Component } from 'react'
import {Navbar, NavDropdown, NavItem, Nav, MenuItem} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import { Link } from 'react-router-dom'

class Header extends Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect fixedTop={true}>
        <Navbar.Header>
          <Navbar.Brand>
            <Link to="/">LEE</Link>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/article">
              <NavItem eventKey={1}>
                Article
              </NavItem>
            </LinkContainer>
            <LinkContainer to="/about">
              <NavItem eventKey={2}>
                About
              </NavItem>
            </LinkContainer>
            <NavDropdown eventKey={3} title="Todos" id="basic-nav-dropdown">
              <LinkContainer to="/todolist">
                <MenuItem eventKey={3.1}>
                  All
                </MenuItem>
              </LinkContainer>
              <MenuItem eventKey={3.2}>Done</MenuItem>
              <MenuItem eventKey={3.3}>Undone</MenuItem>
              <MenuItem divider />
              <MenuItem eventKey={3.3}>Others</MenuItem>
            </NavDropdown>
          </Nav>
          <Nav pullRight>
            <LinkContainer to="/login">
              <NavItem eventKey={3.1}>
                Login
              </NavItem>
            </LinkContainer>
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