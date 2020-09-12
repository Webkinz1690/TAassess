const router = require('express').Router(),
Users = require('../db/models/user')
jwt = require('jsonwebtoken');

// ***********************************************//
// Create a user
// ***********************************************//
router.post('/api/users/', async (req, res) => {
  const user = new Users(req.body);
  try {
    await user.save();
    const token = await user.generateAuthToken();
    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: 'Strict',
      secure: process.env.NODE_ENV !== 'production' ? false : true
    });
    res.status(201).json(user);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
});
    

// ***********************************************//
// Login a user
// ***********************************************//
router.post('/api/users/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await Users.findByCredentials(email, password);
    const token = await user.generateAuthToken();
    res.cookie('jwt', token, {
      httpOnly: true,
      sameSite: 'Strict',
      secure: process.env.NODE_ENV !== 'production' ? false : true
    });
    res.json(user);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
});

module.exports = router;


// ***********************************************//
// Get current user
// ***********************************************//
router.get('/api/users/me', async (req, res) => res.json(req.user));

// ***********************************************//
// Update a user
// ***********************************************//
router.patch('/api/users/me', async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ['name', 'email', 'password', 'username'];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );
  if (!isValidOperation)
    return res.status(400).send({ error: 'invalid updates!' });
  try {
    updates.forEach((update) => (req.user[update] = req.body[update]));
    await req.user.save();
    res.json(req.user);
  } catch (e) {
    res.status(400).json({ error: e.toString() });
  }
});


// ***********************************************//
// Logout a user
// ***********************************************//
router.post('/api/users/logout', async (req, res) => {
    try {
      req.user.tokens = req.user.tokens.filter((token) => {
        return token.token !== req.token;
      });
      await req.user.save();
      res.clearCookie('jwt');
      res.json({ message: 'Logged out' });
    } catch (e) {
      res.status(500).json({ error: e.toString() });
    }
  });
  
  // ***********************************************//
  // Logout all devices
  // ***********************************************//
  router.post('/api/users/logoutAll', async (req, res) => {
    try {
      req.user.tokens = [];
      await req.user.save();
      res.clearCookie('jwt');
      res.json({ message: 'all devices logged out' });
    } catch (e) {
      res.status(500).send();
    }
  });
  
  // ***********************************************//
  // Delete a user
  // ***********************************************//
  router.delete('/api/users/me', async (req, res) => {
    try {
      await req.user.remove();
      res.clearCookie('jwt');
      res.json({ message: 'user deleted' });
    } catch (e) {
      res.status(500).json({ error: e.toString() });
    }
  });
  
  
  module.exports = router;