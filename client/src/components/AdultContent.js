import React from 'react';
import styled from 'styled-components';

const AdultContentWrapper = styled.div`
  display: flex;
  height: 2.5rem;
  align-items: center;
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

const AdultContent = ({ image, author, content }) => {
  return (
    <AdultContentWrapper>
      <img src={image} alt={author} />
      <p>{content}</p>
    </AdultContentWrapper>
  );
};

export default AdultContent;
