import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
import './SignInForm.css'

function SignInForm() {
    const [signInForm, setSignInForm] = useState('client')
    const Navigate = useNavigate()
    return (
        <section className="bg-white dark:bg-gray-900">
            <div className="flex justify-center min-h-screen">
                <div className="hidden bg-cover lg:block lg:w-2/5" style={{ backgroundImage: "url('/images/Banner2.jpg')" }}>
                </div>

                <div className="flex items-start w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
                    <div className="w-full">


                        <h3 className="mt-3 text-gray-500 dark:text-gray-400">
                            Welcome Back
                        </h3>

                        <div className="mt-6">
                            <h1 className="text-gray-500 dark:text-gray-300">Select type of account</h1>

                            <div className="mt-3 md:flex md:items-center md:-mx-2">
                            <button className={`flex justify-center w-full px-6 py-3  ${signInForm === 'client' ? "sign-up" : "border border-blue-500 text text-blue-300"} rounded-md md:w-auto md:mx-2 focus:outline-none`} onClick={() => setSignInForm('client')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                                    </svg>

                                    <span className="mx-2">
                                        client
                                    </span>
                                </button>

                                <button className={`flex justify-center w-full px-6 py-3  ${signInForm === 'doctor' ? "sign-up" : "border border-blue-500 text text-blue-300"} rounded-md md:w-auto md:mx-2 focus:outline-none`} onClick={() => setSignInForm('doctor')}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                    </svg>

                                    <span className="mx-2">
                                        Doctor
                                    </span>
                                </button>
                            </div>
                        </div>
                        {
                            signInForm === 'client' && <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-1">
                                <div>
                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email address</label>
                                    <input type="email" placeholder="johnsnow@example.com" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md md:w-3/4 dark:placeholder-gray-400 dark:bg-gray-900 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>


                                <div>
                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Password</label>
                                    <input type="password" placeholder="Enter your password" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md md:w-3/4 dark:placeholder-gray-400 dark:bg-gray-900 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>



                                <button
                                    className="flex sign-in items-center justify-between w-1/2 md:w-1/5 px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform  rounded-md sign-up focus:outline-none  focus:ring focus:ring-blue-300 focus:ring-opacity-50"  onClick={()=>Navigate('/')}>
                                    <span>Sign In </span>
                                    
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd" />
                                    </svg>
                                </button>
                            </form>
                        }
                        {
                            signInForm === 'doctor' &&
                            <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-1">
                                <div>
                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email address</label>
                                    <input type="email" placeholder="doctor@example.com" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md md:w-3/4 dark:placeholder-gray-400 dark:bg-gray-900 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>


                                <div>
                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Password</label>
                                    <input type="password" placeholder="Enter your password" className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md md:w-3/4 dark:placeholder-gray-400 dark:bg-gray-900 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>



                                <button
                                    className="flex sign-in items-center justify-between w-1/2 md:w-1/5 px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform  rounded-md sign-up focus:outline-none  focus:ring focus:ring-blue-300 focus:ring-opacity-50"  onClick={()=>Navigate('/doctor/home')}>
                                    <span>Sign In </span>

                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd" />
                                    </svg>
                                </button>
                            </form>
                        }

                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignInForm
