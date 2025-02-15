import React, { useState } from 'react';
// import * as sessionActions from '../../store/session';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import {createSpot} from '../../store/diveSpot.js'

import './NewSpot.css';


function NewDiveSpotPage(){
    
    const loggedUser = useSelector((state) => state.session.user);
    const [errors, setErrors] = useState([]);

    const [title, setTitle] = useState("");
    const [address, setAddress] = useState("");
    const [description, setDescription] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    
    const dispatch = useDispatch();

    const handleSubmit = (e) => {
        e.preventDefault();
        setErrors([]);
        return dispatch(createSpot({title, description, address, imageUrl, discoveredBy: loggedUser.id,}))
          .catch(async (res) => {
            const data = await res.json();
            if (data && data.errors) setErrors(data.errors);
          });
      }
    if(loggedUser){
        return (
            <div className="diveSpotWrapper">
                <div className="newSpotWrapper">
                    <h1>New Spot</h1>
                <form onSubmit={handleSubmit}  id="newSpotForm">
                    <span>Title</span>
                    <input id="title" name="title" onChange={(e) => setTitle(e.target.value)}></input>
                    <span>Address</span>
                    <input id="address" name="address" onChange={(e) => setAddress(e.target.value)}></input>
                    <span>Description</span>
                    <textarea id="description" name='description' onChange={(e) => setDescription(e.target.value)}/>
                    <span>Image URL</span>
                    <input id="imageUrl" name='imageUrl' onChange={(e) => setImageUrl(e.target.value)}/>
                    <button type='submit' id="submitbutton">Create New DiveSpot</button>
                </form>
                </div>
            </div>
        )
    }
    else{
        return (
            <div className="diveSpotWrapper">
            <div className="newSpotWrapper">
                <div className="redirectWrapper">
                    <h1>While I appreciate your enthusiasm,</h1>
                    <h2>you'll need to log in to post a new Spot</h2>
                    <div>
                    <Link to="/login">Log In</Link><span> or </span> <Link to="/signup">Sign Up</Link><span> here!</span>
                    </div>
                </div>
            </div>
            </div>
        )
    }
      
}

export default NewDiveSpotPage;