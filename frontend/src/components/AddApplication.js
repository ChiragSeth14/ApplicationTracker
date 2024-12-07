import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import './AddApplication.css';

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
            const token = localStorage.getItem('token'); // Get the token from localStorage
            if (!token) {
                // alert('User not authenticated. Redirecting to login.');
                navigate('/login');
                return;
            }
            await axios.post('http://localhost:3000/applications', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            // alert('Application added successfully!');
            navigate('/dashboard');
        } catch (error) {
            console.error('Error adding application:', error);
            // alert(
            //     error.response?.data?.message || 'Failed to add application. Please try again.'
            // );
        }
    };
    const dropdownStyle = {
        width: '100%',
        padding: '12px',
        borderRadius: '8px',
        border: '1px solid #ccc',
        fontSize: '1rem',
        cursor: 'pointer',
        backgroundColor: '#f9f9f9',
        position: 'relative',
        backgroundImage: `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='10' height='10' viewBox='0 0 24 24' fill='none' stroke='gray' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'><polyline points='6 9 12 15 18 9'></polyline></svg>")`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'right 15px center',
        backgroundSize: '10px',
        appearance: 'none', // Remove native dropdown arrow
        WebkitAppearance: 'none',
        MozAppearance: 'none',
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Add New Application</h2>
            {Object.keys(formData).map((field) => (
                <div key={field} className="form-group">
                    <label>{field.replace('_', ' ')}</label>
                    {field === 'status' ? (
                        <select
                            value={formData[field]}
                            onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                            required
                            style={dropdownStyle}
                        >
                            <option value="" disabled>
                                Select status
                            </option>
                            <option value="Applied">Applied</option>
                            <option value="Interview Scheduled">Interview Scheduled</option>
                            <option value="Interview Completed">Interview Completed</option>
                            <option value="Offer Received">Offer Received</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    ) : (
                        <input
                            type={field === 'submission_date' ? 'date' : 'text'} // Use date picker for submission_date
                            value={formData[field]}
                            onChange={(e) => setFormData({ ...formData, [field]: e.target.value })}
                            required={field !== 'notes'} // Only 'notes' field is optional
                            className="input-field"
                        />
                    )}
                </div>
            ))}
            <button type="submit" className="submit-button">Add Application</button>
        </form>
    );
}

export default AddApplication;
