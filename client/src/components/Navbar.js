import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import LF from '../images/LucyMiniLogo.png';
import Profile from '../images/profile.png';
import Settings from '../images/SettingsBlue.png';
import styled from 'styled-components';

const NavbarWrapper = styled.header`
  .navbar {
    position: fixed;
    max-height: 3rem;
    width: 100%;
    background-color: var(--yellow);
    display: flex;
    justify-content: space-between;
    align-items: center;
    .home {
      height: 2.5rem;
      width: auto;
      margin-left: 1rem;
    }
    h1 {
      font-weight: 500;
      color: var(--sky);
      font-size: 2.8rem;
    }
    .auth-links {
      display: flex;
      align-items: center;
      justify-content: flex-end;
    }
    .auth-links a {
      padding: 1rem;
      color: var(--sky);
      font-weight: 800;
      font-size: 1.3rem;
      height: auto;
    }
    .auth-links img {
      width: auto;
      height: 2.1rem;
      border-radius: 25px;
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
        <title>Lucy's Friends</title>
        <Link to="/">
          {/* {!user || user.type === 'FRIEND' ? ( */}
          <img className="home" src={LF} alt="Home" />
          {/* ) : (
            <h1>{user.username}'s Friends</h1>
          )} */}
        </Link>
        {user && (
          <div className="link-container">
            <div className="auth-links">
              <Link to="/friend/profile">
                <img style={{ width: '2rem' }} src={user.profilePic ? user.profilePic : Profile} alt="Profile" />
              </Link>
              <Link to="/settings">
                <img src={Settings} alt="settings" />
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
