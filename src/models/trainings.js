const { Schema, model } = require('mongoose');
const botUser = require('./botUser');

const trainings = new Schema({
  type: Array,
  of: new Schema({
    date: {
      type: Number,
      required: true,
    },
    participants: {
      type: Array,
      of: botUser,
    }
  })
});

module.exports = model('Trainings', trainings);
