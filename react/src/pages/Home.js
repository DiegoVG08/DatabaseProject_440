import axios from "axios";
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import CheckAuthButton from "../components/CheckAuthButton";

const Home = () => {

  const navigate = useNavigate();
  const [username, setUsername] = useState('Unknown');
  const [first_name, setFirstName] = useState('');
  const [last_name, setLastName] = useState('');
  const [message, setMessage] = useState('');


  useEffect(() => {

    const token = localStorage.getItem('access_token');

    if (!token) {

      navigate('/');
      return;

    }

    const storedUserData = localStorage.getItem('user_data');

    if (storedUserData) {

        const userData = JSON.parse(storedUserData);

        setUsername(userData.username);
        setFirstName(userData.first_name);
        setLastName(userData.last_name);

    }

    axios.get('http://127.0.0.1:8000/get-account-data/', {

        headers: {

          'Authorization': `Bearer ${token}`
        }

      })
      .then(response => {
        
      // If request is successful, populate state
        if (response.status === 200) {

          console.log("response data:", response.data);

          setUsername(response.data.username);
          setFirstName(response.data.first_name);
          setLastName(response.data.last_name);

        }
      })

  }, [navigate]);

  const sign_out = () => {

    axios.post('http://127.0.0.1:8000/logout/', {}, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('access_token')}`
      }
    })
    .then(() => {
      localStorage.removeItem("access_token");
      navigate('/');
    })
    .catch(error => {
      console.error("Error during sign-out!", error);
      localStorage.removeItem("access_token");
      navigate('/');
    });

  };

  return (
    <div id="container">
      <label>{message}</label>
      <h1>{first_name} <i>"{username}"</i> {last_name}</h1>
      <div id="button-div">
        <button onClick={sign_out} className='signout'>Sign Out</button>
        <CheckAuthButton/>
      </div>
    </div>
  )
}

export default Home;
