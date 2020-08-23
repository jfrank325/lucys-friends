import React from 'react';
import MessageForm from './MessageForm';
import { useState } from 'react';
import Message from './Message';
import styled from 'styled-components';
import Profile from '../images/profile.png';

const FriendWrapper = styled.div`
  padding: 1rem;
  background-color: var(--sunrise);
  margin: 1rem;
  border-radius: 5px;

  img {
    width: auto;
    max-width: 18rem;
    max-height: 20rem;
  }
`;

const Friend = ({ friend, refresh, user, messages }) => {
  const [createMessage, setCreateMessage] = useState(false);
  const [showMessage, setShowMessage] = useState(false);

  return (
    <FriendWrapper className="friend-card">
      <div onClick={() => setShowMessage(!showMessage)}>
        <h3>{friend.username}</h3>
        {!showMessage && <img src={friend.profilePic ? friend.profilePic : Profile} alt={friend.username} />}
        {messages
          .filter((message) => message._author === friend._id)
          .slice(-1)
          .map((message) => (
            <Message
              key={message._id}
              message={message}
              toggleMessage={() => setShowMessage(!showMessage)}
              showMessage={showMessage}
            />
          ))}
      </div>

      {/* <button onClick={() => setCreateMessage(!createMessage)}>Send {friend.username} a new message</button>
      {createMessage && ( */}
      <MessageForm
        toggleCreateMessage={() => setCreateMessage(!createMessage)}
        createMessage={() => setShowMessage(!showMessage)}
        friend={friend}
        user={user}
        refresh={refresh}
      />
      {/* )} */}
    </FriendWrapper>
  );
};

export default Friend;
