
import { useRef, useState, useEffect } from "react";
import {useNavigate} from 'react-router-dom'
import { FaBars, FaTimes } from "react-icons/fa";
import axios from "axios";
import { userUrl,doctorUrl } from "../../../apiLinks/apiLinks";
import './Header.css'


function Header() {
	const navRef = useRef();
	const Navigate = useNavigate()
	const [user,setUser] = useState(false)
	const showNavbar = () => {
		navRef.current.classList.toggle("responsive_nav");
	};
	const doctorCheck = (token)=>{
		axios.post(`${doctorUrl}authenticate`, token).then((response) => {
			response.data.user ? setUser(true) : setUser(false)
        })
	}  
	useEffect(() => {
        const token = document.cookie
        axios.post(`${userUrl}authenticate`, token).then((response) => {
          response.data.user ? setUser(true) : doctorCheck(token)
        })
      }, [])
	

	return (
		<header>
            <div className="logoDiv">
                <img className="logo" src="\images\e-care-high-resolution-logo-color-on-transparent-background (1).png" alt=""  height={100} width={100}/>
            </div>
			<nav ref={navRef} className='me-auto navMar' >
				<a  onClick={()=>Navigate('/')}>Home</a>
				<a onClick={()=>Navigate('/departments')} >Department</a>
				<a onClick={()=>Navigate('/profile')} >Profile</a>
				<a onClick={()=>Navigate('/wallet')} >Wallet</a>
				<a  >About</a>
				<button
					className="nav-btn nav-close-btn"
					onClick={showNavbar}>
					<FaTimes />
				</button>
                <div className="">
                    <p className="login"><a href="" className="">Login</a>/<a href="" className="">Register</a></p>
                </div>
			</nav>
			<button className="nav-btn" onClick={showNavbar}>
				<FaBars />
			</button>
			{
				!user && <div className="ms-auto login2 me-5">
                <p className=""><a onClick={()=>Navigate('/signIn')} className="">Login</a> / <a onClick={()=>Navigate('/signUp')} className="">Register</a></p>
            </div>
			}
            
		</header>
	);
}
export default Header