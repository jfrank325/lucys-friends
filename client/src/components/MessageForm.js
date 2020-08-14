import React, { useState } from 'react';
import axios from 'axios';
import Upload from './Upload';

const MessageForm = ({ toggleCreateMessage, createMessage, friend, user, refresh }) => {
  const [message, setMessage] = useState({
    content: '',
    image: '',
    video: '',
    loading: 'waiting',
  });

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'gagwud8b');
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
    data.append('upload_preset', 'gagwud8b');
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
          image: message.image,
          video: message.video,
          content: message.content,
          friend: friend,
        })
        .then(() => {
          console.log({ message }, { friend }, { user });
          setMessage({ ...message, content: '' });
          toggleCreateMessage();
          refresh();
        });
    }
  };

  return (
    <form className="create-message" encType="multipart/form-data" onSubmit={handleSubmit}>
      <label htmlFor="content">Content</label>
      <input id="content" name="content" value={message.content} onChange={handleChange} />
      <Upload id="uploads" uploadImage={uploadImage} uploadVideo={uploadVideo} loading={message.loading} />
      <button className="button" style={{ margin: '2rem auto 0 auto' }} onClick={refresh}>
        Submit Post
      </button>
    </form>
  );
};

export default MessageForm;
