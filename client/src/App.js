import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import './App.scss';
import Navbar from './components/Navbar.js';
import Signup from './components/Signup.js';
import Login from './components/Login.js';
import BabyProfile from './components/BabyProfile';
import { UserContext } from './contexts/userContext';
import { useMemo } from 'react';
import Home from './components/Home';
import UserProfile from './components/UserProfile';
import Settings from './components/Settings';

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
        <div style={{ paddingTop: '3rem', margin: '0 10rem' }} className="main-container">
          <Home />
          <Route path="/signup" render={(props) => <Signup history={props.history} setUser={setThisUser} />} />
          <Route exact path="/login" render={(props) => <Login history={props.history} setUser={setThisUser} />} />
          <Route exact path="/friend/profile" render={(props) => <UserProfile {...props} user={user} />} />
          <Route exact path="/baby/profile/:id" render={(props) => <BabyProfile {...props} />} />
          <Route exact path="/settings" render={(props) => <Settings {...props} />} />
        </div>
      </UserContext.Provider>
    </div>
  );
};

export default App;
