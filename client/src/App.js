import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import './App.scss';
import Navbar from './components/Navbar.js';
// import Posts from './components/posts/Posts';
// import SinglePost from './components/posts/SinglePost';
import Signup from './components/Signup.js';
import Login from './components/Login.js';
// import BabyProfile from './components/BabyProfile';
import FriendProfile from './components/FriendProfile';
const App = (props) => {
  const [user, setUser] = useState(props.user);

  const setThisUser = (userObj) => {
    setUser(userObj);
  };

  return (
    <div className="App">
      <Navbar setUser={setThisUser} user={user} />
      <div style={{ paddingTop: '7rem' }} className="main-container">
        <Route
          path="/signup"
          render={(props) => <Signup history={props.history} {...props} setUser={setThisUser} />}
          // component={Signup}
        />
        <Route exact path="/login" render={(props) => <Login history={props.history} setUser={setThisUser} />} />

        {/* <Route exact path="/" render={(props) => <Posts {...props} user={user} />} /> */}

        {/* <Route path="/profile" render={() => <BabyProfile user={user} />} /> */}
        <Route exact path="/friend/profile" render={() => <FriendProfile user={user} setUser={setThisUser} />} />

        {/* <Route
          exact
          path="/posts/:postId"
          // render={(props) => <SinglePost {...props} isLoggedIn={Boolean(user)} user={user} />}
        /> */}
      </div>
    </div>
  );
};

export default App;
