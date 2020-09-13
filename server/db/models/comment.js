const mongoose = require('mongoose');
const Post = require('./post')

 
const commentSchema = new mongoose.Schema(
  {
    text: { 
      type: String, 
      required: true, 
      trim: true 
    },
  date: {
    type: Date,
    default: Date.now
  },
  post: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Post'
  },
  author: {
    type: String
  }
},
);

const Comment = mongoose.model('Comment', commentSchema);
module.exports = Comment;