import React from 'react';
import { useState, useEffect} from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

function EditProfile() {
    const [imageProfile, setImageProfile] = useState([])
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const {id} = useParams();
    const navigate = useNavigate();

    const getUser = async() => {
        try {
            let response = await axios.get(`${process.env.REACT_APP_API_URL}/profile/edit/${id}`)
            setImageProfile(response.data.imageProfile)
            setUsername(response.data.username)
            setEmail(response.data.email)
            setPassword(response.data.password)
        } catch (error) {
            console.log(error);
        }
    };

    useEffect(() => {
        getUser();
    }, []);

    const handleImageProfile = (e) => setImageProfile(e.target.value)
    const handleUsername = (e) => setUsername(e.target.value)
    const handleEmail = (e) => setEmail(e.target.value)
    const handlePassword = (e) => setPassword(e.target.value)

    const handleSubmit = (e) => {
        e.preventDefault()

        const body = { imageProfile, username, email, password };

    axios.put(`${process.env.REACT_APP_API_URL}/profile/edit/${id}`, body)
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
            <h3>Edit Profile</h3>
    
            <form onSubmit={handleSubmit}>
                <label htmlFor="imageProfile">Select file:</label>
                <input type="file" name="imageProfile" value={imageProfile} onChange={handleImageProfile} />

                <label htmlFor="username">Username</label>
                <input type="text" name="username" value={username} onChange={handleUsername} />
    
                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={email} onChange={handleEmail} />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={password} onChange={handlePassword} />
    
                <button type='submit'>Edit Profile</button>
            </form>
        </div>
  )
}

export default EditProfile