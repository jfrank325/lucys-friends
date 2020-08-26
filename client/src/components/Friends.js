import React from 'react';
import Friend from './Friend';
import styled from 'styled-components';

const FriendsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const Friends = ({ refresh, messages, friends, myProfile }) => {
  return (
    <FriendsWrapper>
      {' '}
      {friends.map((friend) => (
        <Friend refresh={refresh} messages={messages} friend={friend} myProfile={myProfile} key={friend._id} />
      ))}
    </FriendsWrapper>
  );
};

export default Friends;
