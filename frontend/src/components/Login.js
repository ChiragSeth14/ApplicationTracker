import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:3000/login', formData);
            localStorage.setItem('token', data.token);
            alert('Login successful!');
            navigate('/dashboard');
        } catch (error) {
            console.error('Error details:', error);
            alert(error.response?.data?.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Login</h2>
            {error && <div style={{ color: 'red' }}>{error}</div>}
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
            <button onClick={() => navigate('/signup')} style={{ marginTop: '10px' }}>
                Signup
            </button>
        </form>
    );
}

export default Login;
