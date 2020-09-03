const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
    },
    email: {
      type: String,
    },
    password: String,
    profilePic: String,
    babies: {
      type: Array,
    },
    type: {
      type: String,
      required: true,
    },
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    _requests: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    ],
    _messages: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Message',
      },
    ],
    _seenMessages: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Message',
      },
    ],
    _authoredMessages: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Message',
      },
    ],
    _families: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Family',
      },
    ],
    _albumImages: [
      {
        type: String,
      },
    ],
    emailNotifications: {
      type: Boolean,
      default: false,
    },
    profilePublic: {
      type: Boolean,
      default: false,
    },
    profileVisibleToFriends: {
      type: Boolean,
      default: false,
    },
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
