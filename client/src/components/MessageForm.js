import React, { useState } from 'react';

const MessageForm = () => {
  const [state, setState] = useState({
    image: '',
    video: '',
    loading: 'waiting',
  });

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'gagwud8b');
    setState({ ...state, loading: 'loading' });

    const res = await fetch('	https://api.cloudinary.com/v1_1/dv1aih6td/image/upload', {
      method: 'POST',
      body: data,
    });
    const file = await res.json();

    setState({ ...state, image: file.secure_url, loading: 'finished' });
  };

  const uploadVideo = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'gagwud8b');
    setState({ ...state, loading: 'loading' });
    const res = await fetch('	https://api.cloudinary.com/v1_1/dv1aih6td/video/upload', {
      method: 'POST',
      body: data,
    });
    const file = await res.json();

    setState({ ...state, video: file.secure_url, loading: 'finished' });
  };

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (state.loading !== 'loading') {
      axios
        .post('/api/messages', {
          image: state.image,
          video: state.video,
          content: state.content,
        })
        .then(() => {
          setState({ ...state, content: '' });
          closeForm();
          refresh();
        });
    }
  };

  return (
    <form className="create-message" encType="multipart/form-data" onSubmit={handleSubmit}>
      <label htmlFor="content">Content</label>
      <textarea rows="5" id="content" name="content" value={content} onChange={handleChange} />
      <Uploads id="uploads" uploadImage={uploadImage} uploadVideo={uploadVideo} loading={state.loading} />
      <button className="button" style={{ margin: '2rem auto 0 auto' }} onClick={refresh}>
        Submit Post
      </button>
    </form>
  );
};

export default MessageForm;
