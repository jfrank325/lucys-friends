const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      unique: true,
    },
    password: String,
    profilePic: String,
    babies: {
      type: Array,
    },
    type: {
      type: String,
    },
    friends: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    _messages: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Messages',
      },
    ],
    _seenMessages: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Messages',
      },
    ],
    _authoredMessages: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Messages',
      },
    ],
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
