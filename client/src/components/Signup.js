import React, { useState } from 'react';
import axios from 'axios';

const Signup = ({ setUser, history }) => {
  const [state, setState] = useState({
    username: '',
    password: '',
    // message: 'Error for U',
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const res = await axios.post('/api/auth/signup', {
      username: state.username,
      password: state.password,
    });
    history.push('/');
    // update state for user in <App/>
    setUser(res.data);
  };

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="auth-input">
          <label htmlFor="username">Username: </label>
          <input type="text" id="username" name="username" value={state.username} onChange={handleChange} />
        </div>
        <div className="auth-input">
          <label htmlFor="password">Password: </label>
          <input type="password" name="password" id="password" value={state.password} onChange={handleChange} />
        </div>
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
