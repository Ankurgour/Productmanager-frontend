import React from 'react';
import { Navigate } from 'react-router-dom';

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return token !== null;
};
const getUserRole = () => {
  return localStorage.getItem('user');
};

const AuthenticatedElement = ({ children }) => {
  const authenticated = isAuthenticated();
  // console.log(getUserRole());
  console.log(authenticated);
  return authenticated ? children: <Navigate to="/login" />;
};

export default AuthenticatedElement;
