import React from 'react';
import "./Register.css";
import { fetchApi } from '../../util/Helpers';
import { EMAIL_REGEX, PASS_REGEX } from '../../util/AppConstants';
import { setAccessToken } from '../../accessToken';

export default function Register() {
    const [email, setEmail] = React.useState('');
    const [pw, setPw] = React.useState('');
    const [confirmPw, setconfirmPw] = React.useState('');
    const [error, setError] = React.useState('');

    const body = {
        email: email,
        password: pw,
    }

    function validatePassword() {
        if (!PASS_REGEX.test(pw.trim())) {
            setError("Passwords must be at least 8 characters long!");
            return false;
        }
        if (pw.toLowerCase() !== confirmPw.toLowerCase()) {
            setError("Passwords do not match!");
            return false;
        }
        return true;
    }

    function validateEmail() {
        if (!EMAIL_REGEX.test(email.trim().toLowerCase())) {
            setError("Please enter a valid email!");
            return false;
        }
        return true;
    }

    function validation() {
        if (validateEmail() && validatePassword()) {
            return true;
        }
    }

    async function handleRegister() {
        if (!validation()) {
            return;
        }
        try {
            const response = await fetchApi('POST', '/api/v1/auth/register', body);
            const result = await response.json();

            if (!response.ok) {
                setError(result.errorReason);
            } else {
                setError("");
                setAccessToken(result.accessToken);
            }
            console.log(result);
        } catch (e) {
            console.log('Error:', e);
        }
    }

    return <div className="register-form">        
        <p>Email</p>
        <input type="email" value={email} onChange={e => setEmail(e.target.value)}></input>
        <p>Password</p>
        <input type="password" value={pw} onChange={e => setPw(e.target.value)}></input>
        <p>Confirm Password</p>
        <input type="password" value={confirmPw} onChange={e => setconfirmPw(e.target.value)}></input>
        {error && <p className="error-msg">*{error}</p>}
        <button className='register-button' onClick={handleRegister}>Register</button>
    </div>
}