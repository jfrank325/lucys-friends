import React from 'react';
import styled from 'styled-components';
import Axios from 'axios';

const MessageWrapper = styled.div`
  img {
    height: auto;
    width: 320px;
  }
  video {
    height: auto;
    width: 320px;
  }
`;

const Message = ({ message, showMessage, toggleMessage, nowSeen, seen }) => {
  const { content, image, video, selfie, _id } = message;
  seen(_id);
  // const nowSeen = async () => {
  //   try {
  //     const res = await Axios.post('/api/auth/seen', {
  //       seenMessage: message._id,
  //     });
  //     console.log(res.data, 'response from seen');
  //   } catch {
  //     console.log('Could not add this message to seen messages');
  //   }
  // };

  return (
    <MessageWrapper>
      {showMessage && (
        <div onClick={nowSeen(_id)}>
          {content && <h3>{content}</h3>}
          {image && <img src={image} alt="Smile" />}
          {selfie && <img src={selfie} alt="Smile" />}
          {video && <video autoPlay loop muted src={video} controls controlsList="nodownload" />}
        </div>
      )}
    </MessageWrapper>
  );
};

export default Message;
