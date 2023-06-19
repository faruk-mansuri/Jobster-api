const express = require('express');
const router = express.Router();
const { register, login, updateUser } = require('../controllers/auth');
const authenticateMiddleware = require('../middleware/authentication');
const testUser = require('../middleware/testUser');
const rateLimiter = require('express-rate-limit');

const apiLimiter = rateLimiter({
  windowMS: 15 * 60 * 1000, // it will track request made in 15 minutes
  max: 10, // only 10 request is allowed within the 10-minute window
  message: {
    msg: 'Too many requests from this IP, please try again after 15 minutes',
  },
});

router.post('/register', apiLimiter, register);
router.post('/login', apiLimiter, login);
// router.patch('/updateUser', authenticateMiddleware, updateUser);
router.route('/updateUser').patch(authenticateMiddleware, testUser, updateUser);
module.exports = router;
