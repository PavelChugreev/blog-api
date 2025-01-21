const { Schema, model } = require('mongoose');
const { userSchema } = require('./botUser');
const { trainingSchema, gameSchema } = require('./schedule');

const trainingsHistorySchema = new Schema({
  ...trainingSchema.obj,
  players: userSchema,
}, { timestamps: true });

const gamesHistorySchema = new Schema({
  ...gameSchema.obj,
  players: userSchema,
});

const TrainingsHistory = model('TrainingsHistory', trainingsHistorySchema);
const GamesHistory = model('GamesHistory', gamesHistorySchema);
module.exports = { TrainingsHistory, GamesHistory };
