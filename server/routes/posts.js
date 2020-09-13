const router = require('express').Router(),
  mongoose = require('mongoose'),
  Post = require('../db/models/post');




// ***********************************************//
// Create a post
// ***********************************************//
router.post('/posts/new', async (req, res) => {
  const newPost = await new Post({
    ...req.body,
    author: req.user._id
  });
  try {
    newPost.save();
    res.status(201).json(newPost);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
});

// ***********************************************//
// Get all posts
// ***********************************************//

router.get('/posts', async (req, res) => {
  await Post.find()
    .then(post => {
      res.json(post)
    })
    .catch(error => res.status(400).json(`Error: ${error}`))
});


// ***********************************************//
// Get all posts for a user 
// ***********************************************//

router.get('/posts/user', async (req, res) => {
  await Post.find({ author: req.user._id }).then(post =>
    res.json(post).catch(error => res.status(400).json(`Error: ${error}`))
  )
})

// ***********************************************//
// Get one post
// ***********************************************//

router.get('/posts/:id', async (req, res) => {
  await Post.findById(req.params.id)
    .then(post => res.json(post))
    .catch(error => res.status(400).json(`Error: ${error}`))
})

  // ***********************************************//
// Update a post
// ***********************************************//
router.patch('/posts/:id', async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['title', 'body'];
    const isValidOperation = updates.every((update) =>
      allowedUpdates.includes(update)
    );
    if (!isValidOperation)
      return res.status(400).send({ error: 'Invalid updates!' });
    try {
      const updatedPost = await Posts.findOne({
        _id: req.params.id,
        author: req.user._id
      });
      if (!updatedPost) return res.status(404).json({ error: 'post not found' });
      updates.forEach((update) => (updatedPost[update] = req.body[update]));
      await updatedPost.save();
      res.json(updatedPost);
    } catch (e) {
      res.status(400).json({ error: e.toString() });
    }
  });
  
  // ***********************************************//
  // Delete a post
  // ***********************************************//
  router.delete('/posts/:id', async (req, res) => {
    try {
      const posts = await Post.findOneAndDelete({
        _id: req.params.id,
        author: req.user._id
      });
      if (!post) return res.status(404).json({ error: 'post not found' });
      res.json(post);
    } catch (e) {
      res.status(500).json({ error: e.toString() });
    }
  });
  
  module.exports = router;