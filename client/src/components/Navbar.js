import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import BackArrow from '../images/arrowLW.png';
// import Profile from '../images/profile.png';

const Navbar = ({ user, setUser }) => {
  const logout = () => {
    axios.delete('/api/auth/logout').then(() => {
      setUser(null);
    });
  };

  return (
    <header>
      <nav className="navbar">
        <Link to="/">{/* <img src={BackArrow} alt="Logo" /> */}</Link>
        <Link to="/">
          <title>Lucy's Friends</title>
        </Link>
        {user && (
          <div className="link-container">
            <div className="auth-links">
              <Link to="/profile">{/* <img src={Profile} alt="Profile" /> */}</Link>
              <Link onClick={logout} to="/">
                Logout
              </Link>
            </div>
          </div>
        )}
        {!user && (
          <div className="link-container">
            <div className="auth-links">
              <Link to="/login">Login</Link>
              <Link to="/signup">Signup</Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
};

export default Navbar;
