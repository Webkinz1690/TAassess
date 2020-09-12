require('./db/config');
const express = require('express'),
path = require('path'),
passport = require('./middleware/authentication'),
cookieParser = require('cookie-parser'),
userRouter = require('./routes/users'),
postRouter = require('./routes/posts'),
commentRouter = require('./routes/comments')
 app = express();
  cors = require('cors');


// Parse incoming JSON into objects
app.use(express.json());
app.use(cors());

// routes
app.use(userRouter);
app.use(postRouter);
app.use(commentRouter);
app.use(cookieParser());

//
if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, '../client/build')));
}

app.use(
  passport.authenticate('jwt', {
    session: false
  })
);




if (process.env.NODE_ENV === 'production') {
  // Handle React routing, return all requests to React app
  app.get('*', (request, response) => {
    response.sendFile(path.join(__dirname, '../client/build', 'index.html'));
  });
}

module.exports = app;