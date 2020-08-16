import React from 'react';
import MessageForm from './MessageForm';
import { useState } from 'react';
import Message from './Message';
import styled from 'styled-components';
import Profile from '../images/profile.png';

const FriendWrapper = styled.div`
  padding: 2rem 1.5rem 0 1.5rem;
`;

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
    <FriendWrapper className="friend-card">
      <div onClick={toggleMessage}>
        {!showMessage && <img src={friend.profilePic ? friend.profilePic : Profile} alt={friend.username} />}
        <h3>{friend.username}</h3>
        {messages
          .filter((message) => message._author === friend._id)
          .slice(-1)
          .map((message) => (
            <Message message={message} toggleMessage={toggleMessage} showMessage={showMessage} />
          ))}
      </div>

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
    </FriendWrapper>
  );
};

export default Friend;
