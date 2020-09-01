import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import Content from './Content';
import Cam from '../images/Cam.png';
import UploadPic from '../images/UploadWhite.png';
import axios from 'axios';
import Upload from './Upload';
import WebcamCapture from './WebcamCapture';
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
    padding-left: 0.4rem;
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
    padding: 0 0.6rem 0 0.6rem;
    margin: 0;
    height: 2rem;
    border-radius: 0;
    border-top-right-radius: 0.3rem;
    border-bottom-right-radius: 0.3rem;
    overflow: hidden;
    font-size: 0.9rem;
    font-family: 'Balsamiq Sans', 'Open Sans', Arial;
    background-color: var(--sky);
  }
`;

const Input2 = ({ message, setMessage, sendMessage }) => {
  const [showWebcam, setShowWebcam] = useState(false);
  const [showUploads, setShowUploads] = useState(false);
  const webcamRef = useRef(null);

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
  console.log({ message });
  return (
    <MessageFormWrapper className="create-message" encType="multipart/form-data" onSubmit={(e) => sendMessage(e)}>
      <div className="content-send">
        <Content content={message.content} handleChange={handleChange} />
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <button className="send-button" onClick={(message) => sendMessage(message)}>
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
            style={{ height: '1rem', width: 'auto', marginLeft: '.5rem' }}
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

export default Input2;

{
  /* <form className="form">
  <input
    type="text"
    placeholder="Type a message..."
    value={message}
    onChange={(event) => setMessage(event.target.value)}
    onKeyPress={(event) => (event.key === 'Enter' ? sendMessage(event) : null)}
    className="input"
  />
  <button className="sendButton" onClick={(event) => sendMessage(event)}>
    Send
  </button>
</form>  */
}
