import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './ProgressAnalytics.css';

function ProgressAnalytics() {
    const [analytics, setAnalytics] = useState({
        total_submissions: 0,
        interviews_received: 0,
        success_rate: 0,
    });

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const token = localStorage.getItem('token');
                if (!token) {
                    // alert('User not authenticated. Redirecting to login.');
                    return;
                }

                const { data } = await axios.get('http://localhost:3000/progress-analytics', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setAnalytics(data.analytics); // Update analytics state with response
            } catch (error) {
                console.error('Error fetching analytics:', error);
                // alert('Failed to fetch progress analytics.');
            }
        };

        fetchAnalytics();
    }, []);

    return (
        <div className="container">
            <h2 className="heading">Progress Analytics</h2>
            <div className="analytics-container">
                <div className="analytics-item">
                    <h3 className="label">Total Submissions</h3>
                    <p className="value">{analytics.total_submissions}</p>
                </div>
                <div className="analytics-item">
                    <h3 className="label">Interviews Received</h3>
                    <p className="value">{analytics.interviews_received}</p>
                </div>
                <div className="analytics-item">
                    <h3 className="label">Success Rate</h3>
                    <p className="value">{analytics.success_rate}%</p>
                </div>
            </div>
        </div>
    );
}

export default ProgressAnalytics;
