import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Profile() {
        const [user, setUser] = useState('')
    
        const getUser = async () => {
            try {
                const storedToken = localStorage.getItem('authToken')
    
                let response = await axios.get(`${process.env.REACT_APP_API_URL}/profile/:userId`, {
                    headers: {
                        Authorization: `Bearer ${storedToken}`
                    }
                })
                setUser(response.data);
            } catch (error) {
                console.log(error)
            }
        }
    
        useEffect(() => {
            getUser();
        }, []);
    
      return (
        <div className='UserPage'>
            {user.map((user) => {
                return (
                    <div className="ProfileCard card" key={user._id}>
                        <Link to={`/profile/${user._id}`}>
                            <img src={user.img} alt="" />
                            <h3>{user.name}</h3>
                        </Link>
                    </div>
                )
            })}
        </div>
      )
    }

export default Profile