import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './requestDetails.css';

function RequestDetailsPage() {
  const requestId = useParams().request_id;
  console.log(requestId)
  const [requestDetails, setRequestDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleApprove = async () => {
    try {
      const res = await fetch(`https://productmanager-backend.onrender.com/api/review/approveRequest/${requestId}`, {
        method: 'PATCH',
      });
      const data = await res.json();
      if (!data) throw new Error();
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  const handleReject = async () => {
    try {
      const res = await fetch(`https://productmanager-backend.onrender.com/api/review/rejectRequest/${requestId}`, {
        method: 'PATCH',
      });
      const data = await res.json();
      if (!data) throw new Error();
      navigate('/dashboard');
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchRequestDetails = async () => {
      try {
        const response = await fetch(`https://productmanager-backend.onrender.com/api/review/request/${requestId}`);
        if (!response.ok) throw new Error('Failed to fetch request details');
        const data = await response.json();
        setRequestDetails(data);
        console.log(data);
        console.log(requestDetails);
      } catch (error) {
        console.log(error);
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };

    if (requestId) {
      fetchRequestDetails();
    }
  }, [requestId]);

  useEffect(() => {
    const userRole = JSON.parse(localStorage.getItem('user')).role;
    if (userRole !== 'admin') {
      navigate('/dashboard');
    }
  }, [navigate]);

  if (isLoading) return <div className="request-details-container">Loading request details...</div>;
  if (error) return <div className="request-details-container">Error: {error}</div>;

  return (
    <div className="request-details-container">
      <h2>Request Details</h2>
      {requestDetails ? (
        <div>
          <p>Request ID: {requestDetails._id}</p>
          <p>Status: {requestDetails.status}</p>
          <p>Changes: </p>
{requestDetails.changes && Object.entries(requestDetails.changes).length > 0 ? (
  <ul className="changes-list">
    {Object.entries(requestDetails.changes).map(([key, value]) => (
      value !== '' && <li key={key}><strong>{key}:</strong> {value}</li>
    ))}
    {Object.values(requestDetails.changes).every(value => value === '') && <li>No changes made.</li>}
  </ul>
) : (
  <p>No changes recorded.</p>
)}

          {requestDetails.status === 'pending' && (
            <>
              <button onClick={handleReject} style={{ backgroundColor: 'red', color: 'white' }}>Reject</button>
              <button onClick={handleApprove} style={{ backgroundColor: 'green', color: 'white' }}>Approve</button>
            </>
          )}
        </div>
      ) : (
        <p>No request details found.</p>
      )}
    </div>
  );
}

export default RequestDetailsPage;
