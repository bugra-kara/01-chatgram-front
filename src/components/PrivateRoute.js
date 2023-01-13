import React from 'react';
import { Navigate } from 'react-router-dom';
import { useUserContext } from '../context/userContext';

const PrivateRoute = ({ children }) => {
    const { isUser } = useUserContext()
    if (!isUser) {
      return <Navigate to='/' />;
    }
    return children;
};
export default PrivateRoute;

