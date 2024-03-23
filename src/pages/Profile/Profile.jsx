import React, { useEffect, useState } from 'react';
import './profile.css';

function Profile() {
 const userId = JSON.parse(localStorage.getItem('user'))._id
    const [stats, setStats] = useState({
        pendingCount: 0,
        approvedCount: 0,
        rejectedCount: 0,
    });

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await fetch(`http://localhost:5000/api/review/mySubmissions/${userId}`)
                if (!response.ok) {
                    throw new Error('Failed to fetch submissions');
                }
                const data = await response.json();
             
                setStats({
                    pendingCount: data.counts.pendingCount,
                    approvedCount: data.counts.approvedCount,
                    rejectedCount: data.counts.rejectedCount
                });
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchSubmissions();
    }, [userId]);


    return (
        <div>
            <h2>Profile Stats</h2>
            <table>
                <thead>
                    <tr>
                        <th>Stat Type</th>
                        <th>Count</th>
                    </tr>
                </thead>
                <tbody>
                    <tr style={{ backgroundColor: 'white' }}>
                        <td>Pending Request</td>
                        <td>{stats.pendingCount}</td>
                    </tr>
                    <tr style={{ backgroundColor: 'lightgreen' }}>
                        <td>Approved Requests</td>
                        <td>{stats.approvedCount}</td>
                    </tr>
                    <tr style={{ backgroundColor: 'lightcoral' }}>
                        <td>Rejected Requests</td>
                        <td>{stats.rejectedCount}</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}

export default Profile;
