import React from 'react'
import DepartmentSection from '../../../components/DepartmentSection/DepartmentSection'
import List from '../../../components/DoctorsViewUser/DoctorsViewUser'
import Footer from '../../../components/Footer/Footer'
import Header from '../../../components/Header/Header'
import AutoSlideCardGrid from '../../../components/test/test'


function DepartmentPage() {
  return (
    <div>
      <Header/>
      {/* <DepartmentSection/> */}
      <List/>
      <Footer/>
    </div>
  )
}

export default DepartmentPage
