const {Router} = require('express');
const users = require('./svl/users');
const schedule = require('./svl/schedule');
const trainingsHistory = require('./svl/trainingsHistory');

const router = Router();

router.use(users);
router.use(schedule);
router.use(trainingsHistory);


module.exports = router;
