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
      const onlyBabies = babies.filter((baby) => baby.type === 'BABY');
      const onlyAdults = babies.filter((baby) => baby.type === 'FRIEND');
      if (req.user.type === 'FRIEND') {
        res.json(onlyBabies);
      }
      if (req.user.type === 'BABY') {
        res.json(onlyAdults);
      }
    })
    .catch((err) => {
      res.status(500).json({
        message: { message: 'Could not get babies' },
      });
    });
});

router.get('/messages', (req, res) => {
  User.findById(req.user._id)
    .populate('_messages')
    .then((messages) => {
      res.json(messages);
    })
    .catch((err) => {
      res.status(500).json({ message: 'We could not retrieve messages' });
    });
});

router.get('/baby/messages/:id', (req, res) => {
  User.findById(req.params.id)
    .populate('_messages')
    .then((messages) => {
      res.json(messages);
    })
    .catch((err) => {
      res.status(500).json({ message: 'We could not retrieve messages' });
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

router.get('/babies/friends/:id', (req, res) => {
  const babyId = req.params.id;
  console.log(babyId);
  User.findById(babyId)
    .populate('friends')
    .then((friends) => {
      res.json(friends.friends);
    })
    .catch((err) => {
      res.status(500).json({ message: `Could not get Babys' friends` });
    });
});

router.post(`/request`, (req, res) => {
  const requester = req.user._id;
  const baby = req.body.baby;
  User.findByIdAndUpdate({ _id: baby }, { $addToSet: { _requests: requester } }, { new: true })
    .exec()
    .then((request) => {
      // res.json({ message: 'new friend request' });
      res.json(request);
      console.log(`Request sent to ${request.username}`);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});

router.post('/accepted/:id', (req, res) => {
  const friendId = req.params.id;
  const user = req.user._id;
  User.findByIdAndUpdate({ _id: friendId }, { $addToSet: { friends: user } }, { new: true }).exec();
  User.findByIdAndUpdate({ _id: user }, { $addToSet: { friends: friendId } }, { new: true }).exec();
  User.findByIdAndUpdate({ _id: user }, { $pull: { _requests: friendId } }, { new: true })
    .exec()
    .then((accepted) => {
      res.json(accepted);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});

router.post('/denied/:id', (req, res) => {
  requesterId = req.params.id;
  babyId = req.body.baby;
  User.findByIdAndUpdate({ _id: babyId }, { $pull: { _requests: requesterId } }, { new: true })
    .exec()
    .then((denied) => {
      // res.json({ message: 'request denied' });
      res.json(denied);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});

router.post('/settings/emailNotifications', (req, res) => {
  const id = req.user._id;
  const user = req.user;
  User.findByIdAndUpdate(id, {
    $set: { emailNotifications: !user.emailNotifications ? true : false },
  })
    .exec()
    .then((update) => {
      res.json(update);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.post('/settings/profileVisibleToFriends', (req, res) => {
  const id = req.user._id;
  const user = req.user;
  User.findByIdAndUpdate(id, {
    $set: { profileVisibleToFriends: !user.profileVisibleToFriends ? true : false },
  })
    .exec()
    .then((update) => {
      res.json(update);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.post('/settings/profilePublic', (req, res) => {
  const id = req.user._id;
  const user = req.user;
  User.findByIdAndUpdate(id, {
    $set: { profilePublic: !user.profilePublic ? true : false },
  })
    .exec()
    .then((update) => {
      res.json(update);
    })
    .catch((err) => {
      res.status(500).json({ message: err.message });
    });
});

router.post('/seen', (req, res) => {
  const id = req.user._id;
  const seenMessage = req.body.seenMessage;
  console.log('ids', id, seenMessage);
  User.findByIdAndUpdate(id, { $addToSet: { _seenMessages: seenMessage } })
    .exec()
    .then((seen) => {
      res.json(seen);
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});

router.get('/myFamilies', (req, res) => {
  User.findById(req.user._id)
    // .populate('_families')
    .populate({ path: '_families', ref: '_members', populate: { path: '_members', model: 'User' } })
    .then((families) => {
      res.json(families._families);
    })
    .catch((err) => {
      res.status(500).json({ message: `Could not get user's families` });
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
