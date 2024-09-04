import React, { useEffect, useState } from 'react';
import Header from '../../components/shared/Header';

function Profile() {
    const userId = JSON.parse(localStorage.getItem('user'))._id;
    const [stats, setStats] = useState({
        pendingCount: 0,
        approvedCount: 0,
        rejectedCount: 0,
    });

    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await fetch(`https://productmanager-backend.onrender.com/api/review/mySubmissions/${userId}`);
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
        <>
        <Header/>
        <div className="max-w-5xl mt-4 mx-auto p-6 bg-gray-100 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-red-500 mb-6">Profile Stats</h2>
            <div className="overflow-x-auto">
                <table className="min-w-full bg-white rounded-lg shadow-md">
                    <thead >
                        <tr>
                            <th className="px-4 py-2 bg-gray-200 text-left text-red-500 font-semibold">Stat Type</th>
                            <th className="px-4 py-2 bg-gray-200 text-left text-red-500 font-semibold">Count</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="bg-white">
                            <td className="px-4 py-2 border-t border-gray-300">Pending Requests</td>
                            <td className="px-4 py-2 border-t border-gray-300">{stats.pendingCount}</td>
                        </tr>
                        <tr className="bg-green-100">
                            <td className="px-4 py-2 border-t border-gray-300">Approved Requests</td>
                            <td className="px-4 py-2 border-t border-gray-300">{stats.approvedCount}</td>
                        </tr>
                        <tr className="bg-red-100">
                            <td className="px-4 py-2 border-t border-gray-300">Rejected Requests</td>
                            <td className="px-4 py-2 border-t border-gray-300">{stats.rejectedCount}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
        </>
    );
}

export default Profile;
