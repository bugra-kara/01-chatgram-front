import React from 'react'
import { Home, Register, Login, Error } from '../pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../context/authContext'
import ProtectedRoutes from './ProtectedRoutes';
const Layout = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<AuthProvider><ProtectedRoutes><Home/></ProtectedRoutes></AuthProvider>}/>
        <Route path='/register' element={<AuthProvider><Register/></AuthProvider>} />
        <Route path='/login' element={<AuthProvider><Login/></AuthProvider>} />
        <Route path='*' element={<Error/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Layout