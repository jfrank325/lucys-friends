import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FriendProfile = ({ user }) => {
  const [babies, setBabies] = useState([]);
  const [query, setQuery] = useState('');
  const requester = user.username;

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
      requester: requester,
    });
    console.log(res.data);
  };

  return (
    <div className="friend-profile-container">
      <img src={user.profilePic} alt="Profile" />
      <input type="text" placeholder="Search" value={query} onChange={(e) => setQuery(e.target.value)} />
      {babies.map((baby) => query.length > 0 && <button onClick={sendRequest(baby._id)}>{baby.username}</button>)}
    </div>
  );
};

export default FriendProfile;
