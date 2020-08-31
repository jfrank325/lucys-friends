const mongoose = require('mongoose');

// const { Schema } = mongoose;
const Schema = mongoose.Schema;

const messageSchema = new Schema(
  {
    content: String,
    _author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    image: String,
    video: String,
    selfie: String,
  },
  {
    timestamps: {
      createdAt: 'created_at',
      updatedAt: 'updated_at',
    },
  }
);

const Message = mongoose.model('Message', messageSchema);

module.exports = Message;
