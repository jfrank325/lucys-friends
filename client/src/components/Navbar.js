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
    background-color: var(--sunrise);
    line-height: 0;
    .title {
      margin-top: 2rem;
      h1 {
        font-weight: 500;
        color: var(--sky);
        font-size: 3rem;
        line-height: 0;
      }
    }
    .link-container {
      display: flex;
      position: absolute;
      align-items: center;
      right: 50px;
      top: 10px;
      .auth-links a {
        margin: 0 0rem 0 1rem;
        color: var(--sky);
        font-weight: 800;
        font-size: 1.3rem;
        line-height: 0;
      }
      .auth-links img {
        width: 2.1rem;
        height: 2.1rem;
        border-radius: 25px;
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
        <div className="title">
          <title>Lucy's Friends</title>
          <Link to="/">
            {!user || user.type === 'FRIEND' ? <h1>Lucy's Friends</h1> : <h1>{user.username}'s Friends</h1>}
          </Link>
        </div>
        {user && (
          <div className="link-container">
            <div className="auth-links">
              <Link to="/friend/profile">
                <img style={{ width: '2rem' }} src={user.profilePic ? user.profilePic : Profile} alt="Profile" />
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
