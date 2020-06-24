const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const User = require('../models/user');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const auth = require('../middleware/auth');

// @route   POST /api/auth
// @desc    Login a user and get token
// @access  Public
router.post(
  '/',
  [
    check('email', 'Invalid Email').isEmail(),
    check('password', 'Invalid Password').notEmpty(),
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ msg: 'Invalid Credentials' });
      }

      const isSame = await bcrypt.compare(password, user.password);
      if (!isSame) {
        return res.status(400).json({ error: 'Invalid Credentials' });
      }

      const payload = {
        user: { id: user.id },
      };

      jwt.sign(
        payload,
        process.env.JWT_SECRET_KEY,
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err;
          return res.status(200).json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      return res.status(500).json({ msg: 'Server Error' });
    }
  }
);

// @route   GET /api/auth
// @desc    Get a user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');
    return res.status(200).json(user);
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({ msg: 'Server Error' });
  }
});

module.exports = router;
