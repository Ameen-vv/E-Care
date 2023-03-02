import React,{useState,createContext} from 'react'
import DoctorList from '../../../components/AdminComponents/DoctorList/DoctorList'
import NavbarAdmin from '../../../components/AdminComponents/Navbar/NavbarAdmin'
import SideBar from '../../../components/AdminComponents/SideBar/SideBar'
import Table from '../../../components/AdminComponents/Table/Table'
import NewDoctors from '../../../components/AdminComponents/newDoctorsList/newDoctors'
import './Home.css'
export const sideBarContext = createContext('user')
export const adminLoading = createContext('')
function AdminHome() {
  const [path,setpath] = useState('users')
  const [adminLoad,setAdminLoad] = useState(false)
 function changePath(x){
      setpath(x)
 }
 function changeLoading(x){
  setAdminLoad(x)
 }
  return (
    <adminLoading.Provider value={{adminLoad,changeLoading}}>
    <sideBarContext.Provider value={{path,changePath}}>
    <div className='admin-home'>
        {adminLoad && <div className="fixed top-0 left-0 w-screen h-screen flex justify-center items-center bg-gray-500 bg-opacity-50 z-50">
                <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
        </div> }
      <SideBar/>
      <div className="homeContainer">
        <NavbarAdmin/>
       {path === 'users' && <Table/>}
       {path === 'doctors' && <DoctorList/>}
       {path === 'newDoctors' && <NewDoctors/>} 
        </div>
        
    </div>
    </sideBarContext.Provider>
    </adminLoading.Provider>
  )
}

export default AdminHome
