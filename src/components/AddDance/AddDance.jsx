import React from 'react';
import { useState } from 'react';
import axios from 'axios';

function AddDance({getDances}) {
    const [image, setIamge] = useState([])
    const [name, setName] = useState("")
    const [description, setDescription] = useState("")
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

    /* const handleImage = (e) => setIamge(e.target.value) */
    const handleName = (e) => setName(e.target.value)
    const handleDescription = (e) => setDescription(e.target.value)
    /* const handleVideo = (e) => setVideo(e.target.value) */

    const handleSubmit = (e) => {
        e.preventDefault()

    const newDance = { image, name, description, video }

    axios.post(`${process.env.REACT_APP_API_URL}/api/dance`, newDance)
    .then(() => {
        getDances();
    })
    .catch((err) => console.log(err));
    
    setIamge([]);
    setName('');
    setDescription('');
    setVideo([]);
    };

  return (
    <div className='AddDance'>
        <h3 className='adding'>Add Dance</h3>

        <form onSubmit={handleSubmit}>
            {/* <img src={image} alt="" onChange={handleImage} /> */}
            <input  id='login-c' type="file" onChange={(e) => handleFileUpload(e)} />

            <label id='login-d' htmlFor="name">Name</label>
            <input id='login-e' type="text" name="name" value={name} onChange={handleName} />

            <label id='login-d1' htmlFor="description">Description</label>
            <input id='login-e1' type="text" name="description" value={description} onChange={handleDescription} />

            {/* <video src={video} onChange={handleVideo} /> */}
            <input id='login-e' type="file" onChange={(e) => handleFileUpload(e)} />
            
            <button id='link-a' type='submit'>Add Dance</button>
        </form>
    </div>
  );
}

export default AddDance