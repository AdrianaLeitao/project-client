import { useState } from 'react';
import axios from 'axios';

function AddDance({getDances}) {
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")

    const handleName = (e) => setName(e.target.value)
    const handleDescription = (e) => setDescription(e.target.value)

    const handleSubmit = (e) => {
        e.preventDefault()

    const newDance = { name, description }

    axios.post(`${process.env.REACT_APP_API_URL}/api/dance`, newDance)
    .then(() => {
        getDances();
    })
    .catch((err) => console.log(err));
    
    setName('');
    setDescription('');
    };

  return (
    <div className='AddDance'>
        <h3>Add Dance</h3>

        <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={name} onChange={handleName} />

            <label htmlFor="description">Description</label>
            <input type="text" name="description" value={description} onChange={handleDescription} />

            <button type='submit'>Add Dance</button>
        </form>
    </div>
  );
}

export default AddDance