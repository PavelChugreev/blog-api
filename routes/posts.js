const {Router} = require('express');
const Post = require('../models/post');

const router = Router();


router.get('/', async (req, res) => {
  try {
    const posts = await Post.find();
    res.status(200).json({ posts });
  } catch (e) {
    console.log(e);
    res.status(e.status || 400).json({ posts: [] });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json({ post });
  } catch (e) {
    console.log(e);
    res.status(e.status || 400).json({ post: null });
  }
});

router.post('/create', async (req, res) => {
  try {
    const { title, author, content } = req.body;
    const post = new Post({ title, author, content });

    await post.save();

    res.status(200).json({ success: 'true' });
  } catch (e) {
    console.log(e);
    res.status(e.status || 400).json({ success: 'false' });
  }
});

router.patch(`/edit/:id`, async (req, res) => {
  try {
    await Post.findByIdAndUpdate(req.params.id, req.body);
    res.status(200).json({ success: 'true' });
  } catch (e) {
    console.log(e);
    res.status(e.status || 400).json({ success: 'false' });
  }
});

router.delete(`/delete/:id`, async (req, res) => {
  try {
    await Post.findByIdAndDelete(req.params.id);
    res.status(200).json({ success: 'true' });
  } catch (e) {
    console.log(e);
    res.status(e.status || 400).json({ success: 'false' });
  }
});

module.exports = router;
