const { Schema, model } = require('mongoose');
const { trainingSchema } = require('./schedule');
const { userSchema } = require('./botUser');

const trainingsHistorySchema = new Schema({
  ...trainingSchema.obj,
  players: {
    type: Array,
    of: userSchema,
    required: true
  },
}, { timestamps: true });

module.exports = model('TrainingsHistory', trainingsHistorySchema);
