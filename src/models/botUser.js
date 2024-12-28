const { Schema, model } = require('mongoose');

const botUser = new Schema({
  _id: {
    type: String,
    required: true
  },
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
  subscriptions: {
    type: Map,
    of: Boolean
  },
  isAdmin: {
    type: Boolean
  },
  isModerator: {
    type: Boolean
  },
});

module.exports = model('BotUser', botUser);
