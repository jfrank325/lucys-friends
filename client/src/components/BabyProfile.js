import React from 'react';

const BabyProfile = ({ user }) => {
  return (
    <div className="profile-container">
      <img src={user.profilePic} alt="Profile" />
    </div>
  );
};

export default BabyProfile;
