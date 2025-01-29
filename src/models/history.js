const { Schema, model } = require('mongoose');
const { userSchema } = require('./botUser');
const { trainingSchema, gameSchema } = require('./schedule');

const trainingsHistorySchema = new Schema({
  ...trainingSchema.obj,
  players: {
    type: [userSchema],
    default: [],
  },
}, { timestamps: true });

const gamesHistorySchema = new Schema({
  ...gameSchema.obj,
  players: {
    type: [userSchema],
    default: []
  },
});

const TrainingsHistory = model('TrainingsHistory', trainingsHistorySchema);
const GamesHistory = model('GamesHistory', gamesHistorySchema);
module.exports = { TrainingsHistory, GamesHistory };
