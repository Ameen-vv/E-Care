import {Navigate,Outlet} from 'react-router-dom'
import {useEffect,useState} from 'react'
import axios from 'axios'
import { doctorUrl } from '../../apiLinks/apiLinks'


const DoctorRoutes = ()=>{
    const [doctorCheck,setDoctorCheck] = useState(false)
    useEffect(()=>{
        const token = document.cookie
        axios.post(`${doctorUrl}authenticate`,token).then((response)=>{
            console.log(response);
        })
    })
    return (
        doctorCheck ? <Outlet/> : <Navigate to='/signIn'/>
      )
}


export default DoctorRoutes
