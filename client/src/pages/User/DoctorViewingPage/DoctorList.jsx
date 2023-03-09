import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import List from '../../../components/DoctorsViewUser/DoctorsViewUser'
import Footer from '../../../components/Footer/Footer'
import Header from '../../../components/Header/Header'
import { fetchDoctors } from '../../../redux/Slices/doctorSlice'

function DoctorList() {
  const location = useLocation()
  let result = useSelector(state=>state.doctor)
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchDoctors(location?.state?.departmentId))
  },[])
  result.loading ? console.log('loading'):console.log(result.doctors);
          
  return (
    <div>
      <Header/>
      <List data={result.doctors}/>
      <Footer/>
    </div>
  )
}

export default DoctorList