import React, { useContext, useState } from 'react';
import { UserContext } from '../contexts/userContext';
import styled from 'styled-components';
import Axios from 'axios';
import Plus from '../images/plus.png';
import AlbumImages from './AlbumImages';

const AlbumWrapper = styled.div`
  input[type='file'] {
    display: none;
  }
  form {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    label {
      background-color: lightgrey;
      padding: 0.4rem;
      width: min-content;
      margin: 1rem auto;
      img {
        width: 1rem;
        ${'' /* margin: 0.1rem; */}
      }
    }
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
          <img src={Plus} alt="add img" />
        </label>
        {albumEntry.entry && <img src={albumEntry.entry} alt="album entry" />}
        {albumEntry.loading === 'finished' && <button>Add Image</button>}
      </form>
      {user._albumImages && <AlbumImages images={user._albumImages} />}
    </AlbumWrapper>
  );
};

export default Album;
