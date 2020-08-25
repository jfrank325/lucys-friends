import React, { useState } from 'react';
import axios from 'axios';
import Upload from './Upload';
import styled from 'styled-components';

const SignupWrapper = styled.div`
  .login-form {
    margin: 0 auto;
    max-width: 20rem;
    padding-top: 8rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    font-size: 1rem;
    .auth-select {
      margin: 2rem 0;
      label {
        color: var(--sky);
      }
      select {
        background-color: var(--yellow);
        border: none;
        border-radius: 25px;
        padding: 0.3rem 0.5rem;
        font-family: 'Balsamiq Sans', 'Open Sans', Arial;
        color: white;
        option {
        }
      }
    }
    .auth-input {
      margin: 0.5rem 0;
      label {
      }
      input {
        border: none;
        border-radius: 25px;
        font-size: 1.2rem;
        padding: 0 0.3rem;
        &::placeholder {
          color: var(--sky);
          font-family: 'Balsamiq Sans', 'Open Sans', Arial;
          text-align: center;
        }
      }
    }
    button {
      margin-top: 1.5rem;
      font-size: 1rem;
      padding: 0.5rem 1rem;
    }
  }
`;

const Signup = ({ setUser, history }) => {
  const [state, setState] = useState({
    username: '',
    email: '',
    password: '',
    profilePic: '',
    type: '',
    loading: 'waiting',
  });
  const [error, setError] = useState();

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
      try {
        const res = await axios.post('/api/auth/signup', {
          username: state.username,
          email: state.email,
          password: state.password,
          profilePic: state.profilePic,
          type: state.type,
        });
        setUser(res.data);
        history.push('/friend/profile');
      } catch (error) {
        setError(error?.response?.data?.message);
      }
    }
  };

  return (
    <SignupWrapper>
      <form className="login-form" onSubmit={handleSubmit}>
        {error && <h3 style={{ color: 'red', paddingBottom: '2rem' }}>{error}</h3>}
        <div className="auth-input">
          <label htmlFor="username">
            <input
              type="text"
              required
              name="username"
              placeholder="Username"
              value={state.username}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="auth-input">
          <label htmlFor="email">
            <input type="text" required name="email" placeholder="Email" value={state.email} onChange={handleChange} />
          </label>
        </div>
        <div className="auth-input">
          <label htmlFor="password">
            <input
              type="password"
              required
              name="password"
              placeholder="Password"
              value={state.password}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="auth-select">
          <label htmlFor="type">Are you signing up as a baby or a friend? </label>
          <select value={state.type} name="type" required onChange={handleChange}>
            <option name="type" value=""></option>
            <option name="type" value="BABY">
              BABY/CHILD
            </option>
            <option name="type" value="FRIEND">
              FRIEND
            </option>
          </select>
        </div>
        <Upload uploadImage={uploadImage} profPic={true} loading={state.loading} />
        <button type="submit">Sign Up</button>
      </form>
    </SignupWrapper>
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
