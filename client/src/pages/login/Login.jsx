import { accessToken, getAccessToken, setAccessToken } from "../../accessToken";
import { fetchApi } from "../../util/Helpers";
import "./Login.css";
import React from 'react';

export default function Login() {
    const [email, setEmail] = React.useState('');
    const [pw, setPw] = React.useState('');
    const [error, setError] = React.useState('');

    async function handleLogin() {
        try {
            const body = {
                email: email,
                password: pw
            };

            const response = await fetchApi("POST", "/api/v1/auth/login", body);
            const result = await response.json();
            if (!response.ok) {
                setError("Incorect email or password!");
            } else {
                setError('');
                setAccessToken(result.accessToken);
            }
            console.log(result);
        } catch (error) {
            console.log("Error: ", error);
        }
    }

    return <div className="login-form">        
        <p>Email</p>
        <input type='email' value={email} onChange={e => setEmail(e.target.value)}></input>
        <p>Password</p>
        <input type='password' value={pw} onChange={e => setPw(e.target.value)}></input>
        {error && <p className="error-msg">*{error}</p>}
        <button className='login-button' onClick={handleLogin}>Login</button>
    </div>
}