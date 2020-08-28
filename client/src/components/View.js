import React from 'react';

const View = ({ type, setView }) => {
  return (
    <div>
      <button onClick={setView(type)}>{type}</button>
    </div>
  );
};

export default View;
