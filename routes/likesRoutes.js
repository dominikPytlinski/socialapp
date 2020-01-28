const express = require('express');
const router = express.Router();

//Middleware
const { addLike, deleteLike } = require('../middleware/like');
const { isLogged } = require('../middleware/auth');
 
router.post('/', isLogged, addLike);
router.delete('/:id', isLogged, deleteLike);

module.exports = router;