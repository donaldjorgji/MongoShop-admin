import React from 'react';
import './Navbar.css';
import navlogo from '../assets/nav-logo.svg';
import navprofileIcon from '../assets/nav-profile.svg';

const Navbar = () => {

  const handleLogout = () => {
    // Fshi te gjitha çelesat e admin ose login state
    localStorage.removeItem('role'); // roli admin
    localStorage.removeItem('adminToken'); // token admin nese perdor
    localStorage.removeItem('user'); // nese ke ruajtur user gjithashtu

    // Ridrejto tek faqja e user
    window.location.href = import.meta.env.VITE_APP_URL;
  }

  return (
    <div className='navbar'>
      <div className='navbar-left'>
        <img src={navlogo} className='nav-logo' alt="Logo" />
      </div>

      <div className='navbar-right'>
        <img src={navprofileIcon} className='nav-profile' alt="Profile" />
        <button className='nav-logout' onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;