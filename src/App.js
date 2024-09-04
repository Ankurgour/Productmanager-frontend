import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import './index.css';
import RegistrationForm from './pages/Register';
import LoginForm from './pages/Login';
import AuthenticatedElement from './components/AuthenticatedRoute';
import ProductsDisplay from './pages/Products/ProductsDisplay';
import ProductDetail from './pages/Products/ProductsDetail';
import MySubmissions from './pages/Profile/profileMySubmissions'
import Profile from './pages/Profile/Profile';
import PendingRequestsPage from './pages/pendingRequest.jsx/requests';
import RequestDetailsPage from './pages/pendingRequest.jsx/requestDetails';
import Header from './components/shared/Header';
import Home from './pages/Home/Home';
import { isAuthenticated } from './components/AuthenticatedRoute';
const Dashboard = () => <ProductsDisplay />
const PendingRequests = () => <div>Pending Requests Page</div>;

function App() {


  // if(isAuthenticated){setIsAuthenticatedd(true);}
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/register" element={<RegistrationForm />} />
          <Route path="/login" element={<LoginForm />} />
          {/* <Route path="/" element={<Navigate to="/dashboard" />} />
           */}
           <Route path='/' element = {<AuthenticatedElement><Home/></AuthenticatedElement>}/>
          <Route path="/dashboard" element={<AuthenticatedElement><ProductsDisplay/></AuthenticatedElement>} />
          <Route path="/product/:id" element={<AuthenticatedElement><ProductDetail /></AuthenticatedElement>} />
          <Route path="/profile" element={<AuthenticatedElement><Profile /></AuthenticatedElement>} />
          <Route path="/profile/mysubmission" element={<AuthenticatedElement><MySubmissions /></AuthenticatedElement>} />
          {/* <Route path="/profile/mysubmission" element={<AuthenticatedElement><MySubmissions /></AuthenticatedElement>} /> */}
          {/* <Route path="/submission/:submissionId" element={<SubmissionDetail />} /> */}
          {/* <Route path="/mySubmissions/:id" element={<AuthenticatedElement><MySubmissionsDetails/></AuthenticatedElement>} /> */}

          <Route path="/pending-requests" element={<AuthenticatedElement><PendingRequestsPage /></AuthenticatedElement>} />
          <Route path="/pending-requests/:request_id" element={<AuthenticatedElement><RequestDetailsPage /></AuthenticatedElement>} /> 
          {/* <Route path="/" element={<Navigate to="/dashboard" />} /> */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
