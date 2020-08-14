import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import axios from 'axios';
import GlobalStyle from './styles/globalStyle';

axios.get('/api/auth/loggedin').then((res) => {
  ReactDOM.render(
    <BrowserRouter>
      <GlobalStyle />
      <App user={res.data} />
    </BrowserRouter>,
    document.getElementById('root')
  );
});

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
