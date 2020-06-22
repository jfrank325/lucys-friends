import React from 'react';

const SendRequest = ({ baby, sendRequest }) => {
  const id = baby._id;
  return (
    <>
      <button onClick={() => sendRequest(id)}>{baby.username}</button>
      <p>{baby._requests}</p>
    </>
  );
};
export default SendRequest;
