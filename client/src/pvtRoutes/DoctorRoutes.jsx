import { useNavigate, Navigate, Outlet } from 'react-router-dom'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { doctorUrl } from '../../apiLinks/apiLinks'


const DoctorRoutes = () => {
    const Navigate = useNavigate()
    const [doctorCheck, setDoctorCheck] = useState(false)
    useEffect(() => {
        console.log('adsg');
        const token = document.cookie
        axios.post(`${doctorUrl}authenticate`, token).then((response) => {
            if (!response.data.user) {
                console.log('fadfsa');
                setDoctorCheck(false)
                Navigate('/signIn')
            } else {
                console.log('sdas');
                setDoctorCheck(true)
            }
        })
    }, [])
    return (
        doctorCheck && <Outlet />
    )
}


export default DoctorRoutes
