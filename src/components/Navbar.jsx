import React from "react";
import { Link } from "react-router-dom";

const Navbar = ({ isLoggedIn, operatingData }) => {
  return (
    <nav>
      <div className="logo">
        {isLoggedIn ? (
          <Link to="/home">LingHub</Link>
        ) : (
          <Link to="/">LingHub</Link>
        )}
      </div>
      <ul className="nav-links">
        {!isLoggedIn && (
          <>
            <li>
              <Link to="/sign_in">Sign In</Link>
            </li>
            <li>
              <Link to="/sign_up">Sign Up</Link>
            </li>
          </>
        )}
        {isLoggedIn && operatingData.isAdmin !== 2 && (
          <>
            <li>
              <Link to="/text_page">Text page</Link>
            </li>
            <li>
              <Link to="/word_page">Word page</Link>
            </li>
            <li>
              <Link to="/user">User</Link>
            </li>
          </>
        )}
        {isLoggedIn && operatingData.isAdmin === 2 && (
          <>
            <li>
              <Link to="/user_management">Manage</Link>
            </li>
            <li>
              <Link to="/user">User</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;