const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../models/User');

/* Here we'll write the routes dedicated to handle the user logic (auth) */

router.post('/signup', (req, res) => {
  const { username, email, password, profilePic, type } = req.body;

  if (!username) {
    return res.status(400).json({ message: "Username can't be empty" });
  }
  if (password.length < 8) {
    return res.status(400).json({ message: 'Password is too short' });
  }

  User.findOne({ username: username })
    .then((found) => {
      if (found) {
        return res.status(400).json({ message: 'Username is already taken' });
      }
      return bcrypt
        .genSalt()
        .then((salt) => {
          return bcrypt.hash(password, salt);
        })
        .then((hash) => {
          return User.create({ username: username, email: email, password: hash, profilePic: profilePic, type: type });
        })
        .then((newUser) => {
          // passport login
          req.login(newUser, (err) => {
            if (err) res.status(500).json({ message: 'Error while logging in' });
            else res.json(newUser);
          });
        });
    })
    .catch((err) => {
      res.status(500).json({ message: 'Error while authorizing' });
    });
});

router.get('/babies', (req, res) => {
  User.find()
    .limit(30)
    .then((babies) => {
      res.json(babies);
    })
    .catch((err) => {
      res.status(500).json({
        message: { message: 'Could not get babies' },
      });
    });
});

router.get('/requesters/:id', (req, res) => {
  const id = req.params.id;
  User.findById(id)
    .populate('_requests')
    .populate('friends')
    .then((requesters) => {
      res.json(requesters);
    })
    .catch((err) => {
      res.status(500).json({ message: `There was a problem getting this user's friend requests` });
    });
});

router.post('/accepted/:id', (req, res) => {
  friendId = req.params.id;
  babyId = req.body.baby;
  User.updateOne({ _id: friendId }, { $addToSet: { friends: babyId } }).exec();
  User.updateOne({ _id: babyId }, { $addToSet: { friends: friendId } })
    .exec()
    .then((res) => {
      res.json({ message: 'new friend added' });
      console.log('This is your friend', babyId);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});

router.post(`/request/:id`, (req, res) => {
  const id = req.params.id;
  const requester = req.body.requester;
  console.log(requester, id);
  User.updateOne({ _id: id }, { $addToSet: { _requests: requester } })
    .exec()
    .then((res) => {
      res.json({ message: 'new friend request' });
      console.log('This is your user', req.user);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});

router.post('/denied/:id', (req, res) => {
  const requesterId = req.params.id;
  const babyId = req.body.requester;
  User.updateOne({ _id: babyId }, { $pull: { _requests: requesterId } })
    .exec()
    .then((res) => {
      res.json({ message: 'request denied' });
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});

router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, info) => {
    if (err) {
      return res.status(500).json({ message: 'Error while authenticating' });
    }
    if (!user) {
      // no user found with username or password didn't match
      return res.status(400).json({ message: `no user found with username or password didn't match` });
    }
    // passport req.login
    req.login(user, (err) => {
      if (err) {
        return res.status(500).json({ message: 'Error while logging in' });
      }
      res.json(user);
    });
  })(req, res, next);
});

router.delete('/logout', (req, res) => {
  // passport logout function
  req.logout();
  res.json({ message: 'Successful logout' });
});

router.get('/loggedin', (req, res) => {
  res.json(req.user);
});

module.exports = router;
