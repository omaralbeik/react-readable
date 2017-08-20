import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap'

import {LinkContainer} from 'react-router-bootstrap'

class NavigationBar extends Component {

  render() {
    return (
      <Navbar collapseOnSelect>
        <Navbar.Header>
          <Navbar.Brand>
            <LinkContainer to="/"><a>Readable!</a></LinkContainer>
          </Navbar.Brand>
          <Navbar.Toggle />
        </Navbar.Header>
        <Navbar.Collapse>
          <Nav>
            <LinkContainer to="/"><NavItem>Posts</NavItem></LinkContainer>
            <NavItem href="https://github.com/omaralbeik/Readable">Github Repo</NavItem>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    );
  };
}

export default NavigationBar;
