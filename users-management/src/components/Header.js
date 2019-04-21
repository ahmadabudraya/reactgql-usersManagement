import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.css'
import { MDBNavbar,MDBNavLink, MDBNavbarBrand, MDBNavbarNav, MDBNavItem, MDBNavbarToggler, MDBCollapse } from "mdbreact";
export default class Header extends Component {

  state = {
    isOpen: false
  };

  toggleCollapse = () => {
    this.setState({ isOpen: !this.state.isOpen });
  }
  render() {
    return (
      
        <MDBNavbar color="indigo" dark expand="md">
          <MDBNavbarBrand>
            <strong className="white-text">Users Management</strong>
          </MDBNavbarBrand>
          <MDBNavbarToggler onClick={this.toggleCollapse} />
          <MDBCollapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
          <MDBNavbarNav left>
            <MDBNavItem active>
              <MDBNavLink to="/">Home</MDBNavLink>
            </MDBNavItem>
            
            <MDBNavItem>
              <MDBNavLink to="/add-user">Add User</MDBNavLink>
            </MDBNavItem>
            
          </MDBNavbarNav>
          
        </MDBCollapse>
        </MDBNavbar>
      
    )
  }
}


/*


<Navbar bg="light" expand="lg">
        <Navbar.Brand to="/">React-Bootstrap</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/add-user">Add user</NavLink>
          </Nav>
          
        </Navbar.Collapse>
      </Navbar>
*/