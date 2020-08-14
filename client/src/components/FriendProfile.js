import React, { useState, useEffect } from 'react';
import SendRequest from './SendRequest';
import axios from 'axios';
import styled from 'styled-components';
import Friend from './Friend';
import Requests from './Requests';

const FriendProfileWrapper = styled.div`
  .friend-profile-container {
    padding-top: 10rem;
  }
`;

const FriendProfile = ({ user }) => {
  const [babies, setBabies] = useState([]);
  const [query, setQuery] = useState('');
  const [requesters, setRequesters] = useState([]);
  const [friends, setFriends] = useState([]);
  const [messages, setMessages] = useState([]);

  let queryCheck = query.length > 0;

  useEffect(() => {
    getBabies();
  }, [queryCheck]);

  const getBabies = async () => {
    const res = await axios.get('/api/auth/babies');
    setBabies(res.data);
  };

  useEffect(() => {
    getRequests();
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
    let filteredbabies = [...babies].filter(
      (baby) => baby.type === 'BABY' && baby.username.toLowerCase().includes(query.toLowerCase())
    );
    console.log({ filteredbabies });
    if (query.length > 0) {
      setBabies(filteredbabies);
    } else {
      getBabies();
    }
  }, [query]);

  const sendRequest = async (id) => {
    const res = await axios.post(`/api/auth/request/${id}`, {
      requester: user._id,
    });
    console.log(res);

    return <p>Your friend request was sent!</p>;
  };

  return (
    <FriendProfileWrapper>
      <div className="friend-profile-container">
        <h3>Search for Babies You Know</h3>
        <input type="text" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
        {queryCheck && babies.map((baby) => <SendRequest key={baby._id} baby={baby} sendRequest={sendRequest} />)}
        <h1>{user.username}</h1>
        <img src={user.profilePic} alt="Profile" />
        <Requests requesters={requesters} user={user} />
        {friends.map((friend) => (
          <Friend refresh={getBabies} messages={messages} friend={friend} key={friend._id} user={user} />
        ))}
      </div>
    </FriendProfileWrapper>
  );
};

export default FriendProfile;
