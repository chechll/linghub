import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';

const Navbar = ( {isLoggedIn} ) => {
    return (
      <nav>
        {!isLoggedIn && <div className="logo"><Link to="/">LingHub</Link></div>}
        {isLoggedIn && <div className="logo"><Link to="/home">LingHub</Link></div>}
        <ul className="nav-links">
          {!isLoggedIn && <><li><Link to="/sign_in">Sign In</Link> </li>
          <li><Link to="/sign_up">Sign Up</Link></li></>}
          {isLoggedIn && <><li><Link to="/text_page">Text page</Link></li>
          <li><Link to="/word_page">Word page</Link></li>
          <li><Link to="/user">User</Link></li></>}
        </ul>
      </nav>  
    );
  };
  
  export default Navbar;