import React from 'react';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import AddGame from '../../components/AddGame/AddGame';

function GamePage() {
    const [games, setGames] = useState([])

    const getGames = async () => {
        try {
            const storedToken = localStorage.getItem('authToken')

            let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/games`, {
                headers: {
                    Authorization: `Bearer ${storedToken}`
                }
            })
            console.log(response.data)
            setGames(response.data);
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getGames();
    }, []);

  return (
    <div className='GamePage'>
        {games.map((game) => {
            return (
                <div key={game._id}>
                    <Link to={`/games/${game._id}`}>
                        <img src={game.img} alt="" />
                        <h3>{game.name}</h3>
                    </Link>
                </div>
            )
        })}
        
        <AddGame getGames = {getGames} />
    </div>
  )
}

export default GamePage