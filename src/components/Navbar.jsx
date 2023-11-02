import React from 'react'
import '../styles/Navbar.scss'
import { useNavigate } from "react-router-dom";


const Navbar = () => {
   const navigate = useNavigate();

  return (
    <div className='header'>
    <div className='title-header'>
       PASSWORD MANAGER
    </div>
    <div className='navbar-collection'>
       {/* <div className="navbar-item">
          <button onClick={() => navigate('/')}>Main</button>
       </div> */}
       {/* <div className="navbar-item">
          <button onClick={() => navigate('/family')}>family</button>
       </div> */}
    </div>
 </div>
  )
}

export default Navbar
