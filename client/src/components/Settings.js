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
  return (
    <SettingsWrapper>
      <div className="inner-wrapper">
        <Setting message={'Allow Email Notifications'} setting={'emailNotifications'} />
        <Setting message={'Allow Profile To Be Visible To Friends'} setting={'profileVisibleToFriends'} />
        <Setting message={'Allow Profile To Visible To Public'} setting={'profilePublic'} />
      </div>
    </SettingsWrapper>
  );
};

export default Settings;
