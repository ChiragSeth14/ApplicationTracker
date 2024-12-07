import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';

function UpdateApplicationStatus() {
    const { id } = useParams(); // Get application ID from URL
    const [status, setStatus] = useState(''); // Track the selected status
    const navigate = useNavigate();

    const validStatuses = [
        'Applied',
        'Interview Scheduled',
        'Interview Completed',
        'Offer Received',
        'Rejected',
    ];

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
        appearance: 'none',
        WebkitAppearance: 'none',
        MozAppearance: 'none',
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const token = localStorage.getItem('token'); // Get authentication token
            if (!token) {
                // alert('User not authenticated. Redirecting to login.');
                navigate('/login');
                return;
            }

            const { data } = await axios.patch(
                `http://localhost:3000/applications/${id}/status`,
                { status },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // alert(data.message || 'Application status updated successfully!');
            navigate('/dashboard'); // Redirect to dashboard
        } catch (error) {
            console.error('Error updating application status:', error);
            // alert(error.response?.data?.message || 'Failed to update application status.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Update Application Status</h2>
            <div>
                <label>Status</label>
                <select
                    value={status}
                    onChange={(e) => setStatus(e.target.value)} // Update the status state
                    required
                    style={dropdownStyle}
                >
                    <option value="" disabled>
                        Select Status
                    </option>
                    {validStatuses.map((statusOption) => (
                        <option key={statusOption} value={statusOption}>
                            {statusOption}
                        </option>
                    ))}
                </select>
            </div>
            <button type="submit">Update Status</button>
        </form>
    );
}

export default UpdateApplicationStatus;
