import { useState,createContext } from 'react'
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom'
import reactLogo from './assets/react.svg'
import './App.css'
import Home from './pages/User/Homepage/Home'
import SignUp from './pages/User/SignUp/SignUp'
import SignIn from './pages/User/SignIn/SignIn'
import ProfilePage from './pages/User/Profile-page/ProfilePage'
import DepartmentPage from './pages/User/Departments/DepartmentPage'
import DoctorPage from './pages/User/DoctorPage/DoctorPage'
import DoctorHome from './pages/Doctor/Doctor_HomePage/DoctorHome'
import Doctor_Profile from './pages/Doctor/Doctor_Profile/Doctor_Profile'
import Appointment from './pages/User/Appointment/Appointment'
import WalletPage from './pages/User/Wallet/WalletPage'
import PrivateRoutes from './pvtRoutes/PrivateRoutes'
import ProfileVerification from './pages/Doctor/Verification/ProfileVerification'
import DoctorRoutes from './pvtRoutes/DoctorRoutes'
import AdminPanel from './pages/Admin/Home/Home'
import AdminHome from './pages/Admin/Home/Home'
import AdminLogin from './pages/Admin/LogIn/AdminLogin'
function App() {

  return (
    <Router>
      <Routes>
      <Route exact path='/' element={<Home/>}/>
        <Route element={<PrivateRoutes/>}>
            <Route path='/book' element={<Appointment/>}/>
            <Route path = '/wallet' element={<WalletPage/>}/>
            <Route path='/profile' element={<ProfilePage/>}/>
        </Route>
        <Route element = {<DoctorRoutes/>}> 
        <Route path='/doctorView' element={<DoctorPage/>}/>
        <Route path='/doctor/home' element={<DoctorHome/>}/>
        <Route path='/doctor/profile' element={<Doctor_Profile/>}/>
        </Route>
        <Route path='/signUp' element={<SignUp/>}/>
        <Route path='/admin' element={<AdminLogin/>}/>
        <Route path='/admin/home' element={<AdminHome/>}/>
        <Route path='/signIn' element={<SignIn/>}/>
        <Route path='/departments' element={<DepartmentPage/>}/>
        <Route path='/doctor/verification' element={<ProfileVerification/>}/>
      </Routes>
    </Router>
  )
}

export default App
