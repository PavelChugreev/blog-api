const {Router} = require('express');
const {Training} = require('../../models/schedule');

const router = Router();

router.get('/trainings-schedule', async (req, res) => {
  try {
    const trainings = await Training.find();

    res.status(200).json({ trainings });
  } catch (e) {
    console.log(e);
    res.status(e.status || 400).json({ trainings: null, error: { message: e.message } });
  }
});

router.post('/trainings-schedule/add', async (req, res) => {
  try {
    const newTraining = new Training(req.body);
    const savedTraining = await newTraining.save();
    
    res.status(200).json(savedTraining);
  } catch (e) {
    console.log(e);
    res.status(e.status || 400).json({ training: null, error: { message: e.message } });
  }
});

router.delete('/trainings-schedule/:id', async (req, res) => {
  try {
    await TrainingsSchedule.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true });
  } catch (e) {
    console.log(e);
    res.status(e.status || 400).json({ success: false });
  }
});

module.exports = router;
