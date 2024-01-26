import React from 'react';
import{Link} from "react-router-dom"

const Navbar = () => {
  return (
    <nav className="navbar-container">
      <div className="logo">
        <img src="mentor-logo.png" alt="Mentor Logo" />
      </div>
      <ul className="nav-list">
        <li><Link to="/">Home</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/">Contact</Link></li>
      </ul>
      <button className="find-mentor-btn">Find a Mentor</button>
      <div className="auth-buttons">
        <button className="login-btn"><Link to='/login'>Login</Link></button>
        <button className="signup-btn"><Link to='/register'>Sign Up</Link></button>
      </div>
    </nav>
  );
};

export default Navbar;
