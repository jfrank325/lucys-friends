import React, { useEffect, useState, useRef } from 'react';
import styled from 'styled-components';
import Axios from 'axios';

const MessageWrapper = styled.div`
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

const Message = ({ message, showMessage, notSeen }) => {
  const { content, image, video, selfie, _id } = message;
  // const [updatedMessage, setUpdatedMessage] = useState(message);
  const didMountRef = useRef(false);

  useEffect(() => {
    notSeen(_id);
  }, [_id]);

  const nowSeen = async () => {
    try {
      const res = await Axios.post(`/api/auth/seen`, {
        seenMessage: message._id,
      });
      console.log(res.data, 'response from seen');
    } catch {
      console.log('Could not add this message to seen messages');
    }
  };

  // const getUpdatedMessage = async () => {
  //   try {
  //     const res = await Axios.get(`/api/messages/message`, {
  //       id: _id,
  //     });
  //     console.log(res.data, 'updatedMessage');
  //     setUpdatedMessage(res.data);
  //   } catch {
  //     console.log('Could not get updated messages');
  //   }
  // };

  // useEffect(() => {
  //   if (didMountRef.current) {
  //     getUpdatedMessage();
  //   } else didMountRef.current = true;
  // }, [nowSeen]);

  return (
    <MessageWrapper>
      {showMessage && (
        <div onClick={nowSeen}>
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
