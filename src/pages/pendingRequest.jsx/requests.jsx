// PendingRequestsPage.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './requests.css'; 

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
        <div className="requests-list">
        <h1>All Requests</h1>
            {requests.map(request => ( 
                <div key={request._id} className="request-item" onClick={() => navigate(`/pending-requests/${request._id}`)}>
                    <p>Request ID: {request._id}</p>
                    <p>Status: {request.status}</p>
                </div>
            ))}
        </div>
    );
}

export default PendingRequestsPage;
