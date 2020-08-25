import React, { useState, useRef } from 'react';
import axios from 'axios';
import Upload from './Upload';
import WebcamCapture from './WebcamCapture';
import Content from './Content';
import Cam from '../images/Cam.png';
import UploadPic from '../images/UploadWhite.png';
import styled from 'styled-components';

const MessageFormWrapper = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: var(--yellow);
  border-radius: 10px;
  margin: 0 auto;
  max-width: 14rem;
  border: 0.5rem solid var(--yellow);
  .content-send {
    display: flex;
    align-items: center;
    background-color: white;
    border-radius: 0.3rem;
  }
  .photo-option {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 1.5rem;
    border: 0.1rem solid white;
    color: white;
    border-radius: 5px;
    padding: 0.05rem 0.25rem 0 0.25rem;
    margin: 0.25rem 0.2rem 0 0.2rem;
    font-size: 0.7rem;
  }
  .send-button {
    padding: 0.5rem;
    height: 1.5rem;
    font-size: 0.9rem;
    font-family: 'Balsamiq Sans', 'Open Sans', Arial;
    background-color: var(--yellow);
    border-radius: 0;
  }
`;

const MessageForm = ({ friend, refresh, friends }) => {
  const [showWebcam, setShowWebcam] = useState(false);
  const [showUploads, setShowUploads] = useState(false);
  const webcamRef = useRef(null);
  const [messageSent, setMessageSent] = useState();
  const [message, setMessage] = useState({
    selfie: '',
    content: '',
    image: '',
    video: '',
    loading: 'waiting',
  });

  const capture = async () => {
    const imageSrc = webcamRef.current.getScreenshot();

    setMessage({ ...message, loading: 'loading' });
    try {
      const res = await axios.post('	https://api.cloudinary.com/v1_1/dv1aih6td/image/upload', {
        file: imageSrc,
        upload_preset: 'hyvmowkc',
      });
      setMessage({ ...message, selfie: res.data.secure_url, loading: 'finished' });
    } catch {
      console.log('could not get image');
    }
  };

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'hyvmowkc');
    setMessage({ ...message, loading: 'loading' });

    const res = await fetch('	https://api.cloudinary.com/v1_1/dv1aih6td/image/upload', {
      method: 'POST',
      body: data,
    });
    const file = await res.json();

    setMessage({ ...message, image: file.secure_url, loading: 'finished' });
  };

  const uploadVideo = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'hyvmowkc');
    setMessage({ ...message, loading: 'loading' });
    const res = await fetch('	https://api.cloudinary.com/v1_1/dv1aih6td/video/upload', {
      method: 'POST',
      body: data,
    });
    const file = await res.json();

    setMessage({ ...message, video: file.secure_url, loading: 'finished' });
  };

  const handleChange = (event) => {
    setMessage({ ...message, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (message.loading !== 'loading') {
      axios
        .post('/api/messages', {
          selfie: message.selfie,
          image: message.image,
          video: message.video,
          content: message.content,
          friend: friend,
        })
        .then(() => {
          setMessage({ ...message, content: '' });
          refresh();
        });
    }
  };

  const handleAllSubmit = async (event) => {
    event.preventDefault();
    if (message.loading !== 'loading') {
      try {
        const res = await axios.post('/api/messages/forAll', {
          selfie: message.selfie,
          image: message.image,
          video: message.video,
          content: message.content,
          friends: friends,
        });
        setMessage({ ...message, content: '' });

        refresh();
        if (res.status === 200) {
          setMessageSent('Your message was sent');
        }
      } catch {
        console.log('could not submit');
      }
    }
  };

  return (
    <MessageFormWrapper
      className="create-message"
      encType="multipart/form-data"
      onSubmit={friends ? handleAllSubmit : handleSubmit}
    >
      <div className="content-send">
        <Content content={message.content} sent={messageSent} handleChange={handleChange} />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <button className="sent-button" onClick={refresh}>
            SEND
          </button>
        </div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', width: '20rem' }}>
        <div className="photo-option" onClick={() => setShowWebcam(!showWebcam)}>
          <p>Take Photo</p>
          <img style={{ height: '1rem', width: 'auto', marginLeft: '.5rem' }} src={Cam} alt="take a selfie" />
        </div>

        <div className="photo-option" onClick={() => setShowUploads(!showUploads)}>
          <p>Photo/Video</p>
          <img
            style={{ height: '1.5rem', width: 'auto', marginLeft: '.5rem' }}
            src={UploadPic}
            alt="Upload a selfie or video"
          />
        </div>
      </div>
      <div>
        {showUploads && (
          <Upload id="uploads" uploadImage={uploadImage} uploadVideo={uploadVideo} loading={message.loading} />
        )}
        {showWebcam && <WebcamCapture capture={capture} selfie={message.selfie} webcamRef={webcamRef} />}
      </div>
    </MessageFormWrapper>
  );
};

export default MessageForm;
