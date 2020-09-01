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
  .prof-pic {
    width: auto;
    height: 2.1rem;
    border-radius: 25px;
    margin: 0.1rem 0.5 0 0;
  }
  p {
    padding-left: 0.5rem;
    font-size: 0.9rem;
  }
  cursor: pointer;
  img {
    height: auto;
    width: 320px;
  }
  video {
    height: auto;
    width: 320px;
  }
`;

const FamilyMessage = ({ message: { user, content, image, selfie, video }, name }) => {
  let isSentByCurrentUser = false;

  // const trimmedName = name.trim();

  if (user === name) {
    isSentByCurrentUser = true;
  }

  return isSentByCurrentUser ? (
    <MessageWrapper>
      <img className="prof-pic" src={name} alt={name} />
      {content && <h3>{content}</h3>}
      {image && <img src={image} alt="Smile" />}
      {selfie && <img src={selfie} alt="Smile" />}
      {video && <video autoPlay loop muted src={video} controls controlsList="nodownload" />}
    </MessageWrapper>
  ) : (
    <MessageWrapper>
      <img className="prof-pic" src={name} alt={name} />
      {content && <h3>{content}</h3>}
      {image && <img src={image} alt="Smile" />}
      {selfie && <img src={selfie} alt="Smile" />}
      {video && <video autoPlay loop muted src={video} controls controlsList="nodownload" />}
    </MessageWrapper>
  );
};

export default FamilyMessage;
