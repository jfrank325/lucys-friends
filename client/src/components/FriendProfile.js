import React, { useState, useEffect } from 'react';
import SendRequest from './SendRequest';
import axios from 'axios';

const FriendProfile = ({ user }) => {
  const [babies, setBabies] = useState([]);
  const [query, setQuery] = useState('');
  const [requesters, setRequesters] = useState([]);
  const [friends, setFriends] = useState([]);

  useEffect(() => {
    if (query.length > 0) {
      getBabies();
    }
  }, []);

  const getBabies = async () => {
    const res = await axios.get('/api/auth/babies');
    setBabies(res.data);
  };

  useEffect(() => {
    getRequests();
  }, []);

  const getRequests = async () => {
    if (user.type === 'BABY') {
      const res = await axios.get(`/api/auth/requesters/${user._id}`);
      setRequesters(res.data._requests);
      setFriends(res.data.friends);
      console.log('response', res.data);
    } else {
      const res = await axios.get(`/api/auth/requesters/${user._id}`);
      setFriends(res.data.friends);
    }
  };

  useEffect(() => {
    let filteredbabies = [...babies].filter(
      (baby) => baby.type === 'BABY' && baby.username.toLowerCase().includes(query.toLowerCase())
    );
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
    console.log(
      'requests',
      babies.map((baby) => baby._requests)
    );
  };

  const acceptRequest = async (id) => {
    const res = await axios.post(`/api/auth/accepted/${id}`, {
      baby: user._id,
    });
    console.log(res.data);
  };

  const denyRequest = (id) => {
    axios.post(`/api/auth/denied/${id}`, {
      baby: user._id,
    });
  };

  let uniqueFriends = friends.filter((friend) => [...new Set(friends)].includes(friend));

  return (
    <div className="friend-profile-container">
      <h1>{user.username}</h1>
      <h4>Pending Friend Requests</h4>
      {requesters.map((requester) => (
        <>
          <p>{requester.username}</p>
          <button onClick={() => acceptRequest(requester._id)}>Accept</button>
          <button onClick={() => denyRequest(requester._id)}>Deny</button>
        </>
      ))}
      <img src={user.profilePic} alt="Profile" />
      {uniqueFriends.map((friend) => (
        <div className="friend-card">
          <h3>{friend.username}</h3>
          <img src={friend.profilePic} alt={friend.username} />
        </div>
      ))}
      <input type="text" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
      {query.length > 0 && babies.map((baby) => <SendRequest key={baby._id} baby={baby} sendRequest={sendRequest} />)}
    </div>
  );
};

export default FriendProfile;
