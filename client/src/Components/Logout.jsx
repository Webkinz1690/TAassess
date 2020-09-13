import React, { useContext } from 'react';
import {  MDBNavItem, MDBNavLink, } from 'mdbreact';
import axios from 'axios';
import { useHistory } from 'react-router-dom';
import { AppContext } from '../Context/AppContext';

const Logout = () => {
  const history = useHistory();
  const { setCurrentUser } = useContext(AppContext);

  const handleSignOut = () => {
    axios
      .post('/users/logout', { withCredentials: true })
      .then(() => {
        setCurrentUser(null);
        sessionStorage.removeItem('user');
        history.push('/login');
      })
      .catch((error) => console.log(error));
  };

  return (
  <MDBNavItem>
  <MDBNavLink className="white-text font-weight-bold" to="/signup" onClick={handleSignOut}>
    Logout
  </MDBNavLink>
</MDBNavItem>)

};

export default Logout;
