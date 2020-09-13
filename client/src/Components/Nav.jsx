import React from 'react';
import { MDBNav, MDBNavItem, MDBNavLink, MDBNavbarBrand } from 'mdbreact';
import Logout from './Logout'

const Nav = () => {
  return (
    <MDBNav
      style={{ height: '50px' }}
      color="black"
      className="expand-lg fixed-top justify-content-center align-items-center"
    >
      <MDBNavbarBrand>
        <MDBNavLink className="white-text " to="/">
          <strong className="white-text h3">BloggyBlug</strong>
        </MDBNavLink>
      </MDBNavbarBrand>
      <MDBNavItem>
        <MDBNavLink className="white-text font-weight-bold" to="/login">
          Login
        </MDBNavLink>
      </MDBNavItem>
      <MDBNavItem>
        <MDBNavLink className="white-text font-weight-bold" to="/signup">
          Sign Up
        </MDBNavLink>
      </MDBNavItem>
      <Logout />
    </MDBNav>
  );
};

export default Nav;