import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Requests from './Requests';
import Friends from './Friends';
import Babies from './Babies';
import MessageForm from './MessageForm';
import { UserContext } from '../contexts/userContext';

const FriendProfileWrapper = styled.div`
  input {
    border: none;
    border-top: solid 0.2rem var(--sky);
    border-bottom: solid 0.2rem var(--sky);
    background-color: white;
    ${'' /* margin: 0.5rem 0.5rem; */}
    font-size: 1.2rem;
    height: 2rem;
    overflow-wrap: normal;
    text-align: center;
    color: var(--sky);
    font-family: 'Balsamiq Sans', 'Open Sans', Arial;
    &::placeholder {
      color: var(--yellow);
    }
    &:focus {
      ${'' /* outline: none; */}
      ${'' /* background-color: var(--sky); */}
    }
    &:focus::-webkit-input-placeholder {
      color: transparent;
    }
  }
  h3 {
    color: var(--sky);
    padding: 1rem 0;
  }
  h2 {
    padding: 2rem 0 0.3rem 0;
    color: var(--sky);
  }
`;

const NonUserProfile = (props) => {
  const friendId = props.match.params.id;
  const [babiesFriends, setBabiesFriends] = useState([]);
  const [messages, setMessages] = useState([]);
  const { user } = useContext(UserContext);

  console.log(friendId);
  const getFriends = async () => {
    try {
      const res = await axios.get(`/api/auth/babies/friends/${friendId}`, {
        id: friendId,
      });
      console.log(res.data, 'babys friends');
      setBabiesFriends(res.data);
    } catch {
      console.log('Could not get babies');
    }
  };

  useEffect(() => {
    getFriends();
  }, [friendId]);

  const getMessages = async () => {
    try {
      const res = await axios.get(`/api/auth/baby/messages/${friendId}`);
      setMessages(res.data._messages);
    } catch {
      console.log('Could not get messages');
    }
  };
  useEffect(() => {
    getMessages();
  }, []);

  console.log({ user });
  return (
    <FriendProfileWrapper>
      <h2></h2>
      <Friends refresh={getFriends} myProfile={false} messages={messages} friends={babiesFriends} />
    </FriendProfileWrapper>
  );
};

export default NonUserProfile;
