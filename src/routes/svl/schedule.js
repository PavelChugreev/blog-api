const {Router} = require('express');
const {Schedule} = require('../../models/schedule');

const router = Router();

router.get('/schedule', async (req, res) => {
  try {
    const schedule = await Schedule.find();

    res.status(200).json({ schedule });
  } catch (e) {
    console.log(e);
    res.status(e.status || 400).json({ schedule: null });
  }
});

router.post('/schedule/add', async (req, res) => {
  try {
    const newScheduleItem = new Schedule(req.body);
    const savedScheduleItem = await newScheduleItem.save();
    
    res.status(200).json(savedScheduleItem);
  } catch (e) {
    console.log(e);
    res.status(e.status || 400).json({ schedule: null });
  }
});

router.delete('/schedule/:id', async (req, res) => {
  try {
    await Schedule.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: true });
  } catch (e) {
    console.log(e);
    res.status(e.status || 400).json({ success: false });
  }
});

module.exports = router;
