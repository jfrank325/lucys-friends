import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

const Requests = ({ requesters, user, refresh }) => {
  const [showRequests, setShowRequests] = useState(false);
  const [response, setResponse] = useState();

  useEffect(() => {}, [requesters]);

  const acceptRequest = async (id) => {
    try {
      const res = await axios.post(`/api/auth/accepted/${id}`);
      refresh();
      setResponse(`You are now friends`);
      console.log(res.data);
    } catch {
      console.log('Could not get requests');
    }
  };

  const denyRequest = async (id) => {
    try {
      const res = await axios.post(`/api/auth/denied/${id}`, {
        baby: user._id,
      });
      refresh();
      setResponse('Request Denied');
      console.log(res.data);
    } catch {
      console.log('Trouble denying request');
    }
  };

  return (
    <>
      <h4>{response}</h4>
      {requesters.length > 0 && (
        <div>
          <h4 onClick={() => setShowRequests(!showRequests)}>You Have Friend Requests</h4>
          {requesters.map((requester, i) => (
            <div key={i}>
              {showRequests && (
                <div>
                  <p>{requester.username}</p>
                  <button onClick={() => acceptRequest(requester._id)}>Accept</button>
                  <button onClick={() => denyRequest(requester._id)}>Deny</button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default Requests;
