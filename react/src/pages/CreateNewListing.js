import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Navbar from '../components/Navbar/Navbar'

import '../styles/CreateNewListing.css'

const CreateNewListing = () => {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [price, setPrice] = useState('');
    const [category, setCategory] = useState('');
    const navigate = useNavigate();

    const create = async () => {
        
        var categories = category.split(',');

        const userdata = JSON.parse(localStorage.getItem('user_data'));
        // console.log(userdata);

        const token = localStorage.getItem('access_token');

        console.log("title: " + title);
        console.log("description: " + description);
        console.log("price: " + price);
        console.log("categories: " + categories);
        console.log("id: " + userdata.id);

        try {
            const response = await axios.post('http://127.0.0.1:8000/create-item/', {
                title,
                description,
                price,
                categories,
                user: userdata.id,
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,  // Replace 'token' with your actual token variable
                }
            });
            
            if (response.status === 200) {
                console.log('Item created:', response.data);
            }
        } catch (error) {
            console.log('Error during item creation!', error);
        }
    }

    const redirect = () => {
        navigate('/home');
    }

    const test = async () => {

        try {
            const response = await axios.get('http://127.0.0.1:8000/phasetwotest/');
            
            if (response.status === 200) {
                console.log(response.data);
            }

        } catch (error) {

            console.log('Error', error);
        }
    }

  return (
    
    <div className='container'>
        <Navbar></Navbar>
        <h1>Create a new listing:</h1>
        <div class='item-form'>
            <div class='input-div'>

                <label class='input-label'>Title</label>
                <input class='input-field'

                type = "text"
                placeholder="i.e. Smartphone"
                onChange={e => { setTitle(e.target.value); }}


                />

            </div>

            <div class='input-div'>

                <label class='input-label'>Description</label>
                <textarea class='input-field'

                type = "text"
                placeholder="i.e. This is the new iPhone 15 Pro Max"
                onChange={e => { setDescription(e.target.value); }}

                />

            </div>

            <div class='input-div'>

                <label class='input-label'>Categories</label>
                <textarea class='input-field'

                type = "text"
                placeholder="seperated by commas i.e. Electronics, Phones, Apple"
                onChange={e => { setCategory(e.target.value); }}

                />

            </div>

            <div class='input-div'>

                <label class='input-label'>Price</label>
                <input class='input-field'

                type = "text"
                placeholder="i.e. 1000"
                onChange={e => { setPrice(e.target.value); }}

                />

            </div>
            <div className='button-div'>
                <button onClick={create}>Create New Listing</button>
                <button onClick={redirect}>Go Back</button>
                {/* <button onClick={test}>test</button> */}
            </div>
            
        </div>
    </div>
  )
}

export default CreateNewListing