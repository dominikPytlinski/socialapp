const express = require('express');
const router = express.Router();

//Models
const userModel = require('../models/User');

//Middleware
const { addUser, getAllUsers } = require('../middleware/user');

router.get('/', getAllUsers);
router.post('/', addUser);

module.exports = router;