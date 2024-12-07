import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Dashboard.module.css';

function Dashboard() {
    const [applications, setApplications] = useState([]);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchApplications = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    navigate('/login');
                    return;
                }

                const { data } = await axios.get('http://localhost:3000/applications', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                setApplications(data.applications);
            } catch (error) {
                console.error('Error fetching applications:', error);
                setError(
                    error.response?.data?.message || 'Failed to fetch applications. Please try again.'
                );
            }
        };

        fetchApplications();
    }, [navigate]);

    const handleDelete = async (id) => {
        try {
            const token = localStorage.getItem('token');
            if (!token) {
                navigate('/login');
                return;
            }

            await axios.delete(`http://localhost:3000/applications/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });

            setApplications(applications.filter((app) => app.application_id !== id));
        } catch (error) {
            console.error('Error deleting application:', error);
        }
    };

    if (error) {
        return <div style={{ color: 'red' }}>{error}</div>;
    }

    return (
        <div className={styles.dashboardContainer}>
            {/* Header Section */}
            <div>
                <h2>Dashboard</h2>
                <button
                    onClick={() => navigate('/add-application')}
                    className={styles.addButton}
                >
                    Add a New Application
                </button>
            </div>

            {/* Table Section */}
            <div className={styles.tableContainer}>
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
                        {applications.length > 0 ? (
                            applications.map((app) => (
                                <tr key={app.application_id}>
                                    <td>{app.company_name}</td>
                                    <td>{app.position}</td>
                                    <td>{app.status}</td>
                                    <td >
                                        <Link to={`/application/${app.application_id}`}>Edit</Link>
                                        <button className={styles.actions} onClick={() => handleDelete(app.application_id)}>
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" style={{  textAlign: 'center' }}>
                                    No applications found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Progress Button */}
            <button
                onClick={() => navigate('/progress-analytics')}
                className={styles.progressButton}
            >
                Get Progress Analytics
            </button>
        </div>
    );
}

export default Dashboard;
