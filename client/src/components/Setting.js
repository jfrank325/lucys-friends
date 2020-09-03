import React, { useEffect, useRef, useState, useContext } from 'react';
import styled from 'styled-components';
import { UserContext } from '../contexts/userContext';
import Axios from 'axios';

const SettingWrapper = styled.div`
  display: flex;
  align-items: center;

  .button-background {
    width: 2.6rem;
    height: 1.4rem;
    border: 0.2rem solid var(--sky);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 25px;
    width: 2rem;
    height: 1rem;
  }
  .button-background-on {
    width: 2.6rem;
    height: 1.4rem;
    border: 0.2rem solid var(--sky);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    border-radius: 25px;
    width: 2rem;
    height: 1rem;
    background-color: var(--gray);
  }
  .on {
    background-color: var(--sky);
    align-self: flex-end;
    margin: 0.1rem;
    transition: align-self 2s ease-out;
  }
  .off {
    background-color: var(--sky);
    align-self: flex-start;
    margin: 0.1rem;
  }
  h3 {
    background-color: #f1f1f1;
    font-size: 1.2rem;
    color: var(--sky);
    margin: 0.5rem;
  }
`;

const Setting = ({ message, setting }) => {
  const { user } = useContext(UserContext);
  const [selected, setSelected] = useState(user[setting]);
  const [updatedUser, setUpdatedUser] = useState(user);
  const didMountRef = useRef(false);
  const [selected2, setSelected2] = useState(user[setting]);

  const updateSetting = async () => {
    try {
      const res = await Axios.post(`/api/auth/settings/${setting}`);
      console.log(res.data, 'settings');
    } catch {
      console.log('nope');
    }
  };

  const updateAndToggle = () => {
    updateSetting();
    setSelected(!selected);
  };

  const getSetting = async () => {
    try {
      const res = await Axios.get(`/api/auth/settings`);
      console.log(res.data, 'get setting');
      setUpdatedUser(res.data[setting]);
    } catch {
      console.log('Could not get Setting');
    }
  };

  useEffect(() => {
    if (didMountRef.current) {
      getSetting();
      setSelected2(updatedUser.setting);
    } else didMountRef.current = true;
  }, [selected]);

  console.log({ updatedUser });
  console.log({ setSelected2 });
  return (
    <SettingWrapper>
      <div className={selected ? 'button-background-on' : 'button-background'}>
        <button className={selected ? 'on' : 'off'} onClick={updateAndToggle}></button>
      </div>
      <h3>{message}</h3>
    </SettingWrapper>
  );
};

export default Setting;
