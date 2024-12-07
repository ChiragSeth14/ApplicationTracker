import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
function Signup() {
    const [formData, setFormData] = useState({ email: '', password: '', username: '', goal: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post('http://localhost:3000/signup', formData);
            localStorage.setItem('token', data.token);
            alert('Login successful!');
            navigate('/login');
        } catch (error) {
            console.error('Error details:', error);
            alert(error.response?.data?.message || 'An error occurred. Please try again.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Signup</h2>
            {['email', 'password', 'username', 'goal'].map((field) => (
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
            <button type="submit">Signup</button>
            <button onClick={() => navigate('/login')} style={{ marginTop: '10px' }}>
                Back to Login
            </button>
        </form>
    );
}

export default Signup;
