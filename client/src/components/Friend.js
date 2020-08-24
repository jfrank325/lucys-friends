import React from 'react';
import MessageForm from './MessageForm';
import { useState } from 'react';
import Message from './Message';
import styled from 'styled-components';
import Profile from '../images/profile.png';
import Axios from 'axios';

const FriendWrapper = styled.div`
  padding: 1rem;
  background-color: var(--sunrise);
  margin: 1rem;
  border-radius: 5px;
  h2 {
    color: var(--sky);
  }
  img {
    width: auto;
    max-width: 18rem;
    max-height: 20rem;
  }
  .new {
    @keyframes border_change {
      from {
        ${'' /* border: solid 0.2rem var(--sky);
        transform: scaleY(0.99);
        transform: scaleX(0.99); */}
        transform: translateX(5%);
      }
      to {
        ${'' /* border: solid 0.2rem white;
        transform: scaleY(1.01);
        transform: scaleX(1.01); */}
        transform: translateX(-5%);
      }
    }
    animation: border_change 0.5s infinite ease-in-out alternate;
  }
`;

const Friend = ({ friend, refresh, user, messages }) => {
  const [createMessage, setCreateMessage] = useState(false);
  const [showMessage, setShowMessage] = useState(false);
  const [newMessage, setNewMessage] = useState();

  const nowSeen = async (mess) => {
    try {
      const res = await Axios.post('/api/auth/seen', {
        seenMessage: mess,
      });
      console.log(res.data, 'response from seen');
    } catch {
      console.log('Could not add this message to seen messages');
    }
  };

  const seen = (id) => !user._seenMessages.includes(id) && setNewMessage(true);

  return (
    <FriendWrapper className={newMessage ? 'new' : 'old'}>
      <div onClick={() => setShowMessage(!showMessage)}>
        <h2>{friend.username}</h2>
        {!showMessage && (
          <img
            className={newMessage ? 'new' : 'old'}
            src={friend.profilePic ? friend.profilePic : Profile}
            alt={friend.username}
          />
        )}
        {messages
          .filter((message) => message._author === friend._id)
          .slice(-1)
          .map((message) => (
            <Message
              key={message._id}
              message={message}
              toggleMessage={() => setShowMessage(!showMessage)}
              showMessage={showMessage}
              nowSeen={nowSeen}
              seen={seen}
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
