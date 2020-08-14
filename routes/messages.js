const router = require('express').Router();
const Message = require('../models/Messages');
const User = require('../models/User');

router.post('/messages', (req, res) => {
  const { content, image, video, friend } = req.body;
  Message.create({
    content,
    image,
    video,
    friend,
    _author: req.user._id,
  }).then((messageDocument) => {
    const messageId = messageDocument._id;
    res.json(messageDocument);
    User.findByIdAndUpdate(friend._id, { $addToSet: { _messages: messageId } }).exec();
    User.findByIdAndUpdate(_author, { $addToSet: { _authoredMessages: messageId } }.exec());
  });
  //   .catch((err) => {
  //     res.status(500).json({
  //       message: err.message,
  //     });
  // });
});

module.exports = router;
