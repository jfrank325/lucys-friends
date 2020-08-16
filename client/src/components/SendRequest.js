import React from 'react';
import Axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';

const SendRequestWrapper = styled.div`
  margin: 0 0.5rem;
`;

const SendRequest = ({ baby }) => {
  const [showPic, setShowPic] = useState();
  const sendRequest = async () => {
    try {
      const res = await Axios.post(`/api/auth/request`, {
        baby: baby._id,
      });
      console.log(res.json);
      return <p>Your friend request was sent!</p>;
    } catch {
      console.log('Could not send request');
    }
  };

  const show = () => {
    setShowPic(!showPic);
  };

  return (
    <SendRequestWrapper>
      <div onClick={show}>
        <h4>{baby.username}</h4>
      </div>
      {showPic && (
        <>
          <img src={baby.profilePic} style={{ height: '3rem', width: 'auto' }} alt={baby.username} />
          <button onClick={sendRequest}>Send Request</button>
        </>
      )}
    </SendRequestWrapper>
  );
};
export default SendRequest;
