import React from 'react';
import { useState, useEffect} from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';


function EditDance() {
    const [image, setImage] = useState([])
    const [name, setName] = useState('')
    const [description, setDescription] = useState('')
    const [video, setVideo] = useState([])
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

    const getDance = async() => {
        try {
            let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/dance/${id}`)
            setImage(response.data.image)
            setName(response.data.name)
            setDescription(response.data.description)
            setVideo(response.data.video)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getDance();
    }, []);

    /* const handleImage = (e) => setImage(e.target.value) */
    const handleName = (e) => setName(e.target.value)
    const handleDescription = (e) => setDescription(e.target.value)
    /* const handleVideo = (e) => setVideo(e.target.value) */

    const handleSubmit = (e) => {
        e.preventDefault()

        const body = { image, name, description, video };

    axios.put(`${process.env.REACT_APP_API_URL}/api/dance/${id}`, body)
    .then(() => {
        setImage([]);
        setName('');
        setDescription('');
        setVideo([]);
    
        navigate(`/dance/${id}`)
    })
    .catch((err) => console.log(err));
    };

    return (
        <div className='EditDancePage'>
            <h3 className='edits'>Edit Dance</h3>
    
            <form onSubmit={handleSubmit}>
                <label id='login2' htmlFor="image">Select file:</label>
                {/* <input type="file" name="image" value={image} onChange={handleImage} /> */}
                <input id='login1' type="file" onChange={(e) => handleFileUpload(e)} />

                <label id='login2' htmlFor="name">Name</label>
                <input id='login1' type="text" name="name" value={name} onChange={handleName} />
    
                <label id='login2' htmlFor="description">Description</label>
                <input id='login1' type="text" name="description" value={description} onChange={handleDescription} />

                <label id='login2' htmlFor="video">Video</label>
                {/* <input type="file" name="video" value={video} onChange={handleVideo} /> */}
                <input id='login1' type="file" onChange={(e) => handleFileUpload(e)} />
    
                <button className='bt' type='submit'>Edit Dance</button>
            </form>
        </div>
      );
}

export default EditDance