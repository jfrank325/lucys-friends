import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Requests from './Requests';
import Friends from './Friends';
import Profile from '../images/profile.png';
import Babies from './Babies';
import ProfileId from './ProfileId';

const FriendProfileWrapper = styled.div`
  input {
    border: none;
    border-top: solid 0.2rem var(--sky);
    border-bottom: solid 0.2rem var(--sky);
    background-color: white;
    margin: 0.5rem 0.5rem;
    font-size: 1.5rem;
    height: 3rem;
    overflow-wrap: normal;
    text-align: center;
    color: var(--sky);
    font-family: 'Balsamiq Sans', 'Open Sans', Arial;
    &::placeholder {
      color: var(--sunrise);
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
`;

const FriendProfile = ({ user }) => {
  const [babies, setBabies] = useState([]);
  const [query, setQuery] = useState('');
  const [requesters, setRequesters] = useState([]);
  const [friends, setFriends] = useState([]);
  const [messages, setMessages] = useState([]);

  const getPeople = async () => {
    try {
      const res = await axios.get('/api/auth/babies');
      setBabies(res.data);
      console.log(res.data, 'people');
    } catch {
      console.log('Could not get babies');
    }
  };

  useEffect(() => {
    getPeople();
  }, []);

  const getRequests = async () => {
    if (user.type === 'BABY') {
      try {
        const res = await axios.get(`/api/auth/requesters/${user._id}`);
        setRequesters(res.data._requests);
        setFriends(res.data.friends);
        console.log('response', res.data);
      } catch {
        console.log('Could not get requests');
      }
    } else {
      const res = await axios.get(`/api/auth/requesters/${user._id}`);
      setFriends(res.data.friends);
      console.log(res.data.friends);
    }
  };

  useEffect(() => {
    getRequests();
  }, [requesters.length]);

  const getMessages = async () => {
    try {
      const res = await axios.get(`/api/auth/messages`);
      setMessages(res.data._messages);
      console.log('messages', res.data._messages);
    } catch {
      console.log('Could not get messages');
    }
  };
  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    let filteredbabies = [...babies].filter((baby) => baby.username.toLowerCase().includes(query.toLowerCase()));
    console.log({ filteredbabies });
    if (query.length > 0) {
      setBabies(filteredbabies);
    } else {
      getPeople();
    }
  }, [query]);

  console.log({ query });

  return (
    <FriendProfileWrapper>
      {user.type === 'FRIEND' && (
        <div>
          {/* <h3>Search for Babies You Know</h3> */}
          <input type="text" placeholder="Search For Babies" value={query} onChange={(e) => setQuery(e.target.value)} />
        </div>
      )}
      {user.type === 'BABY' && (
        <div>
          {/* <h3>Search for Friends You Know</h3> */}
          <input
            type="text"
            placeholder="Search For Friends"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      )}
      {query.length > 0 && <Babies babies={babies} />}
      <ProfileId user={user} />
      {/* <h3>{user.username}</h3>
      <img src={user.profilePic ? user.profilePic : Profile} alt="Profile" /> */}
      {user.type === 'BABY' && <Requests requesters={requesters} user={user} />}
      <Friends refresh={getPeople} messages={messages} friends={friends} user={user} />
    </FriendProfileWrapper>
  );
};

export default FriendProfile;
