const {Router} = require('express');
const users = require('./svl/users');
const schedule = require('./svl/schedule');

const router = Router();

router.use(users);
router.use(schedule);


module.exports = router;
