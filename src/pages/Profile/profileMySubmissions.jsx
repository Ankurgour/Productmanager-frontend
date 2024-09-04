import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Navigate } from 'react-router-dom'; 
import Header from '../../components/shared/Header';

function MySubmissions() {
    const [submissions, setSubmissions] = useState([]);
    const userId = JSON.parse(localStorage.getItem('user'))?._id;
    const navigate = useNavigate();
    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await fetch(`https://productmanager-backend.onrender.com/api/review/mySubmissions/${userId}`)
                // console.log(response);
                if (!response.ok) {
                    throw new Error('Failed to fetch submissions');
                }
                const data = await response.json();
                // console.log(data);
                setSubmissions(data.submissions);
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
            <h2 className="text-2xl font-bold text-red-500 mb-6">My Submissions</h2>
            <div className="grid grid-cols-2 gap-4 mb-4 font-medium text-red-500">
                <div>ID</div>
                <div>Status</div>
            </div>
            {submissions.length > 0 ? (
                submissions.map((submission) => (
                    <div key={submission._id} className="grid grid-cols-2 gap-4 p-4 mb-4 bg-white rounded-lg shadow-sm">
                        <div className="text-gray-600">{submission._id}</div>
                        <div className="text-gray-600">{submission.status}</div>
                    </div>
                ))
            ) : (
                <div className="text-gray-500">No submissions found.</div>
            )}
        </div>
        </>
    );
}

export default MySubmissions;

