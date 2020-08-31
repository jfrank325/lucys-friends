const router = require('express').Router();
const Family = require('../models/Family');
const User = require('../models/User');

router.post('/create', (req, res) => {
  const creator = req.user._id;
  const { members, name } = req.body;
  Family.create({
    name,
    _members: members,
    creator,
  }).then((family) => {
    res.json(family);
    User.updateMany({ _id: { $in: members } }, { $addToSet: { _families: family._id } }, { new: true }).exec();
    User.findByIdAndUpdate(creator, { $addToSet: { _families: family._id } }, { new: true }).exec();
  });
});

router.get('/family/:id', (req, res) => {
  const family = req.params.id;
  Family.findById(family)
    .populate('_messages')
    .populate('_members')
    .populate({ path: '_messages', ref: '_author', populate: { path: '_author', model: 'User' } })
    .then((family) => {
      res.json(family);
    })
    .catch((err) => {
      res.status(500).json({ message: `We could not get Family` });
    });
});

module.exports = router;
