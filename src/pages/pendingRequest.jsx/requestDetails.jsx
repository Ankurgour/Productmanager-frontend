// import React, { useEffect, useState } from 'react';
// import { useParams, useNavigate } from 'react-router-dom';
// import './requestDetails.css';
// import Loader from '../../components/shared/Loader';

// function RequestDetailsPage() {
//   const requestId = useParams().request_id;
//   // console.log(requestId)
//   const [requestDetails, setRequestDetails] = useState(null);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState('');
//   const navigate = useNavigate();

//   const handleApprove = async () => {
//     try {
//       const res = await fetch(`https://productmanager-backend.onrender.com/api/review/approveRequest/${requestId}`, {
//         method: 'PATCH',
//       });
//       const data = await res.json();
//       if (!data) throw new Error();
//       navigate('/dashboard');
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   const handleReject = async () => {
//     try {
//       const res = await fetch(`https://productmanager-backend.onrender.com/api/review/rejectRequest/${requestId}`, {
//         method: 'PATCH',
//       });
//       const data = await res.json();
//       if (!data) throw new Error();
//       navigate('/dashboard');
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     const fetchRequestDetails = async () => {
//       try {
//         const response = await fetch(`https://productmanager-backend.onrender.com/api/review/request/${requestId}`);
//         if (!response.ok) throw new Error('Failed to fetch request details');
//         const data = await response.json();
//         setRequestDetails(data);
//         console.log(data);
//         console.log(requestDetails);
//       } catch (error) {
//         console.log(error);
//         setError(error.message);
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     if (requestId) {
//       fetchRequestDetails();
//     }
//   }, [requestId]);

//   useEffect(() => {
//     const userRole = JSON.parse(localStorage.getItem('user')).role;
//     if (userRole !== 'admin') {
//       navigate('/dashboard');
//     }
//   }, [navigate]);

//   // if (isLoading) return <div className="request-details-container">Loading request details...</div>;
//   if(isLoading)return <Loader/>
//     if (error) return <div className="request-details-container">Error: {error}</div>;

//   return (
//     <div className="request-details-container">
//       <h2>Request Details</h2>
//       {requestDetails ? (
//         <div>
//           <p>Request ID: {requestDetails._id}</p>
//           <p>Status: {requestDetails.status}</p>
//           <p>Changes: </p>
// {requestDetails.changes && Object.entries(requestDetails.changes).length > 0 ? (
//   <ul className="changes-list">
//     {Object.entries(requestDetails.changes).map(([key, value]) => (
//       value !== '' && <li key={key}><strong>{key}:</strong> {value}</li>
//     ))}
//     {Object.values(requestDetails.changes).every(value => value === '') && <li>No changes made.</li>}
//   </ul>
// ) : (
//   <p>No changes recorded.</p>
// )}

//           {requestDetails.status === 'pending' && (
//             <>
//               <button onClick={handleReject} style={{ backgroundColor: 'red', color: 'white' }}>Reject</button>
//               <button onClick={handleApprove} style={{ backgroundColor: 'green', color: 'white' }}>Approve</button>
//             </>
//           )}
//         </div>
//       ) : (
//         <p>No request details found.</p>
//       )}
//     </div>
//   );
// }

// export default RequestDetailsPage;

import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

function RequestDetailsPage() {
  const { request_id: requestId } = useParams();
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
    <div className=' mt-10 flex justify-center items-center'>
    <div className=" flex flex-col justify-center items-center p-6 max-w-4xl mx-auto bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-center text-2xl font-semibold mb-6 text-gray-800">Request Details</h2>
      {requestDetails ? (
        <div className="bg-white p-6 rounded-lg shadow">
          <p className="text-gray-700 mb-2"><strong>Request ID:</strong> {requestDetails._id}</p>
          <p className="text-gray-700 mb-2"><strong>Status:</strong> {requestDetails.status}</p>
          <p className="text-gray-700 mb-4"><strong>Changes:</strong></p>
          {requestDetails.changes && Object.entries(requestDetails.changes).length > 0 ? (
            <ul className="list-none p-0">
              {Object.entries(requestDetails.changes).map(([key, value]) => (
                value !== '' && <li key={key} className="bg-gray-100 mb-2 p-2 rounded"><strong>{key}:</strong> {value}</li>
              ))}
              {Object.values(requestDetails.changes).every(value => value === '') && <li>No changes made.</li>}
            </ul>
          ) : (
            <p>No changes recorded.</p>
          )}
          {requestDetails.status === 'pending' && (
            <div className="flex justify-between mt-6">
              <button onClick={handleReject} className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600">Reject</button>
              <button onClick={handleApprove} className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600">Approve</button>
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
