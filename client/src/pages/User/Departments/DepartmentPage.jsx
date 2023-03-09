import React from 'react'
import DepartmentSection from '../../../components/DepartmentSection/DepartmentSection'
import List from '../../../components/DoctorsViewUser/DoctorsViewUser'
import Footer from '../../../components/Footer/Footer'
import Header from '../../../components/Header/Header'
import AutoSlideCardGrid from '../../../components/test/test'


function DepartmentPage() {
  return (
    <div className='flex justify-center flex-column w-full' >
      <Header/>
      <div className='w-full justify-center flex department-heading mt-5 '><h1 className=''>Find A Doctor</h1></div>
      <DepartmentSection/>
      <List/>
      <Footer/>
    </div>
  )
}

export default DepartmentPage
