import React from 'react';
import { useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/auth.context";
import { useNavigate, Link } from "react-router-dom";

function LoginPage() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [errorMessage, setErrorMessage] = useState(null)

    const navigate = useNavigate();
    const { storeToken, authenticateUser } = useContext(AuthContext)


    const handleUsername = (e) => setUsername(e.target.value);
    const handlePassword = (e) => setPassword(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();

        const body = { username, password }

        axios.post(`${process.env.REACT_APP_API_URL}/api/auth/login`, body)
        .then((response) => {
            storeToken(response.data.authToken);
            authenticateUser();
            navigate('/');
        })
        .catch((err) => {
            setErrorMessage(err.response.data.errorMessage);
        })
    }

    return(
        <div className="LoginPage">
            <h1>Login</h1>

            <form onSubmit={handleSubmit}>
                <label id='login-b' htmlFor="username">Username</label>
                <input id='login-a' type="text" name="username" value={username} onChange={handleUsername} />

                <label id='login-b' htmlFor="password">Password</label>
                <input id='login-a' type="password" name="password" value={password} onChange={handlePassword} />

                <button id='btn-a' type="submit">Login</button>
            </form>

            {errorMessage && (<p>{errorMessage}</p>)}

            <h5 className='account'>Don't have an account?</h5>
            <Link id='link-a' to="/signup">Sign Up</Link>
        </div>
    )
}

export default LoginPage