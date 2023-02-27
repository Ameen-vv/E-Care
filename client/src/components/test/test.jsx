import { useState } from 'react';
import { FaBars, FaTimes } from 'react-icons/fa';
import { Link } from 'react-router-dom';

function Header() {
  const [showNavbar, setShowNavbar] = useState(false);

  const toggleNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  return (
    <header className="bg-blue-500 text-white shadow-md">
      <div className="flex items-center justify-between px-6 py-4 md:py-6">
        <div className="flex items-center">
          <div className="mr-4">
            <img
              className="h-16 w-16 md:h-20 md:w-20"
              src="/images/e-care-high-resolution-logo-color-on-transparent-background (1).png"
              alt=""
            />
          </div>
          <h1 className="text-2xl md:text-3xl font-bold">E-Care</h1>
        </div>

        <button
          className="block md:hidden focus:outline-none"
          onClick={toggleNavbar}
        >
          {showNavbar ? (
            <FaTimes className="h-6 w-6" />
          ) : (
            <FaBars className="h-6 w-6" />
          )}
        </button>

        <nav
          className={`${
            showNavbar ? 'block' : 'hidden'
          } md:block md:flex-grow md:ml-4`}
        >
          <ul className="text-lg md:text-xl font-medium">
            <li className="my-4 md:my-0 md:mx-4">
              <Link to="/">Home</Link>
            </li>
            <li className="my-4 md:my-0 md:mx-4">
              <Link to="/departments">Department</Link>
            </li>
            <li className="my-4 md:my-0 md:mx-4">
              <Link to="/profile">Profile</Link>
            </li>
            <li className="my-4 md:my-0 md:mx-4">
              <Link to="/wallet">Wallet</Link>
            </li>
            <li className="my-4 md:my-0 md:mx-4">
              <Link to="/about">About</Link>
            </li>
          </ul>
        </nav>

        <div className="hidden md:block">
          <ul className="text-lg font-medium">
            <li className="my-4 md:my-0 md:mx-4">
              <Link to="/signIn">Login</Link>
            </li>
            <li className="my-4 md:my-0 md:mx-4">
              <Link to="/signUp">Register</Link>
            </li>
          </ul>
        </div>
      </div>
    </header>
  );
}

export default Header;
