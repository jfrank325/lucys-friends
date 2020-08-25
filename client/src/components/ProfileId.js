import React, { useContext } from 'react';
import Profile from '../images/profile.png';
import { UserContext } from '../contexts/userContext';

const ProfileId = () => {
  const { user, setUser } = useContext(UserContext);
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start',
        flexDirection: 'column',
      }}
    >
      {' '}
      <h3>{user.username}'s Profile</h3>
      <img src={user.profilePic ? user.profilePic : Profile} alt="Profile" />
    </div>
  );
};

export default ProfileId;
