import React, { useContext } from 'react';
import Axios from 'axios';
import { UserContext } from '../contexts/userContext';

const Settings = () => {
  const { user } = useContext(UserContext);

  const updateEmailPreference = async () => {
    try {
      const res = await Axios.post('/api/auth/settings/emailNotifications');
      console.log(res.data, 'settings');
    } catch {
      console.log('nope');
    }
  };

  const updateProfilePublic = async () => {
    try {
      const res = await Axios.post('/api/auth/settings/profilePublic');
      console.log(res.data, 'settings');
    } catch {
      console.log('nope');
    }
  };

  const updateVisibleToFriends = async () => {
    try {
      const res = await Axios.post('/api/auth/settings/profileVisibleToFriends');
      console.log(res.data, 'settings');
    } catch {
      console.log('nope');
    }
  };

  return (
    <div>
      <button onClick={updateEmailPreference}>Allow Email Notifications</button>
      <button onClick={updateVisibleToFriends}>Allow Profile To Visible To Friends</button>
      <button onClick={updateProfilePublic}>Allow Profile To Be Public</button>
    </div>
  );
};

export default Settings;
