import React from 'react';
import { Navigate } from 'react-router-dom';

export const isAuthenticated = () => {
  const token = JSON.stringify(localStorage.getItem('user')).role;
  return token !== "team member";
};
const getUserRole = () => {
  return localStorage.getItem('user');
};

const AuthenticatedElement = ({ children }) => {
  const authenticated = isAuthenticated();
  // console.log(getUserRole());
  return authenticated ? children: <Navigate to="/login" />;
};

export default AuthenticatedElement;
