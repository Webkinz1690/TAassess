import React, { useState, useContext } from 'react';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBBtn,
  MDBCard,
  MDBCardBody,
  MDBAnimation
} from 'mdbreact';
import { AppContext } from '../Context/AppContext';
import axios from 'axios';
import swal from 'sweetalert';


const SignUp = ({ history }) => {
  const { setCurrentUser } = useContext(AppContext);
  const [formData, setFormData] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSignUp = async (e) => {
    e.preventDefault();
    console.log('Made it');
    try {
      const response = await axios.post('/user/signup', formData);
      const token = response.data.token;
      localStorage.setItem('token', token);
      setCurrentUser(response.data.user);
      history.push('/');
    } catch (error) {
      swal('SignUp Error', error);
    }
  };

  return (
    <MDBContainer className="justify-content-center" fluid>
      <MDBRow className="py-4 mt-5"></MDBRow>
      <MDBRow className="no-gutters">
        <MDBCol></MDBCol>
        <MDBCol>
          <MDBAnimation type="bounceInDown" duration="700ms">
            <MDBCard className="py-2">
              <MDBCardBody>
                <form onSubmit={handleSignUp}>
                  <p className="h1 text-center py-3 ">Sign up</p>
                  <div className="grey-text">
                    <MDBInput
                      label="Username"
                      name="username"
                      icon="user"
                      size="sm"
                      group
                      type="text"
                      onChange={handleChange}
                    />
                    <MDBInput
                      label="Email"
                      name="email"
                      icon="envelope"
                      size="sm"
                      group
                      type="email"
                      validate
                      error="wrong"
                      success="right"
                      onChange={handleChange}
                    />
                    <MDBInput
                      label="Password"
                      name="password"
                      icon="lock"
                      size="sm"
                      group
                      type="password"
                      validate
                      onChange={handleChange}
                    />
                  </div>
                  <div className="text-center py-2 mt-2">
                    <MDBBtn color="elegant" type="submit" size='lg'>
                      <strong>Go!</strong>
                    </MDBBtn>
                  </div>
                </form>
              </MDBCardBody>
            </MDBCard>
          </MDBAnimation>
        </MDBCol>
        <MDBCol></MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default SignUp;
