const {Router} = require('express');
const BotUser = require('../models/botUser');

const router = Router();


router.get('/users', async (req, res) => {
  try {
    const users = await BotUser.find();
    res.status(200).json({ users });
  } catch (e) {
    console.log(e);
    res.status(e.status || 400).json({ users: [] });
  }
});

router.get('/users/:id', async (req, res) => {
  try {
    const user = await BotUser.findById(req.params.id);
    res.status(200).json({ user });
  } catch (e) {
    console.log(e);
    res.status(e.status || 400).json({ user: null });
  }
});

router.post('/register', async (req, res) => {
  try {
    const { id, ...rest } = req.body;
    const newUser = new BotUser({ _id: id, ...rest });

    const user = await newUser.save();

    res.status(200).json({ user });
  } catch (e) {
    console.log(e);
    res.status(e.status || 400).json({ user: null });
  }
});

router.patch(`/edit/:id`, async (req, res) => {
  try {
    const user = await BotUser.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ user });
  } catch (e) {
    console.log(e);
    res.status(e.status || 400).json({ user: null });
  }
});

router.delete(`/delete/:id`, async (req, res) => {
  try {
    await BotUser.findOneAndDelete(req.params.id);
    res.status(200).json({ success: 'true' });
  } catch (e) {
    console.log(e);
    res.status(e.status || 400).json({ success: 'false' });
  }
});

module.exports = router;
