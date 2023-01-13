import React from 'react'
import { Navbar, Footer, Sidebar, PrivateRoute } from '../components';
import { Home, Register, Login, Error } from '../pages';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { AuthProvider } from '../context/authContext'
const Layout = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<AuthProvider><Home/></AuthProvider>}/>
        <Route path='/register' element={<AuthProvider><Register/></AuthProvider>} />
        <Route path='/login' element={<AuthProvider><Login/></AuthProvider>} />
        <Route path='*' element={<Error/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default Layout