const express = require('express');
const router = express.Router();

//Models
const userModel = require('../models/User');

//Middleware
const { addUser, getAllUsers, getSingleUser, updateUser, deleteUser } = require('../middleware/user');

router.get('/', getAllUsers);
router.post('/', addUser);
router.get('/:id', getSingleUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser)

module.exports = router;