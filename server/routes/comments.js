const router = require('express').Router(),
mongoose = require('mongoose'),
 Posts = require('../db/models/post');
 Comments = require('../db/models/comment');


  // ***********************************************//
// Create a comment
// ***********************************************//
router.post('/api/comments/:postId/new', async (req, res) => {
    try {
    const comment = new Comments(req.body)
    const savedComment = await comment.save()
    const post = await Posts.findById(req.params.postId)
    post.comments.push(savedComment._id)
    const originalPost = await post.save()
    res.json(originalPost)
} catch (error) {
    res.status(400).json(`Error: ${error}`)
  }
});

 // ***********************************************//
// Get comments for a post 
// ***********************************************//
router.get('/api/:postId/comments', async (req, res) => {
    try {
      const post = (await Posts.findById(req.params.postId)).populate(
        'comments'
      )
      const commentIds = post.comments
      const commentPromises = commentIds.map(_id => {
        return Comments.findOne({ _id })
      })
      const comments = await Promise.all(commentPromises)
      res.json(comments)
    } catch (error) {
      res.status(400).json(`Error: ${error}`)
    }
  })
  
  module.exports = router


  