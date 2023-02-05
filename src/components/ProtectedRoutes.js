import React from 'react'
import { Navigate } from 'react-router-dom'
const ProtectedRoutes = ({children}) => {
    const username  = localStorage.getItem('username')
    const userId = localStorage.getItem('userId')
    if(username === null || userId === null ) {
        return <Navigate to="/login"/>
    }
    else {
        return children
    }
}

export default ProtectedRoutes