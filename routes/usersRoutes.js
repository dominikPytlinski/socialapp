const express = require('express');
const router = express.Router();

//Middleware
const { addUser, getAllUsers, getSingleUser, updateUser, deleteUser } = require('../middleware/user');
const { isAuth } = require('../middleware/auth');

router.get('/', isAuth(), getAllUsers);
router.post('/', addUser);
router.get('/:id', getSingleUser);
router.put('/:id', updateUser);
router.delete('/:id', deleteUser)

module.exports = router;