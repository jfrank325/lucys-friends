import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import Requests from './Requests';
import Friends from './Friends';
import Profile from '../images/profile.png';
import Babies from './Babies';
import ProfileId from './ProfileId';
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

const FriendProfile = () => {
  const [babies, setBabies] = useState([]);
  const [query, setQuery] = useState('');
  const [requesters, setRequesters] = useState([]);
  const [friends, setFriends] = useState([]);
  const [messages, setMessages] = useState([]);
  const { user, setUser } = useContext(UserContext);

  const getPeople = async () => {
    try {
      const res = await axios.get('/api/auth/babies');
      setBabies(res.data);
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
        setRequesters(res.data._requests.filter((requester) => !user.friends.includes(requester._id)));
        setFriends(res.data.friends);
      } catch {
        console.log('Could not get requests');
      }
    } else {
      const res = await axios.get(`/api/auth/requesters/${user._id}`);
      setFriends(res.data.friends);
    }
  };

  useEffect(() => {
    getRequests();
  }, [requesters.length]);

  const getMessages = async () => {
    try {
      const res = await axios.get(`/api/auth/messages`);
      setMessages(res.data._messages);
    } catch {
      console.log('Could not get messages');
    }
  };
  useEffect(() => {
    getMessages();
  }, []);

  useEffect(() => {
    let filteredbabies = [...babies].filter((baby) => baby.username.toLowerCase().includes(query.toLowerCase()));
    if (query.length > 0) {
      setBabies(filteredbabies);
    } else {
      getPeople();
    }
  }, [query]);
  console.log({ user });
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
            placeholder="Search For New Friends"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      )}
      {query && query.length > 0 && <Babies babies={babies} />}
      <Requests requesters={requesters} refresh={getRequests} />
      {/* <ProfileId user={user} /> */}
      {user.type === 'BABY' && (
        <>
          <h3>Create a Post for all your friends</h3>
          <MessageForm refresh={getPeople} friends={user.friends} />
        </>
      )}
      {/* <h3>{user.username}</h3>
      <img src={user.profilePic ? user.profilePic : Profile} alt="Profile" /> */}
      <Friends refresh={getPeople} messages={messages} friends={friends} />
    </FriendProfileWrapper>
  );
};

export default FriendProfile;
