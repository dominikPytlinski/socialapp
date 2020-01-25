const express = require('express');
const router = express.Router();

//Models
const userModel = require('../models/User');

//Middleware
const { addUser, getAllUsers, getSingleUser, updateUser } = require('../middleware/user');

router.get('/', getAllUsers);
router.post('/', addUser);
router.get('/:id', getSingleUser);
router.put('/:id', updateUser);

module.exports = router;