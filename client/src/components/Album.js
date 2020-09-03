import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/userContext';
import styled from 'styled-components';
import Axios from 'axios';

const AlbumWrapper = styled.div`
  input[type='file'] {
    display: none;
  }
`;

const Album = () => {
  const { user } = useContext(UserContext);
  const [albumEntry, setAlbumEntry] = useState({
    entry: '',
    loading: 'waiting',
  });

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'hyvmowkc');
    setAlbumEntry({ ...albumEntry, loading: 'loading' });

    const res = await fetch('	https://api.cloudinary.com/v1_1/dv1aih6td/image/upload', {
      method: 'POST',
      body: data,
    });
    const file = await res.json();

    setAlbumEntry({ ...albumEntry, entry: file.secure_url, loading: 'finished' });
  };

  const uploadVideo = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'hyvmowkc');
    setAlbumEntry({ ...albumEntry, loading: 'loading' });
    const res = await fetch('	https://api.cloudinary.com/v1_1/dv1aih6td/video/upload', {
      method: 'POST',
      body: data,
    });
    const file = await res.json();

    setAlbumEntry({ ...albumEntry, entry: file.secure_url, loading: 'finished' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (albumEntry.loading !== 'loading') {
      try {
        const res = await Axios.post('/api/auth/album', {
          entry: albumEntry.entry,
        });
        if (res.status === 200) {
          console.log('image sent');
        }
      } catch {
        console.log('could not submit');
      }
    }
  };

  return (
    <AlbumWrapper>
      <form encType="multipart/form-data" onSubmit={handleSubmit}>
        <label htmlFor="imgPath">
          <input type="file" id="imgPath" name="imgPath" onChange={uploadImage} />
          &#43;
        </label>
        <button>Add Image</button>
      </form>
      {albumEntry.entry && <img src={albumEntry.entry} alt="album entry" />}
      {user._albumImages && (
        <div>
          {user._albumImages.map((entry) => (
            <img src={entry} alt="entry" />
          ))}
        </div>
      )}
    </AlbumWrapper>
  );
};

export default Album;
