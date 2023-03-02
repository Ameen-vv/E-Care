import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { FaRegClock } from "react-icons/fa"; // import clock icon from react-icons/fa
import {  useNavigate,useLocation } from 'react-router-dom';
import { doctorUrl } from '../../../../apiLinks/apiLinks';
import ErrorPage from '../../../components/ErrorPage/ErrorPage';

function RejectedPage() {
   const Navigate = useNavigate()
   const location = useLocation()
   const [reason,setReason] = useState('')
   const [err,setErr] = useState(false)
   useEffect(()=>{
        axios.get(`${doctorUrl}rejectedUser/${location.state.id}`).then((response)=>{
            response.status === 200 ? setReason(response.data.details) :
            setErr(true)
        })
   },[])
   const resendApplication = ()=>{
    axios.get(`${doctorUrl}resendForm/${location.state.id}`).then((response)=>{
        response.status === 200 ? Navigate('/doctor/verification')
        : setErr(true)
    })
   } 
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      {!err ? <div className="bg-white p-6 rounded-md shadow-md flex flex-col items-center justify-center space-y-6">
        <div className="text-5xl text-blue-500">
          <FaRegClock />
        </div>
        <h1 className="text-3xl font-bold text-center">
          Sorry,you profile has been rejected
        </h1>
        <p className="text-lg text-center">
        You can resend the application we will verify your profile again
        </p>
        <p className="text-lg text-center">
          the reason for your rejection is {reason}
        </p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
          onClick={resendApplication}
        >
          Resend the application
        </button>
      </div> : <ErrorPage/>}
    </div>
  )
}

export default RejectedPage
