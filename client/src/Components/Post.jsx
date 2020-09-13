import React, { useState, useEffect } from 'react';
import { MDBContainer, MDBRow, MDBCol, MDBCard, MDBMask, MDBView, MDBBtn } from "mdbreact";
import axios from 'axios'
import { useHistory } from 'react-router-dom'

const Post = () => {
  const history = useHistory()
  const [posts, setPosts] = useState([])
  
  useEffect(() => {
    axios.get('/api/posts').then(({ data }) => setPosts(data))
  }, [])

  const handleClick = id => {
    history.push(`/api/posts/${id}`)
  }
  return (
    <MDBContainer>
      {posts.map((post) => (
        <MDBCard key={post._id}>
           <MDBRow>
           <MDBCol lg="5" xl="4">
             <MDBView  className=" z-depth-1-half mb-lg-0 mb-4">
               <img
                 className="img-fluid"
                 src="https://mdbootstrap.com/img/Photos/Others/images/49.jpg"
                 alt={post.title}
               />
               <a href="#!">
                 <MDBMask overlay="white-slight" />
               </a>
             </MDBView>
           </MDBCol>
           <MDBCol lg="7" xl="8">
             <h3 className="font-weight-bold mb-3 p-0">
               <strong>{post.title}</strong>
             </h3>
             <p className="dark-grey-text">
               {post.text.substring(0, 200)}...
             </p>
             <p>
               by <a href="#!" className="font-weight-bold">Written by: {post.author}</a>
             </p>
             <MDBBtn color="#212121" size="md" onClick={() => handleClick(post._id)}>
               Read More
             </MDBBtn>
           </MDBCol>
         </MDBRow>
         </MDBCard>
       
      ))}
    </MDBContainer>
  );
};

export default Post;