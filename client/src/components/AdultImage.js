import React from 'react';
import styled from 'styled-components';

const AdultImageWrapper = styled.div`
  display: flex;
  align-items: flex-start;
  .author-image {
    width: auto;
    height: 2.1rem;
    border-radius: 25px;
    margin: 0.1rem 0.5 0 0;
  }
`;
const AdultImage = ({ image, authorImage, author }) => {
  return (
    <AdultImageWrapper>
      <img className="author-image" src={authorImage} alt={author} />
      <img src={image} alt={author} />
    </AdultImageWrapper>
  );
};

export default AdultImage;
