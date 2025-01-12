const { Schema, model } = require('mongoose');

const subscriptionsSchema = new Schema({
  _id: false,
  training: {
    type: Boolean
  },
  game: {
    type: Boolean
  }
});

const userSchema = new Schema({
  _id: String,
  username: {
    type: String
  },
  name: {
    type: String,
    required: true
  },
  surname: {
    type: String,
    required: true
  },
  date: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  subscriptions: subscriptionsSchema,
  isAdmin: {
    type: Boolean
  },
  isModerator: {
    type: Boolean
  },
});

module.exports = model('User', userSchema);
