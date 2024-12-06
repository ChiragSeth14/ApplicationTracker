import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await API.post('/login', formData);
            localStorage.setItem('token', data.token);
            alert('Login successful!');
            navigate('/dashboard');
        } catch (error) {
            console.error('Error details:', error); // Log the entire error object
            alert(error.response?.data?.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            {['email', 'password'].map((field) => (
                <div key={field}>
                    <label>{field}</label>
                    <input
                        type={field === 'password' ? 'password' : 'text'}
                        value={formData[field]}
                        onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                        required
                    />
                </div>
            ))}
            <button type="submit">Login</button>
        </form>
    );
}

export default Login;
