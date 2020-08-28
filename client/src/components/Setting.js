import React from 'react';
import styled from 'styled-components';
import { useState } from 'react';

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

const Setting = ({ updateSetting, message }) => {
  const [selected, setSelected] = useState(false);

  const updateAndToggle = () => {
    updateSetting();
    setSelected(!selected);
  };

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
