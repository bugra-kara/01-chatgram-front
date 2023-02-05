import React from 'react'
import { Link, Outlet, Navigate } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import { useAuthContext } from '../context/authContext'
function Register() {
    const { handleSubmitRegister, handleChange, state } = useAuthContext()
    const username  = localStorage.getItem('username')
    const userId = localStorage.getItem('userId')
    if(username && userId) {
        return <Navigate to="/"/>
    }
    else {
        return (
            <section className="bg-gray-50 ">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a href="/" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 ">
                Chatgram    
                </a>
                <div className="w-full bg-white rounded-lg shadow  md:mt-0 sm:max-w-md xl:p-0 ">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
                            Create and account
                        </h1>
                        <form className="space-y-4 md:space-y-6" onSubmit={(e)=> handleSubmitRegister(e)}>
                            <div>
                                <label htmlFor="username" className="block mb-2 text-sm font-medium text-gray-900 ">Your Username</label>
                                <input type="text" name="username" id="username" value={state.username} onChange={(e)=> handleChange(e)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="username" required="" />
                            </div>
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 ">Your email</label>
                                <input type="email" name="email" id="email" value={state.email} onChange={(e)=> handleChange(e)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " placeholder="name@company.com" required="" />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 ">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" value={state.password} onChange={(e)=> handleChange(e)} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 " required="" />
                            </div>
                            <button type="submit" className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center ">Create an account</button>
                            <p className="text-sm font-light text-gray-500 ">
                                Already have an account? <Link to="/login" className="font-medium text-primary-600 hover:underline ">Login here</Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
            <Outlet/>
            <ToastContainer/>
            </section>
        )
    }
}

export default Register