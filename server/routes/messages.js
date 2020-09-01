const router = require('express').Router();
const Message = require('../models/Messages');
const User = require('../models/User');
const Family = require('../models/Family');

router.post('/messages', (req, res) => {
  const { selfie, content, image, video, friend } = req.body;
  Message.create({
    selfie,
    content,
    image,
    video,
    friend,
    _author: req.user._id,
  })
    .then((messageDocument) => {
      const messageId = messageDocument._id;
      res.json(messageDocument);
      User.findByIdAndUpdate(friend._id, { $addToSet: { _messages: messageId } }, { new: true }).exec();
      User.findByIdAndUpdate(req.user._id, { $addToSet: { _authoredMessages: messageId } }, { new: true }).exec();
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});

router.post('/messages/forAll', (req, res) => {
  const { selfie, content, image, video, friends, family } = req.body;
  Message.create({
    selfie,
    content,
    image,
    video,
    _author: req.user._id,
  })
    .then((messageDocument) => {
      const messageId = messageDocument._id;
      res.json(messageDocument);
      User.updateMany({ _id: { $in: friends } }, { $addToSet: { _messages: messageId } }, { new: true }).exec();
      User.findByIdAndUpdate(req.user._id, { $addToSet: { _authoredMessages: messageId } }, { new: true }).exec();
      Family.findByIdAndUpdate(family, { $addToSet: { _messages: messageId } }, { new: true }).exec();
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});

router.post('/messages/forFamily', (req, res) => {
  const { selfie, content, image, video, family } = req.body;
  Message.create({
    selfie,
    content,
    image,
    video,
    _author: req.user._id,
  })
    .then((messageDocument) => {
      const messageId = messageDocument._id;
      res.json(messageDocument);
      User.findByIdAndUpdate(req.user._id, { $addToSet: { _authoredMessages: messageId } }, { new: true }).exec();
      Family.findByIdAndUpdate(family, { $addToSet: { _messages: messageId } }, { new: true }).exec();
    })
    .catch((err) => {
      res.status(500).json({
        message: err.message,
      });
    });
});
module.exports = router;
