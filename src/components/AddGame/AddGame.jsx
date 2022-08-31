import React from 'react';
import { useState } from 'react';
import axios from 'axios';

function AddGame({getGames}) {
    const [img, setImg] = useState([])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [howPlay, setHowPlay] = useState("")
   /*  const [extinct, setExtinct] = useState(true) */
    const [fileUrl, setFileUrl] = useState("");
    const [loading, setLoading] = useState(false);


  const handleFileUpload = (e) => {
    setLoading(true);

    const uploadData = new FormData();

    uploadData.append("fileUrl", e.target.files[0]);

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/upload`, uploadData)
      .then((response) => {
        console.log(response.data.fileUrl)
        setFileUrl(response.data.fileUrl);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log("Error while uploading the file: ", err);
      });
  };

    const handleImg = (e) => setImg(e.target.value)
    const handleName = (e) => setName(e.target.value)
    const handleDescription = (e) => setDescription(e.target.value)
    const handleHowPlay = (e) => setHowPlay(e.target.value)
    /* const handleExtinct = (e) => setExtinct(e.target.value) */

    const handleSubmit = (e) => {
        e.preventDefault()

    const newGame = { img, name, description, howPlay, extinct }

    axios.post(`${process.env.REACT_APP_API_URL}/api/game`, newGame)
    .then(() => {
        getGames();
    })
    .catch((err) => console.log(err));
    
    setImg([]);
    setName('');
    setDescription('');
    setHowPlay('');
    /* setExtinct(true); */
    };

  return (
    <div className='AddGame'>
        <h3>Add Game</h3>

        <form onSubmit={handleSubmit}>
            
            <img src={img} alt="" onChange={handleImg} />
            <input type="file" onChange={(e) => handleFileUpload(e)} />

            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={name} onChange={handleName} />

            <label htmlFor="description">Description</label>
            <input type="text" name="description" value={description} onChange={handleDescription} />

            <label htmlFor="howPlay">How to Play</label>
            <input type="text" name='howPlay' value={howPlay} onChange={handleHowPlay} />

           {/*  <img src={} alt="" onChange={handleExtinct} /> */}

            <button type='submit'>Add Game</button>
        </form>
    </div>
  );
}

export default AddGame