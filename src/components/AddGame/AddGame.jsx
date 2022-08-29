import { useState } from 'react';
import axios from 'axios';

function AddGame({getGames}) {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [howPlay, setHowPlay] = useState("")

    const handleName = (e) => setName(e.target.value)
    const handleDescription = (e) => setDescription(e.target.value)
    const handleHowPlay = (e) => setHowPlay(e.target.value)

    const handleSubmit = (e) => {
        e.preventDefault()

    const newGame = { name, description }

    axios.post(`${process.env.REACT_APP_API_URL}/api/game`, newGame)
    .then(() => {
        getGames();
    })
    .catch((err) => console.log(err));
    
    setName('');
    setDescription('');
    setHowPlay('');
    };

  return (
    <div className='AddGame'>
        <h3>Add Game</h3>

        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={name} onChange={handleName} />

            <label htmlFor="description">Description</label>
            <input type="text" name="description" value={description} onChange={handleDescription} />

            <label htmlFor="howPlay">How to Play</label>
            <input type="text" name='howPlay' value={howPlay} onChange={handleHowPlay} />

            <button type='submit'>Add Game</button>
        </form>
    </div>
  );
}

export default AddGame