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
        background-color: var(--yellow);
        border: none;
        border-radius: 100 / 2;
        padding: 0.3rem 0.5rem;
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
        padding: 0;
        &::placeholder {
          color: var(--sky);
          font-family: 'Balsamiq Sans', 'Open Sans', Arial;
          text-align: center;
        }
      }
    }
    button {
      font-size: 1rem;
      width: 6rem;
      margin: 1.5rem auto 0 auto;
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
        setUser(response.data);
        if (response.data.type === 'BABY') {
          history.push('/friend/profile');
        } else {
          history.push('/profile');
        }
      })
      .catch((err) => {
        setState({ ...state, message: err.response.data.message });
      });
  };

  return (
    <LoginWrapper>
      <form className="login-form" onSubmit={handleSubmit}>
        <div className="auth-input">
          <label htmlFor="username">
            <input
              type="text"
              id="username"
              name="username"
              placeholder="Username"
              value={state.username}
              onChange={handleChange}
            />
          </label>
        </div>
        <div className="auth-input">
          {' '}
          <label htmlFor="password">
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Password"
              value={state.password}
              onChange={handleChange}
            />
          </label>
        </div>
        <button type="submit">Log In</button>
      </form>
      {state.message && <p>{state.message}</p>}
    </LoginWrapper>
  );
};

export default Login;
