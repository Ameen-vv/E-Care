import React,{useState,createContext} from 'react'
import DoctorList from '../../../components/AdminComponents/DoctorList/DoctorList'
import NavbarAdmin from '../../../components/AdminComponents/Navbar/NavbarAdmin'
import SideBar from '../../../components/AdminComponents/SideBar/SideBar'
import Table from '../../../components/AdminComponents/Table/Table'
import NewDoctors from '../../../components/AdminComponents/newDoctorsList/newDoctors'
import './Home.css'
export const sideBarContext = createContext('user')
function AdminHome() {
  const [path,setpath] = useState('users')
 function changePath(x){
      setpath(x)
 }
  return (
    <sideBarContext.Provider value={{path,changePath}}>
    <div className='admin-home'>
      <SideBar/>
      <div className="homeContainer">
        <NavbarAdmin/>
       {path === 'users' && <Table/>}
       {path === 'doctors' && <DoctorList/>}
       {path === 'newDoctors' && <NewDoctors/>} 
        </div>
        
    </div>
    </sideBarContext.Provider>
  )
}

export default AdminHome
