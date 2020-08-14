import React from 'react';
import MessageForm from './MessageForm';
import { useState } from 'react';
import Message from './Message';

const Friend = ({ friend, refresh, user, messages }) => {
  const [createMessage, setCreateMessage] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  const toggleMessage = () => {
    setShowMessage(!showMessage);
  };

  const toggleCreateMessage = () => {
    setCreateMessage(!createMessage);
  };
  console.log({ messages });

  return (
    <div onClick={toggleMessage} className="friend-card">
      <h3>{friend.username}</h3>
      {!showMessage && <img src={friend.profilePic} alt={friend.username} />}
      {messages
        .filter((message) => message._author === friend._id)
        .slice(-1)
        .map((message) => (
          <Message
            message={message}
            img={friend.profilePic}
            name={friend.username}
            toggleMessage={toggleMessage}
            showMessage={showMessage}
          />
        ))}
      <button onClick={toggleCreateMessage}>Send {friend.username} a new message</button>
      {createMessage && (
        <MessageForm
          toggleCreateMessage={toggleCreateMessage}
          createMessage={createMessage}
          friend={friend}
          user={user}
          refresh={refresh}
        />
      )}
    </div>
  );
};

export default Friend;
