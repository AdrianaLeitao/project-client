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

    const navigate = useNavigate();

    const handleUsername = (e) => setUsername(e.target.value);
    const handleEmail = (e) => setEmail(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);
    const handleCountry = (e) => setCountry(e.target.value);
    const handleImageProfile = (e) => setImageProfile(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();

        const body = { username, email, password, country, imageProfile }

        axios.post(`${process.env.REACT_APP_API_URL}/api/auth/signup`, body)
        .then(() => {
            navigate('/login');
        })
        .catch((err) => {
            setErrorMessage(err.response.data.errorMessage);
        })
    }

    const getCountries = async() => {
        try {
            let response = await axios.get(`${process.env.REACT_APP_EXTERNAL_URL}`)
            const countryNames = response.data.map((country) => country.name.common)
            setCountries(countryNames)
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
                <label htmlFor="username">Username</label>
                <input type="text" name="username" value={username} onChange={handleUsername} />

                <label htmlFor="email">Email</label>
                <input type="email" name="email" value={email} onChange={handleEmail} />

                <label htmlFor="password">Password</label>
                <input type="password" name="password" value={password} onChange={handlePassword} />

                <label htmlFor="country">Country</label>
            <select name="country" id="country" onChange={handleCountry}>
                {countries.map((country) => <option key={country} value={country}>{country}</option> )}

            </select>

                <label htmlFor="imageProfile">Select file:</label>
                <input type="file" name="imageProfile" value={imageProfile} onChange={handleImageProfile} />

                <button type="submit">Sign Up</button>
            </form>

            {errorMessage && (<p>{errorMessage}</p>)}

            <h5>Already have an account?</h5>
            <Link to="/login">Login</Link>
        </div>
    )
}

export default SignupPage