import React from 'react';

const Message = ({ message, showMessage, toggleMessage }) => {
  const { content, image, video, selfie } = message;

  return (
    <div onClick={toggleMessage}>
      {showMessage && (
        <div>
          {content && <h3>{content}</h3>}
          {image && <img src={image} alt="Smile" />}
          {selfie && <img src={selfie} alt="Smile" />}
          {video && <video autoPlay loop muted src={video} controls controlsList="nodownload" />}
        </div>
      )}
    </div>
  );
};

export default Message;
