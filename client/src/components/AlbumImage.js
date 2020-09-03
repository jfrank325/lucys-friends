import React from 'react';
import styled from 'styled-components';

const aImage = styled.img`
  max-width: 15rem;
`;
const AlbumImage = ({ image }) => <img src={image} alt="img" />;

export default AlbumImage;
