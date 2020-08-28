import React from 'react';
import AdultMessage from './AdultMessage';

const AdultMessages = ({ messages }) => {
  return (
    <div>
      {messages.map((message) => (
        <AdultMessage message={message} key={message._id} />
      ))}
    </div>
  );
};

export default AdultMessages;
