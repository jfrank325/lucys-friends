import React from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import FamilyMessage from './FamilyMessage';
import AdultMessage from './AdultMessage';

const FamilyMessages = ({ oldMessages, messages, name }) => {
  return (
    <ScrollToBottom className="messages">
      {/* {oldMessages.map((message) => (
        <div key={message._id}>
          <AdultMessage message={message} />
        </div>
      ))} */}
      {messages.map((message, index) => (
        <div key={index}>
          <FamilyMessage message={message} name={name} />
        </div>
      ))}
    </ScrollToBottom>
  );
};
export default FamilyMessages;
