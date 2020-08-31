import React from 'react';
import AdultMessage from './AdultMessage';
import ScrollToBottom from 'react-scroll-to-bottom';

const AdultMessages = ({ messages }) => {
  return (
    <ScrollToBottom className="messages">
      <div>
        {messages.map((message) => (
          <AdultMessage message={message} key={message._id} />
        ))}
      </div>
    </ScrollToBottom>
  );
};

export default AdultMessages;
