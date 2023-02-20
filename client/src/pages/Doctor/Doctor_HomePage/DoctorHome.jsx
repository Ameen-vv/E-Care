import React from 'react'
import DoctorBanner from '../../../components/DoctorBanner/DoctorBanner'
import DoctorDetails from '../../../components/DoctorDetails/DoctorDetails'
import Footer from '../../../components/Footer/Footer'
import Header from '../../../components/Header/Header'

function DoctorHome() {
  return (
    <div>
      <Header/>  
      <DoctorBanner/>
      <DoctorDetails/>
      <Footer/>
    </div>
  )
}

export default DoctorHome
