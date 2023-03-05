import React from 'react'
import PersistentDrawerLeft from '../../../components/AdminComponents/newNav'
import Banner from '../../../components/Banner/Banner'
import Departments from '../../../components/Departments/Departments'
import Footer from '../../../components/Footer/Footer'
import Header from '../../../components/Header/Header'
import ServicesSection from '../../../components/Services/Services'

function Home() {
  return (
    <div>
        <Header/>
        <Banner/>
        <Departments/>
        <ServicesSection/>
        <Footer/>
    </div>
  )
}

export default Home
