import React from 'react';
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'

function DanceDetails() {
    const [dance, setDances] = useState(null)

    const { id } = useParams();
    const navigate = useNavigate();
    
    const getDances = async() => {
        try {
            let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/dance/${id}`)
            setDances(response.data)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getDances();
    }, []);

    const deleteDance = () => {
        axios.delete(`${process.env.REACT_APP_API_URL}/api/dance/${id}`)
        .then(() => {
            navigate('/dance')
        })
        .catch((err) => console.log(err))
    };

  return (
    <div className='DanceDetails'>
        {dance && (
            <>
                <h1>{dance.name}</h1>
                <p>{dance.description}</p>

                {dance.map((dance) => (
                    <li className='DanceCard card' key={dance._id}>
                    <img src={dance.image} alt="" />
                        <h3>{dance.name}</h3>
                        <p>{dance.description}</p>
                        <p>{dance.video}</p>
                    </li>
        ))}
            </>
        )}

        <Link to={`/dance/edit/${id}`}>
            <button>Edit Dance</button>
        </Link>

        <Link to="/dance">
            <button onClick={deleteDance}>Delete</button>
        </Link>

    </div>
  )
}

export default DanceDetails