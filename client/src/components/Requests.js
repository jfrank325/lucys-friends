import React, { useEffect } from 'react';
import axios from 'axios';
import { useState } from 'react';

const Requests = ({ requesters, user }) => {
  const [showRequests, setShowRequests] = useState();
  console.log(requesters, 'requesters');

  useEffect(() => {}, [requesters]);

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

  const toggleRequests = () => {
    if (showRequests) {
      setShowRequests(false);
    }
    if (!showRequests) {
      setShowRequests(true);
    }
  };

  return (
    <>
      {requesters.length > 0 ? (
        <div>
          <h4 onClick={toggleRequests}>Friend Requests</h4>
          {requesters.map((requester) => (
            <>
              {showRequests && (
                <div>
                  <p>{requester.username}</p>
                  <button onClick={() => acceptRequest(requester._id)}>Accept</button>
                  <button onClick={() => denyRequest(requester._id)}>Deny</button>
                </div>
              )}
            </>
          ))}
        </div>
      ) : (
        <h4>No Pending Requests</h4>
      )}
    </>
  );
};

export default Requests;
