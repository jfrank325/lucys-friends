import React, { useState, useRef } from 'react';
import axios from 'axios';
import Upload from './Upload';
import WebcamCapture from './WebcamCapture';
import Content from './Content';
import Cam from '../images/Cam.png';
import UploadPic from '../images/Upload.png';

const MessageForm = ({ friend, user, refresh, friends }) => {
  const [showWebcam, setShowWebcam] = useState(false);
  const [showUploads, setShowUploads] = useState(false);
  const webcamRef = useRef(null);
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

  const handleAllSubmit = (event) => {
    event.preventDefault();
    if (message.loading !== 'loading') {
      axios
        .post('/api/messages/forAll', {
          selfie: message.selfie,
          image: message.image,
          video: message.video,
          content: message.content,
          friends: friends,
        })
        .then(() => {
          setMessage({ ...message, content: '' });
          refresh();
        });
    }
  };

  return (
    <form className="create-message" encType="multipart/form-data" onSubmit={friends ? handleAllSubmit : handleSubmit}>
      <div style={{ dispaly: 'flex', justifyContent: 'space-between', alignItems: 'center', lineHeight: '0' }}>
        <img
          onClick={() => setShowWebcam(!showWebcam)}
          style={{ height: '2rem', width: 'auto', padding: '1rem 1rem 0 1rem' }}
          src={Cam}
          alt="take a selfie"
        />
        {showWebcam && <WebcamCapture capture={capture} selfie={message.selfie} webcamRef={webcamRef} />}
        <img
          onClick={() => setShowUploads(!showUploads)}
          style={{ height: '2rem', width: 'auto' }}
          src={UploadPic}
          alt="Upload a selfie or video"
        />
        {showUploads && (
          <Upload id="uploads" uploadImage={uploadImage} uploadVideo={uploadVideo} loading={message.loading} />
        )}
      </div>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          lineHeight: '0',
          borderTop: '0.2rem solid var(--lightBlue)',
        }}
      >
        <Content content={message.content} handleChange={handleChange} />
        <button
          className="button"
          style={{ padding: '.5rem', borderRadius: '0', height: '2rem', fontSize: '.9rem' }}
          onClick={refresh}
        >
          SEND
        </button>
      </div>
    </form>
  );
};

export default MessageForm;
