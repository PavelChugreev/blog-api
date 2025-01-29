const {Router} = require('express');
const { BotUser } = require('../../models/botUser');
const { TrainingsHistory } = require('../../models/history');

const router = Router();

// get training history
router.get('/trainings-history', async (req, res) => {
  try {
    const trainings = await TrainingsHistory.find();
    res.status(200).json({ trainings });
  } catch (e) {
    console.log(e);
    res.status(e.status || 400).json({ trainings: null, error: { message: e.message } });
  }
});

// get training by id
router.get('/trainings-history/:trainingId', async (req, res) => {
  try {
    const { trainingId } = req.params;

    const training = await TrainingsHistory.findById(trainingId);
    if (!training) {
      throw new Error('Тренировка не найдена');
    }
    
    res.status(200).json(training);
  } catch (e) {
    console.log(e);
    res.status(e.status || 400).json({ training: null, error: { message: e.message } });
  }
});

// add training to history
router.post('/trainings-history/add', async (req, res) => {
  try {
    const newTraining = new TrainingsHistory(req.body);
    const savedTraining = await newTraining.save();
    
    res.status(200).json(savedTraining);
  } catch (e) {
    console.log(e);
    res.status(e.status || 400).json({ training: null, error: { message: e.message } });
  }
});

// delete training from history
router.delete('/trainings-history/:id', async (req, res) => {
  try {
    await TrainingsHistory.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true });
  } catch (e) {
    console.log(e);
    res.status(e.status || 400).json({ success: false, error: { message: e.message } });
  }
});

// add player to training
router.get('/trainings-history/:trainingId/add-player/:playerId', async (req, res) => {
  try {
    const { trainingId, playerId } = req.params;

    const training = await TrainingsHistory.findById(trainingId);
    if (!training) {
      throw new Error('Тренировка не найдена');
    }

    const existingPlayer = training.players.find(player => player._id === playerId);
    if (existingPlayer) {
      throw new Error('Пользователь уже записан на тренировку');
    }

    const user = await BotUser.findById(playerId);
    if (!user) {
      throw new Error('Пользователь не найден');
    }

    // const updatedTraining = await TrainingsHistory.findByIdAndUpdate(
    //   id,
    //   { $push: { players: user } },
    //   { new: true } // Возвращаем обновленный документ
    // );

    training.players.push(user);
    await training.save();

    res.status(200).json({ success: true });
  } catch (e) {
    res.status(e.status || 400).json({ success: false, error: { message: e.message } });
  }
});

// delete players from training
router.delete('/trainings-history/:id/delete-player/:playerId', async (req, res) => {
  try {
    const { id: trainingId, playerId } = req.params;
    const training = await TrainingsHistory.findById(trainingId);
    if (!training) {
      throw new Error('Тренировка не найдена');
    }

    // Удаляем игрока
    // const updatedTraining = await TrainingsHistory.findByIdAndUpdate(
    //   id,
    //   { $pull: { players: { _id: playerId } } },
    //   { new: true } // Возвращаем обновленный документ
    // );

    const existingPlayerIndex = training.players.findIndex(player => player._id === playerId);
    if (existingPlayerIndex === -1) {
      throw new Error('Пользователь не записан на тренировку');
    }

    const updatedPlayers = training.players.reduce((acc, curr, i) => {
      if (i !== existingPlayerIndex) {
        acc.push(curr);
      }
      return acc;
    }, []);

    training.players = updatedPlayers;
    await training.save();

    res.status(200).json({ success: true });
  } catch (e) {
    console.log(e);
    res.status(e.status || 400).json({ success: false, error: { message: e.message } });
  }
})

module.exports = router;
