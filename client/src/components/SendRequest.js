import React from 'react';
import Axios from 'axios';
import { useState } from 'react';
import styled from 'styled-components';

const SendRequestWrapper = styled.div`
  margin: 0 0.5rem;
`;

const SendRequest = ({ baby, user }) => {
  const [showPic, setShowPic] = useState();
  const [response, setResponse] = useState();

  const sendRequest = async () => {
    if (!baby._requests.includes(user._id)) {
      try {
        const res = await Axios.post(`/api/auth/request`, {
          baby: baby._id,
        });
        if (res.status === 200) {
          setResponse(`Your request was sent to ${res.data.username}!`);
        } else {
          setResponse(`Your request was unsuccessful`);
        }
      } catch {
        console.log('Could not send request');
      }
    } else {
      setResponse(`You've already sent a request to ${baby.username}`);
    }
  };

  const show = () => {
    setShowPic(!showPic);
  };

  return (
    <SendRequestWrapper>
      <div onClick={show}>
        <h4>{response}</h4>
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
