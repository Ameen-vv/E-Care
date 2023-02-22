import {useEffect,useState} from 'react'
import {Navigate,Outlet} from 'react-router-dom'
import axios from 'axios'
import { userUrl } from '../../apiLinks/apiLinks'

const PrivateRoutes = () => {
  const [userCheck,setUserCheck] = useState(false)  
  const [check,setCheck] = useState(false)
  useEffect(()=>{
    setUserCheck(true)
    const token = document.cookie
    console.log(document.cookie);
    axios.post(`${userUrl}authenticate`,token).then((response)=>{
        console.log(response.data);
            if(response.data.user && response.data.type === 'user'){
                setUserCheck(true)
                setCheck(true)
            }else{
                setUserCheck(false)
                
            }
    })

  },[])  

    console.log(check);
    console.log(userCheck);
  


  return (
      setUserCheck ? <Outlet/> : <Navigate to='/signIn'/>
    )
  }

  export default PrivateRoutes