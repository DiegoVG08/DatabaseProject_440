import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './CreateComment.css';

const CreateComment = ({ username, item, item_id }) => {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState('fair');

  // Observe changes to the 'rating' state
  useEffect(() => {
    console.log("Updated rating:", rating);
  }, [rating]);

  const create_comment = async () => {
    const token = localStorage.getItem('access_token');

    console.log('Creating comment:', comment);
    console.log('item_id:', item_id);
    console.log('username:', username);
    console.log('rating:', rating); 

    try {
      const response = await axios.post('http://127.0.0.1:8000/create-comment/', {
        item: item_id,
        username,
        rating,
        comment,
      }, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });

      if (response.status === 201) {
        console.log('Comment Created!');
        console.log(response.data);
      }
    } catch (error) {
      console.log('Error during comment creation!', error);
    }
  };

  return (
    <div className='comment_div'>
      {username && item && (
        <h2>{username}'s {item}</h2>
      )}

      <select 
        name="rating" 
        className="rating_list" 
        value={rating}  // Bind the rating state to the select value
        onChange={e => {
          console.log("Setting rating to:", e.target.value);
          setRating(e.target.value);
        }}
      >
        <option value="excellent">excellent</option>
        <option value="good">good</option>
        <option value="fair">fair</option>
        <option value="poor">poor</option>
      </select>

      <textarea 
        className='comment_textarea'
        type="text"
        placeholder="i.e. This iPhone is pretty neato!"
        onChange={e => { setComment(e.target.value); }}
      />

      <button className='comment_submit' onClick={create_comment}>submit</button>
    </div>
  );
}

export default CreateComment;
