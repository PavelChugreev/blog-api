const { Schema, model } = require('mongoose');

const post = new Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true
  }
});

module.exports = model('Post', post);
