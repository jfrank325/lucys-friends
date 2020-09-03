import React, { useState, useEffect, useRef } from 'react';
import ScrollToBottom, { useScrollToBottom, useSticky } from 'react-scroll-to-bottom';
import FamilyMessage from './FamilyMessage';
import AdultMessage from './AdultMessage';
import Axios from 'axios';

const FamilyMessages = ({ oldMessages, messages, name }) => {
  const messagesEndRef = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <div>
      {oldMessages &&
        oldMessages.map((message) => (
          <div key={message._id}>
            <AdultMessage message={message} />
          </div>
        ))}
      {/* {authoredMessage && <AdultMessage message={authoredMessage} />} */}
      {messages.map((message, index) => (
        <div>
          <FamilyMessage message={message} name={name} />
        </div>
      ))}
      <div ref={messagesEndRef} />
    </div>
  );
};
export default FamilyMessages;
