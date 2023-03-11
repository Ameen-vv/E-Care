import React from 'react'
import DepartmentSection from '../../../components/DepartmentSection/DepartmentSection'
import List from '../../../components/DoctorsViewUser/DoctorsViewUser'
import Footer from '../../../components/Footer/Footer'
import Header from '../../../components/Header/Header'
import AutoSlideCardGrid from '../../../components/test/test'


const DepartmentPage = ()=> {
  return (
    <div className='flex justify-center flex-column w-full' >
      <Header/>
      <div className='w-full justify-center flex department-heading mt-5 '><h1 className=''>Our Departments</h1></div>
      <DepartmentSection/>
      <Footer/>
    </div>
  )
}

export default DepartmentPage
