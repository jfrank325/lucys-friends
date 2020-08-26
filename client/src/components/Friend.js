import React, { useContext } from 'react';
import MessageForm from './MessageForm';
import { useState } from 'react';
import Message from './Message';
import styled from 'styled-components';
import Profile from '../images/profile.png';
import Axios from 'axios';
import { UserContext } from '../contexts/userContext';
import Selfie from './Selfie';
import { Link } from 'react-router-dom';

const FriendWrapper = styled.div`
  padding: 0.5rem;
  background-color: var(--yellow);
  margin: 1rem;
  border-radius: 5px;
  h2 {
    color: var(--sky);
  }
  img {
    width: auto;
    max-width: 15rem;
    max-height: auto;
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

const Friend = ({ friend, refresh, messages, myProfile }) => {
  const [showMessage, setShowMessage] = useState(false);
  const [newMessage, setNewMessage] = useState();
  const { user } = useContext(UserContext);

  const seen = (id) => !user._seenMessages.includes(id) && setNewMessage(true);

  return (
    <FriendWrapper className={newMessage ? 'new' : 'old'}>
      <div onClick={() => setShowMessage(!showMessage)}>
        <h2>{friend.username}</h2>
        {friend.type === 'BABY' && <Link to={`/baby/profile/${friend._id}`}>See {friend.username}'s Profile</Link>}
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
              seen={seen}
            />
          ))}
      </div>
      {myProfile && (
        <MessageForm createMessage={() => setShowMessage(!showMessage)} friend={friend} user={user} refresh={refresh} />
      )}
    </FriendWrapper>
  );
};

export default Friend;
