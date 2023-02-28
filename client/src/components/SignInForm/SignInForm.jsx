import React, { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import './SignInForm.css'
import axios from 'axios'
import { userUrl, doctorUrl } from '../../../apiLinks/apiLinks'
import { firebaseContext } from '../../store/Contexts'

function SignInForm() {
    const [signInForm, setSignInForm] = useState('client')
    const Navigate = useNavigate()
    const { signInWithGoogle } = useContext(firebaseContext)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [doctorEmail, setDoctorEmail] = useState('')
    const [doctorPass, setDoctorPass] = useState('')
    const [incorrectPass, setIncorrectPass] = useState(false)
    const [userErr, setUserErr] = useState(false)
    const [block, setBlock] = useState(false)
    const [reject, setReject] = useState(false)
    const [gErr, setGerr] = useState(false)
    const [otp, setOtp] = useState('')
    useEffect(() => {
        const token = document.cookie
        axios.post(`${userUrl}authenticate`, token).then((response) => {
            response.data.user ? Navigate('/') : Navigate('/SignIn')
        })
    }, [])
    let userData = {
        email,
        password
    }
    let doctorData = {
        email: doctorEmail,
        password: doctorPass
    }
    const userSignIN = (e) => {
        e.preventDefault()
        axios.post(`${userUrl}signIn`, userData).then((response) => {
            if (response.data.status) {
                if (response.data.token) {
                    document.cookie = `token=${response.data.token}`
                }
                setUserErr(false)
                Navigate('/')
            } else {
                setUserErr(true)
            }
        })

    }
    const doctorSignIn = (e) => {
        e.preventDefault()
        axios.post(`${doctorUrl}signIn`, doctorData).then((response) => {
            if (response.data.user) {
                setUserErr(false)
                if (!response.data.block) {
                    setBlock(false)
                    if (response.data.password) {
                        setIncorrectPass(false)
                        if (response.data.status === 'success') {
                            document.cookie = `DoctorToken=${response.data.token}`
                            Navigate('/doctor/home')
                        } else if (response.data.status === 'pending') {
                            Navigate('/doctor/verification')
                        } else {
                            setReject(true)
                        }

                    } else {
                        setIncorrectPass(true)
                    }

                } else {
                    setBlock(true)
                }
            } else {
                setUserErr(true)
            }
        })

    }
    const forgotPass = (e) => {
        e.preventDefault()
        axios.post(`${userUrl}forgotPass`, { email }).then((response) => {
            if (response.data.status) {
                setUserErr(false)
                setSignInForm('reset-pass')
            } else { setUserErr(true) }
        })

    }
    const resetPass = (e) => {
        e.preventDefault()
        axios.post(`${userUrl}resetPass`, { otp, email, password }).then((response) => {
            setUserErr(false)
            response.data.status ? setSignInForm('client') : setUserErr(true)
        })
    }
    const googleLogin = () => {
        signInWithGoogle().then((result) => {
            axios.post(`${userUrl}googleUserDetails`, result.user).then((response) => {
                if (response.data.status) {
                    document.cookie = `token=${response.data.token}`
                    Navigate('/')
                } else {
                    setGerr(true)
                }
            })
        })
    }

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

                        <div className={`mt-6 ${signInForm === 'forgot-pass' && 'hidden'} ${signInForm === 'reset-pass' && 'hidden'} `}>
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
                            signInForm === 'client' && <> <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-1" onSubmit={userSignIN}>
                                <div>
                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Email address</label>
                                    <input type="email" placeholder="johnsnow@example.com" onChange={(e) => setEmail(e.target.value)} className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md md:w-3/4 dark:placeholder-gray-400 dark:bg-gray-900 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Password</label>
                                    <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md md:w-3/4 dark:placeholder-gray-400 dark:bg-gray-900 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>
                                <button
                                    className="flex sign-in items-center justify-between w-1/2 md:w-1/5 px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform  rounded-md sign-up focus:outline-none  focus:ring focus:ring-blue-300 focus:ring-opacity-50"  >
                                    <span>Sign In </span>

                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd" />
                                    </svg>
                                </button>

                                {userErr &&
                                    <p className='text-danger'>Invalid username or password</p>}

                               </form>
                                <button
                                    onClick={googleLogin}
                                    className="mt-3 flex items-center justify-center w-64 px-6 py-3 text-sm font-medium text-gray-800 transition-colors duration-300 transform bg-white border border-gray-300 rounded-md hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="#EA4335"
                                        className="w-5 h-5 mr-2"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M17.14 8.968h-.848v-.834h-6.2v3.166h4.28c-.185 1.114-.885 2.784-4.28 2.784-2.568 0-4.672-2.094-4.672-4.668s2.104-4.67 4.672-4.67c1.312 0 2.197.55 2.712 1.018l1.847-1.784c-.948-.86-2.17-1.392-4.56-1.392-3.85 0-7.24 2.77-7.24 8.106s3.39 8.106 7.24 8.106c4.254 0 6.812-2.898 6.812-6.916v-.002z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                    <span>Sign in with Google</span>
                                </button>


                                {gErr &&
                                    <p className='text-danger mb-2 mt-2'>Some unexpected errors please try after sometime </p>
                                }
                                <p className='text-primary cursor-pointer' onClick={() => setSignInForm('forgot-pass')}>forgot password ?</p>
                            </>
                        }
                        {
                            signInForm === 'doctor' &&
                            <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-1" onSubmit={doctorSignIn}>
                                <div>
                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Email address</label>
                                    <input type="email" placeholder="doctor@example.com" onChange={(e) => setDoctorEmail(e.target.value)} className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md md:w-3/4 dark:placeholder-gray-400 dark:bg-gray-900 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                    {userErr &&
                                        <p className='text-danger'>There is no user with this email</p>}
                                    {block &&
                                        <p className='text-danger'>You are blocked</p>}
                                    {reject &&
                                        <p className='text-danger'>Sorry, your profile is rejected</p>}

                                </div>


                                <div>
                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Password</label>
                                    <input type="password" placeholder="Enter your password" onChange={(e) => setDoctorPass(e.target.value)} className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md md:w-3/4 dark:placeholder-gray-400 dark:bg-gray-900 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                    {incorrectPass &&
                                        <p className="text-danger">Incorrect Password</p>}
                                </div>



                                <button
                                    className="flex sign-in items-center justify-between w-1/2 md:w-1/5 px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform  rounded-md sign-up focus:outline-none  focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                                    <span>Sign In </span>

                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd" />
                                    </svg>
                                </button>
                            </form>
                        }{
                            signInForm === 'forgot-pass' &&
                            <form className="grid grid-cols-1 gap-6 mt-10 md:grid-cols-1 " onSubmit={forgotPass} >
                                <div>
                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Email address</label>
                                    <input type="email" placeholder="johnsnow@example.com" onChange={(e) => setEmail(e.target.value)} className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md md:w-3/4 dark:placeholder-gray-400 dark:bg-gray-900 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>
                                <button
                                    className="flex sign-in items-center justify-between w-1/2 md:w-1/5 px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform  rounded-md sign-up focus:outline-none  focus:ring focus:ring-blue-300 focus:ring-opacity-50"  >
                                    <span>Get Otp </span>

                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd" />
                                    </svg>
                                </button>
                                {userErr &&
                                    <p className='text-danger'>Invalid email</p>}

                            </form>
                        }
                        {signInForm === 'reset-pass' &&
                            <form className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-1" onSubmit={resetPass}>
                                <div>
                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Otp recieved in given email</label>
                                    <input type="text" placeholder="000-000" onChange={(e) => setOtp(e.target.value)} className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md md:w-3/4 dark:placeholder-gray-400 dark:bg-gray-900 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm text-gray-600 dark:text-gray-400">Type new Password</label>
                                    <input type="password" placeholder="Enter your password" onChange={(e) => setPassword(e.target.value)} className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md md:w-3/4 dark:placeholder-gray-400 dark:bg-gray-900 dark:text-gray-800 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
                                </div>
                                <button
                                    className="flex sign-in items-center justify-between w-1/2 md:w-1/5 px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform  rounded-md sign-up focus:outline-none  focus:ring focus:ring-blue-300 focus:ring-opacity-50"  >
                                    <span>Reset </span>

                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 rtl:-scale-x-100" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd"
                                            d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                                            clipRule="evenodd" />
                                    </svg>
                                </button>
                                {userErr &&
                                    <p className='text-danger'>Invalid Otp</p>}
                            </form>
                        }

                    </div>
                </div>
            </div>
        </section>
    )
}

export default SignInForm
