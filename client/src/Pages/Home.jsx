import React from "react";
import { MDBContainer, MDBCard, MDBCardBody, } from "mdbreact";
import AllPosts from '../Components/AllPosts'


const Home = () => {
  return (
      <MDBContainer>
    <MDBCard  className="my-3 px-3 pb-5">
      <MDBCardBody>
        <h2 className=" font-weight-bold text-center my-5">
          Welcome to the Bloog!
        </h2>
      </MDBCardBody>
    </MDBCard>
    <AllPosts />
    </MDBContainer>
  );
}

export default Home;