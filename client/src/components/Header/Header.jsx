
import { useRef } from "react";
import {useNavigate} from 'react-router-dom'
import { FaBars, FaTimes } from "react-icons/fa";
import './Header.css'


function Header() {
	const navRef = useRef();
	const Navigate = useNavigate()
	const showNavbar = () => {
		navRef.current.classList.toggle("responsive_nav");
	};

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
            <div className="ms-auto login2 me-5">
                <p className=""><a onClick={()=>Navigate('/signIn')} className="">Login</a> / <a onClick={()=>Navigate('/signUp')} className="">Register</a></p>
            </div>
		</header>
	);
}
export default Header