const express = require('express');
const { getUser } = require('../controllers/userController');
const router = express.Router();
const auth = require('../middleware/authMiddleware');

router.get('/user/:id', auth, getUser);

module.exports = router;
