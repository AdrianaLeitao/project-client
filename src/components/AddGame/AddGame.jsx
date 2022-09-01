import React from 'react';
import { useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/auth.context';

function AddGame({getGames}) {
    const [img, setImg] = useState([])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
    const [howPlay, setHowPlay] = useState("")
    const [fileUrl, setFileUrl] = useState("");
    const [loading, setLoading] = useState(false);
    const {user} = useContext(AuthContext);

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

    /* const handleImg = (e) => setImg(e.target.value) */
    const handleName = (e) => setName(e.target.value)
    const handleDescription = (e) => setDescription(e.target.value)
    const handleHowPlay = (e) => setHowPlay(e.target.value)

    const handleSubmit = (e) => {
        e.preventDefault()

    const newGame = { img, name, description, howPlay, creator: user._id }

    axios.post(`${process.env.REACT_APP_API_URL}/api/games`, newGame)
    .then(() => {
        getGames();
    })
    .catch((err) => console.log(err));
    
    setImg([]);
    setName('');
    setDescription('');
    setHowPlay('');
    };

  return (
    <div className='AddGame'>
        <h3 className='adding'>Add Game</h3>

        <form onSubmit={handleSubmit}>
            <label id='login-d' htmlFor="image">Select file:</label>
            {/* <img src={img} alt="" onChange={handleImg} /> */}
            <input id='login-c' type="file" onChange={(e) => handleFileUpload(e)} />

            <label id='login-d' htmlFor="name">Name</label>
            <input id='login-e' type="text" name="name" value={name} onChange={handleName} />

            <label id='login-d1' htmlFor="description">Description</label>
            <input id='login-e1' type="text" name="description" value={description} onChange={handleDescription} />

            <label id='login-d1' htmlFor="howPlay">How to Play</label>
            <input id='login-e1' type="text" name='howPlay' value={howPlay} onChange={handleHowPlay} />

            <button id='link-a' type='submit'>Add Game</button>
        </form>
    </div>
  );
}

export default AddGame