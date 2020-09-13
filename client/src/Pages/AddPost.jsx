import React, { useState, useContext } from 'react'
import {MDBContainer, MDBBtn} from 'mdbreact'
import axios from 'axios'
import { AppContext } from '../Context/AppContext';

const AddPost = ({ history }) => {
    const [postData, setPostData] = useState(null);
  const { setLoading } = useContext(AppContext);

  const handleChange = (e) => {
    setPostData({ ...postData, [e.target.name]: e.target.value });
  };

  const handlePostPublish = async (e) => {
    const form = e.target;
    setLoading(true);
    e.preventDefault();
    axios
      .post('/posts/new', postData, { withCredentials: true })
      .then((res) => {
        console.log(res);
        setPostData(null);
        form.reset();
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };
  return (
    <MDBContainer className="d-flex justify-content-center" style={{ marginTop: '10%' }} >
     
        <form onSubmit={handlePostPublish} style={{ width:'50%'}}>
        <p className="h1 text-center py-4 ">Add a Post</p>
        <label htmlFor="text" className="grey-text">
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              placeholder='Enter title'
              className="form-control"
              onChange={handleChange}
            />
           <br />
           <label htmlFor="text" className="grey-text">
              Body
            </label>
            <input
              type="text"
              id="text"
              name="text"
              placeholder='Enter text'
              className="form-control"
              onChange={handleChange}
            />
           <br />
           <label htmlFor="text" className="grey-text">
              Written By:
            </label>
            <input
              type="text"
              id="author"
              name="author"
              placeholder='Enter your name'
              className="form-control"
              onChange={handleChange}
            />
          
          <div className="text-center mt-4">
          <MDBBtn color='pink'  type='submit'>
            Publish!
          </MDBBtn>
          </div>
          </form>
          </MDBContainer>
   
   
  )
}
export default AddPost;