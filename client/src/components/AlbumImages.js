import React from 'react';
import AlbumImage from './AlbumImage';

const AlbumImages = ({ images }) => {
  return (
    <div>
      {images.map((entry, i) => (
        <AlbumImage image={entry} key={i} />
      ))}
    </div>
  );
};

export default AlbumImages;
