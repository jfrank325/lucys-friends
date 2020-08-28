import React from 'react';

const View = ({ type, setView }) => {
  const makeView = () => {
    setView(type);
  };
  return (
    <div>
      <button onClick={makeView}>{type}</button>
    </div>
  );
};

export default View;
