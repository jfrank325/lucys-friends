import React from 'react';

const BabyProfile = ({ user }) => {
  return (
    <div className="profile-container">
      <img src={user.profilePic} alt="Profile" />
      {/* {requesters.map((requester) => (
        <p>{requester.username}</p>
      ))} */}
    </div>
  );
};

export default BabyProfile;
