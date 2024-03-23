import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import './register.css'; 

function RegistrationForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('');
    const navigate = useNavigate();

    const validatePassword = (password) => {
        const regex = /^(?=.*[A-Z])(?=.*[0-9])(?=.*[@]).{8,}$/;
        return regex.test(password);
    };

    const handleSubmit = async(event) => {
        event.preventDefault();
        if (!validatePassword(password)) {
            alert('Password must contain at least 8 characters, including 1 uppercase letter, numbers, and the "@" symbol.');
            return;
        }
        const user  = {email, password,role};
        try {
            const response = await fetch("http://localhost:5000/api/register", {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(user),
            });
    
            if (response.status === 201) {
                const jsonResponse = await response.json();
                navigate('/login')
            } else {
                throw new Error('Registration failed');
            }
        } catch (error) {
            console.error('Error during registration:', error);
            alert(error.message);
        }
    };

    const handleLoginClick = () => {
        navigate('/login');
    };

    return (
        <form className="registration-form" onSubmit={handleSubmit}>
            <label>
                Email:
                <input 
                    className="input-field" 
                    type="email" 
                    value={email} 
                    onChange={(e) => setEmail(e.target.value)} 
                    required 
                />
            </label>
            <br />
            <label>
                Password:
                <input 
                    className="input-field" 
                    type="password" 
                    value={password} 
                    onChange={(e) => setPassword(e.target.value)} 
                    pattern="^(?=.*[A-Z])(?=.*[0-9])(?=.*[@]).{8,}$" 
                    title="Must contain at least 8 characters, including 1 uppercase letter, numbers, and the '@' symbol." 
                    required 
                />
            </label>
            <br />
            <label>
                Register as:
                <input 
                    type="radio" 
                    value="admin" 
                    checked={role === "admin"} 
                    onChange={(e) => setRole(e.target.value)} 
                /> Admin
                <input 
                    type="radio" 
                    value="team member" 
                    checked={role === "team member"} 
                    onChange={(e) => setRole(e.target.value)} 
                /> Team Member
            </label>
            <br />
            <button className="submit-button" type="submit">Register</button>
            <p className="login-link">Already have an account? <span onClick={handleLoginClick}>Sign in here</span></p>
        </form>
    );
}

export default RegistrationForm;
