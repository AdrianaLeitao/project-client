import React from 'react';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../context/auth.context';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditProfile() {
    const {id} = useParams();
    const [imageProfile, setImageProfile] = useState("")
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [fileUrl, setFileUrl] = useState("");
    const [loading, setLoading] = useState(false);
   
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();


  const handleFileUpload = (e) => {
    setLoading(true);

    const uploadData = new FormData();

    uploadData.append("fileUrl", e.target.files[0]);

    axios
      .post(`${process.env.REACT_APP_API_URL}/api/upload`, uploadData)
      .then((response) => {
        console.log(response.data.fileUrl)
        setImageProfile(response.data.fileUrl);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log("Error while uploading the file: ", err);
      });
  };


    const getUser = async() => {
        try {
            const storedToken = localStorage.getItem('authToken')
            let response = await axios.get(`${process.env.REACT_APP_API_URL}/api/profile/${user._id}`, {
                headers: {
                        Authorization: `Bearer ${storedToken}`
                    },
            }
            );
            setImageProfile(response.data.imageProfile)
            setUsername(response.data.username);
            setEmail(response.data.email)
            setPassword(response.data.password)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUser();
    }, [user]);

    /* const handleImageProfile = (e) => setImageProfile(e.target.value) */
    const handleUsername = (e) => setUsername(e.target.value)
    const handleEmail = (e) => setEmail(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)

    const handleSubmit = (e) => {
        e.preventDefault();

        const body = { imageProfile, username, email, password };

        const storedToken = localStorage.getItem('authToken')

    axios.put(`${process.env.REACT_APP_API_URL}/api/profile/edit/${user._id}`, body,  {
        headers: {
                Authorization: `Bearer ${storedToken}`,
            }
    }
    )
    .then(() => {
        setImageProfile([]);
        setUsername('');
        setEmail('');
        setPassword('');
    
        navigate(`/profile/${id}`)
    })
    .catch((err) => console.log(err));
    };

    return (
        <div className='EditProfilePage'>
            <h3 className='edits'>Edit Profile</h3>
    
            <form onSubmit={handleSubmit}>
                <label id='login2' htmlFor="imageProfile">Select file:</label>
                {/* <input type="file" name="imageProfile" value={imageProfile} onChange={handleImageProfile} /> */}
                <input id='login1' type="file" onChange={(e) => handleFileUpload(e)} />

                <label id='login2' htmlFor="username">Username</label>
                <input id='login1' type="text" name="username" value={username} onChange={handleUsername} />
    
                <label id='login2' htmlFor="email">Email</label>
                <input id='login1' type="email" name="email" value={email} onChange={handleEmail} />

                <label id='login2' htmlFor="password">Password</label>
                <input id='login1' type="password" name="password" value={password} onChange={handlePassword} />
        
                <button className='bt' type='submit'>Edit Profile</button>
            </form>
        </div>
  );
}

export default EditProfile