import React from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import Setting from './Setting';

const SettingsWrapper = styled.div`
  display: flex;
  justify-content: center;
  .inner-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    ${'' /* width: 28rem; */}
    margin: 2rem auto;
  }
`;

const Settings = () => {
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
    <SettingsWrapper>
      <div className="inner-wrapper">
        <Setting updateSetting={updateEmailPreference} message={'Allow Email Notifications'} />
        <Setting updateSetting={updateVisibleToFriends} message={'Allow Profile To Be Visible To Friends'} />
        <Setting updateSetting={updateProfilePublic} message={'Allow Profile To Visible To Public'} />
      </div>
    </SettingsWrapper>
  );
};

export default Settings;
