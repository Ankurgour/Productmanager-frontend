// PendingRequestsPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Header from '../../components/shared/Header';

function PendingRequestsPage() {
    const [requests, setRequests] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const userRole = JSON.parse(localStorage.getItem('user')).role;

        if (userRole !== 'admin') {
            navigate('/dashboard'); 
            return;
        }

        fetch('https://productmanager-backend.onrender.com/api/review/allRequests')
            .then(res => res.json())
            .then(data => setRequests(data.data))
            .catch(error => console.error('Error fetching data:', error));
    }, [navigate]);

    return (
        <>
        <Header/>

        <div className="min-h-screen bg-gray-100 py-8">
            <div className="container mx-auto">
                <h1 className="text-4xl font-bold text-center mb-8 text-red-500">All Requests</h1>
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    {requests.map(request => (
                        <div
                            key={request._id}
                            className="p-4 border-b border-gray-200 cursor-pointer hover:bg-gray-100"
                            onClick={() => navigate(`/pending-requests/${request._id}`)}
                        >
                            <p className="text-lg font-semibold text-gray-700">Request ID: {request._id}</p>
                            <p className={`text-sm ${request.status === 'pending' ? 'text-yellow-600' : 'text-green-600'}`}>Status: {request.status}</p>
                        </div>
                    ))}
                    {requests.length === 0 && (
                        <div className="p-4 text-center text-gray-500">No requests found.</div>
                    )}
                </div>
            </div>
        </div>
        </>

    );
}

export default PendingRequestsPage;
