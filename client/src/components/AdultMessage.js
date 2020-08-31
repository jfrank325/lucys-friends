import React from 'react';
import styled from 'styled-components';
import AdultContent from './AdultContent';
import AdultImage from './AdultImage';

const AdultMessageWrapper = styled.div`
  padding: 0.05rem 0.5rem;
  border: 0.05rem solid var(--sky);
  margin: 0.5rem 1rem;
  border-radius: 5px;
  @media (max-width: 768px) {
    max-width: 20rem;
  }
`;

const AdultMessage = ({ message }) => {
  const { content, created_at, image, selfie, video, _author } = message;
  return (
    <AdultMessageWrapper>
      {/* {image && <AdultImage image={image} authorImage={_author.profilePic} author={_author.username} />}
      {selfie && <AdultImage image={selfie} authorImage={_author.profilePic} author={_author.username} />}
      {video && <video autoPlay loop muted src={video} controls controlsList="nodownload" />} */}
      {content && <AdultContent image={_author.profilePic} author={_author.username} content={content} />}
    </AdultMessageWrapper>
  );
};

export default AdultMessage;
