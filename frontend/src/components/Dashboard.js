import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import API from '../services/api';

function Dashboard() {
    const [applications, setApplications] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const { data } = await API.get('/applications');
                setApplications(data);
            } catch (error) {
                alert('Error fetching applications.');
            }
        };

        fetchApplications();
    }, []);

    const handleDelete = async (id) => {
        try {
            await API.delete(`/applications/${id}`);
            setApplications(applications.filter((app) => app.id !== id));
            alert('Application deleted.');
        } catch (error) {
            alert('Error deleting application.');
        }
    };

    return (
        <div>
            <h2>Dashboard</h2>
            <button onClick={() => navigate('/add-application')}>Add a New Application</button>
            <table>
                <thead>
                    <tr>
                        <th>Company</th>
                        <th>Position</th>
                        <th>Status</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {applications.map((app) => (
                        <tr key={app.id}>
                            <td>{app.company_name}</td>
                            <td>{app.position}</td>
                            <td>{app.status}</td>
                            <td>
                                <Link to={`/application/${app.id}`}>Edit</Link>
                                <button onClick={() => handleDelete(app.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <button onClick={() => navigate('/progress-analytics')}>Get Progress Analytics</button>
        </div>
    );
}

export default Dashboard;
