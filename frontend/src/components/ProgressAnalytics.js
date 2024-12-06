import React, { useState, useEffect } from 'react';
import API from '../services/api';

function ProgressAnalytics() {
    const [analytics, setAnalytics] = useState({
        total_submissions: 0,
        interviews_received: 0,
        success_rate: 0,
    });

    useEffect(() => {
        const fetchAnalytics = async () => {
            try {
                const { data } = await API.get('/progress-analytics');
                setAnalytics(data);
            } catch (error) {
                alert('Error fetching analytics.');
            }
        };

        fetchAnalytics();
    }, []);

    return (
        <div>
            <h2>Progress Analytics</h2>
            <p>Total Submissions: {analytics.total_submissions}</p>
            <p>Interviews Received: {analytics.interviews_received}</p>
            <p>Success Rate: {analytics.success_rate}%</p>
        </div>
    );
}

export default ProgressAnalytics;
