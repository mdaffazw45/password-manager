import React, { useState, useEffect } from 'react';
import { useParams , useNavigate } from 'react-router-dom'; // Import useParams from React Router
import { fetchDataById } from './fetchDataById';
import { Button } from '@mui/material';
import '../styles/Detail.scss'


const Detail = () => {
 const navigate = useNavigate();
 const { id } = useParams(); // Get the 'id' parameter from the URL
 const [posts, setPosts] = useState([]);

 const handleBackClick = () => {
    navigate(-1); // Navigate back to the previous page in the history stack
  };


 useEffect(() => {
    // Fetch data based on the 'id' from the URL using your fetchDataById function
    fetchDataById(id)
      .then(data => {
        setPosts(data);
      })
      .catch(error => {
        console.error("There was an error fetching the data", error);
      });
  }, [id]); // Include 'id' as a dependency to re-fetch data when it changes


 return (
    <div key={posts.id} className='detail-box'>
        <div>
          <p> Provider : {posts.provider}</p>
          <p> Email : {posts.email}</p>
          <p> Password : {posts.password}</p>
          <p>Category : {posts.category}</p>
          </div>
          <Button onClick={handleBackClick}>&larr; Back</Button>
          <Button onClick={handleBackClick}> Update</Button>
    </div>
  )
}

export default Detail
