import React, { Component } from 'react'
import {Navbar, FormGroup, FormControl, Button} from 'react-bootstrap'

class Header extends Component {
  render() {
    return (
      <Navbar inverse collapseOnSelect fixedBottom={true}>
        <Navbar>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#home">TODOLIST</a>
            </Navbar.Brand>
            <Navbar.Toggle />
          </Navbar.Header>
          <Navbar.Collapse>
            <Navbar.Form pullLeft>
              <FormGroup>
                <FormControl type="text" placeholder="Search" />
              </FormGroup>{' '}
              <Button type="submit">Submit</Button>
            </Navbar.Form>
          </Navbar.Collapse>
        </Navbar>
      </Navbar>
    )
  }
}
export default Header