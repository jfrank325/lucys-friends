import React from 'react';
import View from './View';

const Views = ({ setView }) => {
  return (
    <div>
      <View type="Messages" setView={setView} />
      <View type="Friends" setView={setView} />
      <View setView={setView} />
    </div>
  );
};

export default Views;
