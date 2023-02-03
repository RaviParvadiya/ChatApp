import React, {useEffect} from 'react'
import "./Styles/Navbar.css"
import { Link } from 'react-router-dom'


    


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
      <div className="logo">AR<span className='logo-nav'>é</span>NA</div>
      <ul className="nav-links">
        <Link className='nav-link' to='/home'>Home</Link>
        <Link className='nav-link' to='/home'>About</Link>
        <Link className='nav-link' to='/home'>Contact</Link>
      </ul>
    </div>
  </div>
  )
}

export default Navbar
