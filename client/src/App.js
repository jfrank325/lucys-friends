import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import './App.scss';
import Navbar from './components/Navbar.js';
import Signup from './components/Signup.js';
import Login from './components/Login.js';
import FriendProfile from './components/FriendProfile';

const App = (props) => {
  const [user, setUser] = useState(props.user);

  const setThisUser = (userObj) => {
    setUser(userObj);
  };

  return (
    <div className="App">
      <Navbar setUser={setThisUser} user={user} />
      <div style={{ paddingTop: '7rem', margin: '0 10rem' }} className="main-container">
        <Route path="/signup" render={(props) => <Signup history={props.history} setUser={setThisUser} />} />
        <Route exact path="/login" render={(props) => <Login history={props.history} setUser={setThisUser} />} />
        <Route exact path="/friend/profile" render={(props) => <FriendProfile {...props} user={user} />} />
      </div>
    </div>
  );
};

export default App;
