const {Router} = require('express');
const { BotUser } = require('../../models/botUser');
const { GamesHistory } = require('../../models/history');

const router = Router();

// get game history
router.get('/games-history', async (req, res) => {
  try {
    const games = await GamesHistory.find();
    res.status(200).json({ games });
  } catch (e) {
    console.log(e);
    res.status(e.status || 400).json({ games: null });
  }
});

// get game by id
router.get('/games-history/:gameId', async (req, res) => {
  try {
    const { gameId } = req.params;

    const game = await GamesHistory.findById(gameId);
    if (!game) {
      throw new Error('Игра не найдена');
    }
    
    res.status(200).json({ game });
  } catch (e) {
    console.log(e);
    res.status(e.status || 400).json({ game: null, error: { message: e.message } });
  }
});

// update game
router.patch('/games-history/:gameId', async (req, res) => {
  try {
    const game = await GamesHistory.findByIdAndUpdate(req.params.gameId, req.body, {
      returnDocument: 'after'
    });
    res.status(200).json({ game });
  } catch (e) {
    console.log(e);
    res.status(e.status || 400).json({ game: null, error: { message: e.message } });
  }
});

// add game to history
router.post('/games-history/add', async (req, res) => {
  try {
    const newGame = new GamesHistory(req.body);
    const savedGame = await newGame.save();
    
    res.status(200).json(savedGame);
  } catch (e) {
    console.log(e);
    res.status(e.status || 400).json({ game: null, error: { message: e.message } });
  }
});

// delete game from history
router.delete('/games-history/:id', async (req, res) => {
  try {
    await GamesHistory.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true });
  } catch (e) {
    console.log(e);
    res.status(e.status || 400).json({ success: false });
  }
});

// add player to game
router.get('/games-history/:trainingId/add-player/:playerId', async (req, res) => {
  try {
    const { gameId, playerId } = req.params;

    const game = await GamesHistory.findById(gameId);
    if (!game) {
      throw new Error('Игра не найдена');
    }

    const existingPlayer = game.players.find(player => player._id === playerId);
    if (existingPlayer) {
      throw new Error('Пользователь уже записан на игру');
    }

    const user = await BotUser.findById(playerId);
    if (!user) {
      throw new Error('Пользователь не найден');
    }

    // const updatedTraining = await GamesHistory.findByIdAndUpdate(
    //   id,
    //   { $push: { players: user } },
    //   { new: true } // Возвращаем обновленный документ
    // );

    game.players.push(user);
    await game.save();

    res.status(200).json({ success: true });
  } catch (e) {
    res.status(e.status || 400).json({ success: false, error: { message: e.message } });
  }
});

// delete players from game
router.delete('/games-history/:id/delete-player/:playerId', async (req, res) => {
  try {
    const { id: gameId, playerId } = req.params;
    const game = await GamesHistory.findById(gameId);
    if (!game) {
      throw new Error('Игра не найдена');
    }

    // Удаляем игрока
    // const updatedTraining = await GamesHistory.findByIdAndUpdate(
    //   id,
    //   { $pull: { players: { _id: playerId } } },
    //   { new: true } // Возвращаем обновленный документ
    // );

    const existingPlayerIndex = game.players.findIndex(player => player._id === playerId);
    if (existingPlayerIndex === -1) {
      throw new Error('Пользователь не записан на игру');
    }

    const updatedPlayers = game.players.reduce((acc, curr, i) => {
      if (i !== existingPlayerIndex) {
        acc.push(curr);
      }
      return acc;
    }, []);

    game.players = updatedPlayers;
    await game.save();

    res.status(200).json({ success: true });
  } catch (e) {
    console.log(e);
    res.status(e.status || 400).json({ success: false, error: { message: e.message } });
  }
})

module.exports = router;
