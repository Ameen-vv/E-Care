import React, { createContext,useState,useEffect, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DepartmentSection from '../../../components/DepartmentSection/DepartmentSection'
import Footer from '../../../components/Footer/Footer'
import Header from '../../../components/Header/Header'
import SearchBar from '../../../components/SearchBar/SearchBar'
import { fetchDepartments, searchDepartment } from '../../../redux/Slices/departmetnSlice'
export const depContext = createContext('')


const DepartmentPage = ()=> {
  const departmentsData = useSelector(state => state.department)
  const dispatch = useDispatch()
  const [pageNo, setPageNo] = useState(1)
  const [search,setSearch] = useState('')
     
  useEffect(() => {
    dispatch(fetchDepartments({pageNo,search}))
  },[pageNo,search])

 
  

  return (
    <depContext.Provider value={{pageNo,setPageNo,search,setSearch}}>
    <div className='flex justify-center flex-column w-full' >
      <Header/>
      <div className='w-full justify-center flex department-heading mt-5 '><h1 className=''>Our Departments</h1></div>
      <SearchBar/>
      <DepartmentSection departmentsData={departmentsData}/>
      <Footer/>
    </div>
    </depContext.Provider>
  )
}

export default DepartmentPage
