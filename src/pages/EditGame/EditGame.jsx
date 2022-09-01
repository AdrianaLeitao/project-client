import React from 'react';
import { useState, useEffect} from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditGame() {
    const [img, setImg] = useState([])
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [howPlay, setHowPlay] = useState('')
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

    const {id} = useParams();
    const navigate = useNavigate();

    const getGame = async() => {
        try {
            let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/games/${id}`)
            setImg(response.data.img)
            setName(response.data.name)
            setDescription(response.data.description)
            setHowPlay(response.data.howPlay)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getGame();
    }, []);

    /* const handleImg = (e) => setImg(e.target.value) */
    const handleName = (e) => setName(e.target.value)
    const handleDescription = (e) => setDescription(e.target.value)
    const handleHowPlay = (e) => setHowPlay(e.target.value)

    const handleSubmit = (e) => {
        e.preventDefault()

        const body = { img, name, description, howPlay };

    axios.put(`${process.env.REACT_APP_API_URL}/api/games/${id}`, body)
    .then(() => {
        setImg([]);
        setName('');
        setDescription('');
        setHowPlay('');
    
        navigate(`/games/${id}`)
    })
    .catch((err) => console.log(err));
    };

    return (
        <div className='EditGamePage'>
            <h3 className='edits'>Edit Game</h3>
    
            <form onSubmit={handleSubmit}>
                <label id='login2' htmlFor="img">Select file:</label>
                {/* <input type="file" name="img" value={img} onChange={handleImg} /> */}
                <input id='login1' type="file" onChange={(e) => handleFileUpload(e)} />

                <label id='login2' htmlFor="name">Name</label>
                <input id='login1' type="text" name="name" value={name} onChange={handleName} />
    
                <label id='login2' htmlFor="description">Description</label>
                <input id='login1' type="text" name="description" value={description} onChange={handleDescription} />

                <label id='login2' htmlFor="howPlay">How to Play</label>
                <input id='login1' type="text" name='howPlay' value={howPlay} onChange={handleHowPlay} />
    
                <button className='bt' type='submit'>Edit Game</button>
            </form>
        </div>
      );
}

export default EditGame