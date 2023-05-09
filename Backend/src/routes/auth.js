const router = require('express').Router();
const User = require('../models/User');

const { signUpValidation, signInValidation } = require('./validation');
const bcrypt = require('bcryptjs');

// Sign up
router.post('/signup', async (req, res) => {
    // Validation before creation
    const { error } = signUpValidation(req.body);
    if (error) return res.status(400).send(error.details[0].message);
  
      // Check for unique email
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist) return res.status(400).send('email already exists');

    // Password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // Create new user from request body
  const user = new User({
    name: req.body.name,
    email: req.body.email,
    password: hashedPassword,
  });

  // Try to save otherwise send error

  try {
    await user.save();
    res.send({ user: user._id, email: user.email });
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