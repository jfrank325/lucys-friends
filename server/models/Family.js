const mongoose = require('mongoose');

// const { Schema } = mongoose;
const Schema = mongoose.Schema;

const familySchema = new Schema(
  {
    name: String,
    creator: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    _messages: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Message',
      },
    ],
    _members: [
      {
        type: Schema.Types.ObjectId,
        ref: 'User',
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

const Family = mongoose.model('Family', familySchema);

module.exports = Family;
