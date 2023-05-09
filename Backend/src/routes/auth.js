const router = require('express').Router();
const User = require('../models/User');

// Sign up
router.post('/signup', async (req, res) => {
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: req.body.password,
  });

  try {
    const savedUser = await user.save();
    res.send(savedUser);
  } catch (err) {
    res.status(400).send(err);
  }
});

// Sign in
router.post('/signin', (req, res) => {
  res.send('Sign in');
});

// Sign out

// Users listing
router.get('/', async (req, res) => {
  try {
    const users = await User.find({});
    const userMap = {};
    users.forEach(function (user) {
      userMap[user._id] = user;
    });
    res.send(userMap);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Server Error' });
  }
});


module.exports = router;