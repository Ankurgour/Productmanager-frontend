import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css'; 

function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/api/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json'},
                body: JSON.stringify({ email, password }),
            });
            if (!response.ok) throw new Error('Login failed');
            const res = await response.json();

            localStorage.setItem('user', JSON.stringify(res.user));
            localStorage.setItem('token', res.token);
            navigate('/dashboard');
        } catch (error) {
            console.error('Login Error:', error);
        }
    };

    const handleSignupClick = () => {
        navigate('/register'); 
    };

    return (
        <form className="login-form" onSubmit={handleSubmit}>
            <label>
                Email:
                <input className="input-field" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </label>
            <br />
            <label>
                Password:
                <input className="input-field" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </label>
            <br />
            <button className="submit-button" type="submit">Login</button>
            <p className="signup-link">Don't have an account? <span onClick={handleSignupClick}>Sign up here</span></p>
        </form>
    );
}

export default LoginForm;
