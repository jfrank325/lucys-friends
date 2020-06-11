import React, { useState } from 'react';
import axios from 'axios';

const Login = ({ setUser, history }) => {
  const [state, setState] = useState({
    username: '',
    password: '',
    message: '',
  });

  const handleChange = (event) => {
    setState({ ...state, [event.target.name]: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    axios
      .post('/api/auth/login', {
        username: state.username,
        password: state.password,
      })
      .then((response) => {
        // redirect
        history.push('/');
        // update state for user in <App/>
        setUser(response.data);
      })
      .catch((err) => {
        setState({ ...state, message: err.response.data.message });
      });
  };

  return (
    <>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="auth-input">
          <label htmlFor="username">Username: </label>
          <input type="text" id="username" name="username" value={state.username} onChange={handleChange} />
        </div>
        <div className="auth-input">
          {' '}
          <label htmlFor="password">Password: </label>
          <input type="password" name="password" id="password" value={state.password} onChange={handleChange} />
        </div>
        <button type="submit">Sign in</button>
      </form>
      {state.message && <p>{state.message}</p>}
    </>
  );
};

export default Login;
