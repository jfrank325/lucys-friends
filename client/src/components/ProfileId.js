import React from 'react';
import Profile from '../images/profile.png';

const ProfileId = ({ user }) => {
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
