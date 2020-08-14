import React from 'react';

const Message = ({ message, img, name, showMessage, toggleMessage }) => {
  const { content, image, video } = message;

  return (
    <div onClick={toggleMessage}>
      {showMessage && (
        <div>
          {content && <h3>{content}</h3>}
          {image && <img src={image} />}
          {video && <video autoPlay loop muted src={video} controls controlsList="nodownload" />}
        </div>
      )}
    </div>
  );
};

export default Message;
