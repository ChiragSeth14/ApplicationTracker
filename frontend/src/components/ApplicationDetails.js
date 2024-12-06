import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import API from '../services/api';

function ApplicationDetails() {
    const { id } = useParams();
    const [application, setApplication] = useState({ status: '' });
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApplication = async () => {
            try {
                const { data } = await API.get(`/applications/${id}`);
                setApplication(data);
            } catch (error) {
                alert('Error fetching application details.');
            }
        };

        fetchApplication();
    }, [id]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await API.put(`/applications/${id}`, application);
            alert('Application updated successfully!');
            navigate('/dashboard');
        } catch (error) {
            alert('Error updating application.');
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Application Details</h2>
            <div>
                <label>Status</label>
                <input
                    type="text"
                    value={application.status}
                    onChange={(e) => setApplication({ ...application, status: e.target.value })}
                />
            </div>
            <button type="submit">Update Status</button>
        </form>
    );
}

export default ApplicationDetails;
