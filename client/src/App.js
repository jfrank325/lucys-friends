import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import './App.scss';
import Navbar from './components/Navbar.js';
import Signup from './components/Signup.js';
import Login from './components/Login.js';
import NonUserProfile from './components/NonUserProfile';
import BabyProfile from './components/BabyProfile';
import UserProfile from './components/UserProfile';
import { UserContext } from './contexts/userContext';
import { useMemo } from 'react';
import Home from './components/Home';
import Settings from './components/Settings';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';

const App = (props) => {
  const [user, setUser] = useState(props.user);

  const setThisUser = (userObj) => {
    setUser(userObj);
  };
  const value = useMemo(() => ({ user, setThisUser }), [user, setThisUser]);

  return (
    <div className="App">
      <UserContext.Provider value={value}>
        <DndProvider backend={HTML5Backend}>
          <Navbar setUser={setThisUser} user={user} />
          <div style={{ paddingTop: '3rem', margin: '0' }} className="main-container">
            <Route path="/" render={() => <Home />} />
            <Route path="/signup" render={(props) => <Signup history={props.history} setUser={setThisUser} />} />
            <Route exact path="/login" render={(props) => <Login history={props.history} setUser={setThisUser} />} />
            <Route exact path="/friend/profile" render={(props) => <BabyProfile {...props} />} />
            <Route exact path="/baby/profile/:id" render={(props) => <NonUserProfile {...props} />} />
            <Route exact path="/settings" render={(props) => <Settings {...props} />} />
            <Route exact path="/profile" render={(props) => <UserProfile {...props} />} />
          </div>
        </DndProvider>
      </UserContext.Provider>
    </div>
  );
};

export default App;
