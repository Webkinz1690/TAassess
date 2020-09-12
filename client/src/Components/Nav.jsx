import React from 'react';
import { MDBNav, MDBNavItem, MDBNavLink, MDBNavbarBrand } from 'mdbreact';

const Nav = () => {
  return (
    <MDBNav
      style={{ height: '50px' }}
      color="blue-gradient"
      className="expand-lg fixed-top justify-content-center align-items-center"
    >
      <MDBNavbarBrand>
        <MDBNavLink className="white-text " to="/">
          <strong className="white-text h3">WynIt</strong>
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
    </MDBNav>
  );
};

export default Nav;