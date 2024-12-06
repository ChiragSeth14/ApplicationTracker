import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../services/api';

function AddApplication() {
    const [formData, setFormData] = useState({
        submission_date: '',
        location: '',
        position: '',
        company_name: '',
        status: '',
        notes: '',
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.post('/applications', formData);
            alert('Application added successfully!');
            navigate('/dashboard');
        } catch (error) {
            alert('Error adding application.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Application</h2>
            {Object.keys(formData).map((field) => (
                <div key={field}>
                    <label>{field.replace('_', ' ')}</label>
                    <input
                        type="text"
                        value={formData[field]}
                        onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                        required={field !== 'notes'}
                    />
                </div>
            ))}
            <button type="submit">Add Application</button>
        </form>
    );
}

export default AddApplication;
