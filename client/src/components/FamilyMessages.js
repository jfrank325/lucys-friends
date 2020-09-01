import React, { useState, useEffect } from 'react';
import ScrollToBottom from 'react-scroll-to-bottom';
import FamilyMessage from './FamilyMessage';
import AdultMessage from './AdultMessage';
import Axios from 'axios';

const FamilyMessages = ({ oldMessages, messages, name }) => {
  const [authoredMessage, setAuthoredMessage] = useState();
  // const authors = messages.length > 0 && messages.map((message) => message.user);
  // console.log({ authors });

  const getAuthors = async () => {
    if (messages.length > 0) {
      try {
        const res = await Axios.get('api/auth/author');
        setAuthoredMessage(res.data._authoredMessages.slice(-1));
        console.log(res.data, 'authored');
      } catch {
        console.log('Could not get authors');
      }
    }
  };

  useEffect(() => {
    getAuthors();
  }, [messages.length]);
  console.log(authoredMessage, 'authoredMessage');
  return (
    <ScrollToBottom className="messages">
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
    </ScrollToBottom>
  );
};
export default FamilyMessages;
