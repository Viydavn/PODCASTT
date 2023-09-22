import React from 'react';
import "./style.css";
import {Link, useLocation} from "react-router-dom";
function Header() {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <div className = "navbar">
      <div className='gradient'></div>
      <div className='links'> 
        <Link to='/' className={currentPath === "/" ? "active" : ""}> Signup</Link>
        <Link to='/podcasts' className={currentPath === "/Podcasts" ? "active" : ""}> Podcasts</Link>
        <Link to='/start-a-podcast' className={currentPath === "/Start-A-Podcast" ? "active" : ""}> Start A Podcast</Link>
        <Link to='/profile' className={currentPath === "/Profile" ? "active" : ""}> Profile</Link>
      </div>
    </div>
  )
}

export default Header;