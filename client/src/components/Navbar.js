import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
// import BackArrow from '../images/arrowLW.png';
import Profile from '../images/profile.png';
import styled from 'styled-components';

const NavbarWrapper = styled.header`
  .navbar {
    position: fixed;
    min-height: 4rem;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: var(--sky);
    h1 {
      font-weight: 500;
      color: var(--sunrise);
      font-size: 3rem;
      margin-left: 9rem;
    }
    .link-container {
      display: flex;
      align-items: center;
      .auth-links a {
        padding: 0 1rem;
        color: var(--sunrise);
        font-weight: 800;
        font-size: 1.3rem;
      }
      .auth-links img {
        width: 2rem;
        padding: 0 1rem;
      }
    }
  }
`;

const Navbar = ({ user, setUser }) => {
  const logout = () => {
    axios.delete('/api/auth/logout').then(() => {
      setUser(null);
    });
  };

  return (
    <NavbarWrapper>
      <nav className="navbar">
        <Link to="/">{/* <img src={BackArrow} alt="Logo" /> */}</Link>
        <Link to="/">
          <title>Lucy's Friends</title>
          {!user || user.type === 'FRIEND' ? <h1>Lucy's Friends</h1> : <h1>{user.username}'s Friends</h1>}
        </Link>
        {user && (
          <div className="link-container">
            <div className="auth-links">
              <Link to="/friend/profile">
                <img src={Profile} alt="Profile" />
              </Link>

              <Link onClick={logout} to="/">
                Log Out
              </Link>
            </div>
          </div>
        )}
        {!user && (
          <div className="link-container">
            <div className="auth-links">
              <Link to="/login">Log In</Link>
              <Link to="/signup">Sign Up</Link>
            </div>
          </div>
        )}
      </nav>
    </NavbarWrapper>
  );
};

export default Navbar;
