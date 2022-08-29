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
        axios.delete(`${process.env.REACT_APP_API_URL}/api/games/${id}`)
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

                {games.map((game) => (
                    <li className='GameCard card' key={game._id}>
                    <img src={game.img} alt="" />
                        <h3>{game.name}</h3>
                        <p>{game.description}</p>
                        <p>{game.howPlay}</p>
                    </li>
        ))}
            </>
        )}

        <Link to={`/games/edit/${id}`}>
            <button>Edit Game</button>
        </Link>

        <Link to="/games">
            <button onCanPlay={deleteGames}>Delete</button>
        </Link>

    </div>
  )
}

export default GameDetails