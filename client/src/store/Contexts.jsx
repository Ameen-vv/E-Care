import React,{createContext,useState,useEffect} from 'react'
import  {signInWithGoogle} from '../firebase/config'
import axios from 'axios'
import { doctorUrl, userUrl } from '../../apiLinks/apiLinks'
export const firebaseContext = createContext()
export const userContext = createContext('')





function Contexts({children}) {
  const [user, SetUser] = useState(null)
  const doctorCheck = () => {
    const token = localStorage.getItem('doctorToken')
    const headers = {Authorization:token}
    axios.get(`${doctorUrl}authenticate`, {headers}).then((response) => {
      console.log('thsi');
      response.data.user ? SetUser('doctor') : SetUser(null)
    }).catch(()=>{
      SetUser(null)
    })
  }
  useEffect(() => {
    const token = localStorage.getItem('userToken')
    if(token){
      const headers = {Authorization:token}
      axios.get(`${userUrl}authenticate`, {headers}).then((response) => {
        response.data.user ? SetUser('user') : doctorCheck()
      }).catch(()=>{
        doctorCheck()
      })
    }else{
      doctorCheck()
    }
  }, [])

  return (
    <userContext.Provider value={{user,SetUser}}>
    <firebaseContext.Provider value={{signInWithGoogle}}>
        {children}
    </firebaseContext.Provider>
    </userContext.Provider>
  )
}

export default Contexts
