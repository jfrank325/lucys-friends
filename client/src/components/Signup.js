import React, { useState } from 'react';
import axios from 'axios';
import Upload from './Upload';

const Signup = ({ setUser, history }) => {
  const [state, setState] = useState({
    username: '',
    password: '',
    profilePic: '',
    type: '',
    loading: 'waiting',
    // message: 'Error for U',
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append('file', files[0]);
    data.append('upload_preset', 'hyvmowkc');
    setState({ ...state, loading: 'loading' });

    const res = await fetch('	https://api.cloudinary.com/v1_1/dv1aih6td/image/upload', {
      method: 'POST',
      body: data,
    });
    const file = await res.json();

    setState({ ...state, profilePic: file.secure_url, loading: 'finished' });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (state.loading !== 'loading') {
      const res = await axios.post('/api/auth/signup', {
        username: state.username,
        password: state.password,
        profilePic: state.profilePic,
        type: state.type,
      });
      history.push('/');
      // update state for user in <App/>
      setUser(res.data);
    }
  };

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="auth-input">
          <label htmlFor="type">Are you signing up as a baby or a friend? </label>
          <select value={state.type} name="type" onChange={handleChange}>
            <option name="type" value="BABY">
              BABY
            </option>
            <option name="type" value="FRIEND">
              FRIEND
            </option>
          </select>
        </div>
        <div className="auth-input">
          <label htmlFor="username">Username: </label>
          <input type="text" id="username" name="username" value={state.username} onChange={handleChange} />
        </div>
        <div className="auth-input">
          <label htmlFor="password">Password: </label>
          <input type="password" name="password" id="password" value={state.password} onChange={handleChange} />
        </div>
        <Upload uploadImage={uploadImage} loading={state.loading} />
        <button type="submit">Sign up</button>
      </form>
      {state.message && <p>{state.message}</p>}
    </>
  );
};

export default Signup;

// const uploadImage = async (e) => {
//   const files = e.target.files;
//   const data = new FormData();
//   data.append('file', files[0]);
//   data.append('upload_preset', 'hyvmowkc');
//   setState({ ...state, loading: 'loading' });

//   const res = await fetch('	https://api.cloudinary.com/v1_1/dv1aih6td/image/upload', {
//     method: 'POST',
//     body: data,
//   });
//   const file = await res.json();

//   setState({ ...state, profilePic: file.secure_url, loading: 'finished' });
// };
