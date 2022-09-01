import React from 'react';
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom'

function GameDetails() {
    const [games, setGames] = useState(null)

    const { id } = useParams();
    const navigate = useNavigate();
    
    const getGames = async() => {
        try {
            let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/games/${id}`)
            setGames(response.data)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getGames();
    }, []);

    const deleteGames = () => {
        axios.delete(`${process.env.REACT_APP_API_URL}/api/games/delete/${id}`)
        .then(() => {
            navigate('/games')
        })
        .catch((err) => console.log(err))
    };

  return (
    <div className='GameDetails'>
        {games && (
            <>
                <h1>{games.name}</h1>
                <p>{games.description}</p>

                {games.map((games) => (
                    <li className='GameCard card' key={games._id}>
                    <img src={games.img} alt="" />
                        <h3>{games.name}</h3>
                        <p>{games.description}</p>
                        <p>{games.howPlay}</p>
                    </li>
        ))}
            </>
        )}

        <Link to={`/games/edit/${id}`}>
            <button className='bt1'>Edit Game</button>
        </Link>

        <Link to="/games">
            <button className='bt1' onCanPlay={deleteGames}>Delete</button>
        </Link>

    </div>
  )
}

export default GameDetails