const express = require('express');
const router = express.Router();

//Middleware
const { addUser, getAllUsers, getSingleUser, updateUser, deleteUser } = require('../middleware/user');
const { isLogged } = require('../middleware/auth');

router.get('/', isLogged, getAllUsers);
router.post('/', addUser);
router.get('/:id', getSingleUser);
router.put('/:id', isLogged, updateUser);
router.delete('/:id', isLogged, deleteUser);

module.exports = router;