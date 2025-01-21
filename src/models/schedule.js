const { Schema, model } = require('mongoose');

const trainingSchema = new Schema({
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

const gameSchema = new Schema({
  _id: String,
  status: {
    type: String,
    required: true,
    enum : ['open','in_progress', 'closed']
  },
  timestamp: {
    type: String,
    required: true,
  },
  arena: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  homeTeam: {
    type: String,
    required: true,
  },
  awayTeam: {
    type: String,
    required: true,
  },
  homeTeamScore: {
    type: Number,
  },
  awayTeamScore: {
    type: Number,
  },
  url: {
    type: String,
    required: true,
  },
  image: {
    type: String,
  },
});

// TODO rename Schedule -> Training
const Schedule = model('Schedule', trainingSchema);
module.exports = { trainingSchema, gameSchema, Schedule };
