import React, {useEffect} from 'react'
import "./Styles/Navbar.css"
import { Link } from 'react-router-dom'
import SignOut from './SignOut/SignOut';


const Navbar = () => {


    

    useEffect(() => {
        const handleScroll = () => {
          const navbar = document.querySelector('.navbar');
          if (window.pageYOffset > 0) {
            navbar.classList.add('scrolled');
          } else {
            navbar.classList.remove('scrolled');
          }
        };
    
        window.addEventListener('scroll', handleScroll);
        return () => {
          window.removeEventListener('scroll', handleScroll);
        };
      }, []);

      
      

  return (
    <div className="navbar">
    <div className="navbar-content">
      <div  onClick={() => window.location.replace("/home")} className="logo">AR<span className='logo-nav'>é</span>NA</div>
      <ul className="nav-links">
        <Link className='nav-link nav-css' to='/home'>Home</Link>
        <Link className='nav-link nav-css' to='/home'>About</Link>
        <Link className='nav-link nav-css' to='/home'>Contact</Link>
        <SignOut className='nav-link'></SignOut>
      </ul>
    </div>
  </div>
  )
}

export default Navbar
