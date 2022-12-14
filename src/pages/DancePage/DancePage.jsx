import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddDance from '../../components/AddDance/AddDance';

function DancePage() {
    const [dances, setDances] = useState([])

    const getDances = async () => {
        try {
            const storedToken = localStorage.getItem('authToken')

            let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/dance`, {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }
            })
            setDances(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getDances();
    }, []);

  return (
    <div className='DancePage'>
        {dances.map((dance) => {
            return (
                <div key={dance._id}>
                    <Link to={`/dance/${dance._id}`}>
                        <img src={dance.image} alt="" />
                        <h3>{dance.name}</h3>
                    </Link>
                </div>
            )
        })}
        
        <AddDance getDances = {getDances} />
    </div>
  )
}

export default DancePage