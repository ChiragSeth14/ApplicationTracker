import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function Signup() {
    const [formData, setFormData] = useState({ email: '', password: '', username: '', goal: '' });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/signup', formData);
            alert('Signup successful!');
            navigate('/');
        } catch (error) {
            alert(error.response.data.message || 'Error signing up.');
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
        </form>
    );
}

export default Signup;
