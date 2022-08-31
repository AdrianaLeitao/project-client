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
        <h3>Add Dance</h3>

        <form onSubmit={handleSubmit}>
            {/* <img src={image} alt="" onChange={handleImage} /> */}
            <input type="file" onChange={(e) => handleFileUpload(e)} />

            <label htmlFor="name">Name</label>
            <input type="text" name="name" value={name} onChange={handleName} />

            <label htmlFor="description">Description</label>
            <input type="text" name="description" value={description} onChange={handleDescription} />

            {/* <video src={video} onChange={handleVideo} /> */}
            <input type="file" onChange={(e) => handleFileUpload(e)} />
            
            <button type='submit'>Add Dance</button>
        </form>
    </div>
  );
}

export default AddDance