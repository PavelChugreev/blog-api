const { Schema, model } = require('mongoose');

const scheduleSchema = new Schema({
  day: {
    type: String,
    required: true,
  },
  dayOrder: {
    type: Number,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  place: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  }
});

module.exports = model('Schedule', scheduleSchema);
