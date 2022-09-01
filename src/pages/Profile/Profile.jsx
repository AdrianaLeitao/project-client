import React from 'react';
import { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import {AuthContext} from "../../context/auth.context";

function Profile() {
        const {id} = useParams();
        const [profile, setProfile] = useState('')
        const {user} = useContext(AuthContext)
        const getProfile = async () => {
            try {
                const storedToken = localStorage.getItem('authToken')
    
                let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/profile/${user._id}`, {
                    headers: {
                        Authorization: `Bearer ${storedToken}`
                    }
                })
                /* console.log(response.data) */
                setProfile(response.data)
            } catch (error) {
                console.log(error)
            }
        }
    
        useEffect(() => {
            getProfile();
        }, []);
    
      return (
        <>
        {profile &&
          <div className='ProfilePage'>
          <img id='img' src={profile.imageProfile} alt=""  />
          <h1>{profile.username}</h1>
          <p>{profile.email}</p>
          <Link to={`/profile/edit/${profile._id}`}>
            <button id='btn-b'>Edit</button>
          </Link>
        </div>}

  
         {/*  <Link to={`/api/games`}>
            <button>Add Game</button>
          </Link>
        

          <Link to={`/api/dance`}>
            <button>Add Dance</button>
          </Link> */}
          

          <h2>My Traditions</h2>
        </>
      )
    }

export default Profile