import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function RequestDetailsPage() {
  const { request_id: requestId } = useParams();
  const [requestDetails, setRequestDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const [role, setRole] = useState(localStorage.getItem('role'));


  useEffect(() => {
    setRole(localStorage.getItem('role'));
    console.log("chutiya",role);
    if (role !== 'admin') {
      navigate('/dashboard');
    }
  }, [navigate]);
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
        console.log("amlan",localStorage.getItem('role'));
        setRole(localStorage.getItem('role'));
        // const response = await fetch(`https://productmanager-backend.onrender.com/api/review/request/${requestId}`);
        const response = await fetch(`https://productmanager-backend.onrender.com/api/review/request/${requestId}`);

        if (!response.ok) throw new Error('Failed to fetch request details');
        const data = await response.json();
        setRequestDetails(data);
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

;

  if (isLoading) return <div className="request-details-container">Loading request details...</div>;
  if (error) return <div className="request-details-container">Error: {error}</div>;

  return (
    <div className='flex items-center justify-center mt-10 '>
    <div className="flex flex-col items-center justify-center max-w-4xl p-6 mx-auto bg-gray-100 rounded-lg shadow-md ">
      <h2 className="mb-6 text-2xl font-semibold text-center text-gray-800">Request Details</h2>
      {requestDetails ? (
        <div className="p-6 bg-white rounded-lg shadow">
          <p className="mb-2 text-gray-700"><strong>Request ID:</strong> {requestDetails._id}</p>
          <p className="mb-2 text-gray-700"><strong>Status:</strong> {requestDetails.status}</p>
          <p className="mb-4 text-gray-700"><strong>Changes:</strong></p>
          {requestDetails.changes && Object.entries(requestDetails.changes).length > 0 ? (
            <ul className="p-0 list-none">
              {Object.entries(requestDetails.changes).map(([key, value]) => (
                value !== '' && <li key={key} className="p-2 mb-2 bg-gray-100 rounded"><strong>{key}:</strong> {value}</li>
              ))}
              {Object.values(requestDetails.changes).every(value => value === '') && <li>No changes made.</li>}
            </ul>
          ) : (
            <p>No changes recorded.</p>
          )}
          {requestDetails.status === 'pending' && (
            <div className="flex justify-between mt-6">
              <button onClick={handleReject} className="px-4 py-2 text-white bg-red-500 rounded hover:bg-red-600">Reject</button>
              <button onClick={handleApprove} className="px-4 py-2 text-white bg-green-500 rounded hover:bg-green-600">Approve</button>
            </div>
          )}
        </div>
      ) : (
        <p>No request details found.</p>
      )}
    </div>
    </div>
  );
}

export default RequestDetailsPage;
