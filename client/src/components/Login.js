import React, { useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const LoginWrapper = styled.div`
  .login-form {
    margin: 0 auto;
    max-width: 20rem;
    padding-top: 8rem;
    display: flex;
    flex-direction: column;
    font-size: 1.3rem;
    .auth-select {
      margin: 2rem 0;
      label {
      }
      select {
        background-color: var(--sunrise);
        border: none;
        border-radius: 25px;
        padding: 0.3rem 0.5rem;
        option {
        }
      }
    }
    .auth-input {
      text-align: left;
      margin: 0.5rem 0;
      label {
      }
      input {
        border: none;
        border-radius: 25px;
        font-size: 1.2rem;
        padding: 0 0.3rem;
      }
    }
    button {
      margin-top: 1.5rem;
      font-size: 1.5rem;
      padding: 0.5rem 1rem;
    }
  }
`;

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
        // if (state.type === 'BABY') {
        //   history.push('/profile');
        // } else {
        // }
        // update state for user in <App/>
        setUser(response.data);
        history.push('/friend/profile');
      })
      .catch((err) => {
        setState({ ...state, message: err.response.data.message });
      });
  };

  return (
    <LoginWrapper>
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
        <button type="submit">Log In</button>
      </form>
      {state.message && <p>{state.message}</p>}
    </LoginWrapper>
  );
};

export default Login;
