import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './MySubmissions.css';
import { Navigate } from 'react-router-dom'; 

function MySubmissions() {
    const [submissions, setSubmissions] = useState([]);
    const userId = JSON.parse(localStorage.getItem('user'))?._id;
    const navigate = useNavigate();
    useEffect(() => {
        const fetchSubmissions = async () => {
            try {
                const response = await fetch(`https://productmanager-backend.onrender.com/api/review/mySubmissions/${userId}`)
                if (!response.ok) {
                    throw new Error('Failed to fetch submissions');
                }
                const data = await response.json();
                console.log(data);
                setSubmissions(data.submissions);
            } catch (error) {
                console.error('Error:', error);
            }
        };
        fetchSubmissions();
    }, [userId]);

    return (
        <div className="my-submissions-container"> 
            <h2 className="submissions-heading">My Submissions</h2>
            <div className="submission-list"> 
            <div className='sub-idd'>ID</div>
                    <div className='sub-idd'>Status</div>
                {submissions.map((submission) => (
                    <div className="submission-item" key={submission._id}>
                    
                        {/* <Link className="submission-link" navigate('/mySubmissions/${userId}')>  */}
                        <div className="submission-link" >
                            <div className='sub-id'>{submission._id}</div>
                            <div className='sub-id'>{submission.status}</div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default MySubmissions;

