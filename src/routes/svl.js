const {Router} = require('express');
const users = require('./svl/users');
const trainingsSchedule = require('./svl/trainingsSchedule');
const trainingsHistory = require('./svl/trainingsHistory');
const gamesHistory = require('./svl/gamesHistory');
const screenshot = require('./svl/screenshot');

const router = Router();

router.use(users);
router.use(trainingsSchedule);
router.use(trainingsHistory);
router.use(gamesHistory);
router.use(screenshot);


module.exports = router;
