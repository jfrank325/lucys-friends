import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import './App.scss';
import Navbar from './components/Navbar.js';
import Signup from './components/Signup.js';
import Login from './components/Login.js';
import FriendProfile from './components/FriendProfile';
import { UserContext } from './contexts/userContext';
import { useMemo } from 'react';
import Home from './components/Home';

const App = (props) => {
  const [user, setUser] = useState(props.user);

  const setThisUser = (userObj) => {
    setUser(userObj);
  };
  const value = useMemo(() => ({ user }), [user]);

  return (
    <div className="App">
      <UserContext.Provider value={value}>
        <Navbar setUser={setThisUser} user={user} />
        <div style={{ paddingTop: '5rem', margin: '0 10rem' }} className="main-container">
          <Home />
          <Route path="/signup" render={(props) => <Signup history={props.history} setUser={setThisUser} />} />
          <Route exact path="/login" render={(props) => <Login history={props.history} setUser={setThisUser} />} />
          <Route exact path="/friend/profile" render={(props) => <FriendProfile {...props} user={user} />} />
        </div>
      </UserContext.Provider>
    </div>
  );
};

export default App;
