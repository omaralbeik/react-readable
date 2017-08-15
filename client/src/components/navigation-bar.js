import React, {Component} from 'react';
import {Navbar, Nav, NavItem} from 'react-bootstrap'

import {LinkContainer} from 'react-router-bootstrap'

class NavigationBar extends Component {

  render() {

    return (
      <Navbar>
        <Navbar.Header>
          <Navbar.Brand>
            <LinkContainer to="/"><a>Readable!</a></LinkContainer>
          </Navbar.Brand>
        </Navbar.Header>
        <Nav>
          <LinkContainer to="/posts"><NavItem>Posts</NavItem></LinkContainer>
          <LinkContainer to="/categories"><NavItem>Categories</NavItem></LinkContainer>
          <LinkContainer to="/comments"><NavItem>Comments</NavItem></LinkContainer>
        </Nav>
      </Navbar>
    );
  };
}

export default NavigationBar;
