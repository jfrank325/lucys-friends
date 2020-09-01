import React from 'react';
import styled from 'styled-components';

const MessageWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 0.05rem 0.5rem;
  border: 0.05rem solid var(--sky);
  margin: 0.5rem 1rem;
  border-radius: 5px;
  img {
    width: auto;
    height: 2.1rem;
    border-radius: 25px;
    margin: 0.1rem 0.5 0 0;
  }
  p {
    padding-left: 0.5rem;
    font-size: 0.9rem;
  }
`;

const FamilyMessage = ({ message: { user, text }, name }) => {
  let isSentByCurrentUser = false;

  // const trimmedName = name.trim();

  if (user === name) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <MessageWrapper>
      <img src={name} alt={name} />
      <p>{text}</p>
    </MessageWrapper>
  ) : (
    <MessageWrapper>
      <p>{text}</p>
      <img src={user} alt={user} />
    </MessageWrapper>
  );
};

export default FamilyMessage;
