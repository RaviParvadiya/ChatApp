import React from 'react'
import "../SignOut/SignOut.css"
import { FaSignOutAlt } from "react-icons/fa";



const SignOut = () => {


    const handleSignOut = () => {
        localStorage.removeItem('token');
        window.location.href = '/';
      };
    
  return (
    <div>
          <button className='sout-btn' onClick={handleSignOut}><span className='sout-span'>Sign Out</span><FaSignOutAlt/></button>
          

    </div>
  )
}

export default SignOut
