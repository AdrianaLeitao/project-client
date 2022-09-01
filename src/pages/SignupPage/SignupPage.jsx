import React from 'react';
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

function SignupPage() {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [country, setCountry] = useState('')
    const [imageProfile, setImageProfile] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)
    const [countries, setCountries] = useState([])
    const [loading, setLoading] = useState(false);


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

    const navigate = useNavigate();

    const handleUsername = (e) => setUsername(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleCountry = (e) => setCountry(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();

        const body = { username, email, password, country, imageProfile }

        axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signup`, body)
        .then(() => {
            navigate('/login');
        })
        .catch((err) => {
            console.log(err)
            setErrorMessage(err.response.data.errorMessage);
        })
    }

    const getCountries = async() => {
        try {
            let response = await axios.get(`${process.env.REACT_APP_EXTERNAL_URL}`)
            const countryNames = response.data.map((country) => country.name.common)
            setCountries(countryNames.sort())
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getCountries()
    }, [])

    return(
        <div className="SignupPage">
            <h1>Signup</h1>

            <form onSubmit={handleSubmit}>
                <label id='login-b' htmlFor="imageProfile">Select image Profile:</label>
                {/* <input type="file" name="imageProfile" value={imageProfile} onChange={handleImageProfile} /> */}
                <input id='login-c' type="file" onChange={(e) => handleFileUpload(e)} />

                <label id='login-b' htmlFor="username">Username</label>
                <input id='login-a' type="text" name="username" value={username} onChange={handleUsername} />

                <label id='login-b' htmlFor="email">Email</label>
                <input id='login-a' type="email" name="email" value={email} onChange={handleEmail} />

                <label id='login-b' htmlFor="password">Password</label>
                <input id='login-a' type="password" name="password" value={password} onChange={handlePassword} />

                <label id='login-b' htmlFor="country">Country</label>
            <select name="country" id="country" onChange={handleCountry}>
                {countries.map((country) => <option key={country} value={country}>{country}</option> )}
            </select>

                <button id='btn-a' type="submit">Sign Up</button>
            </form>

            {errorMessage && (<p>{errorMessage}</p>)}

            <h5 className='account'>Already have an account?</h5>
            <Link id='link-a' to="/login">Login</Link>
        </div>
    )
}

export default SignupPage