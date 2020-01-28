const express = require('express');
const router = express.Router();

//Middleware
const { addLike } = require('../middleware/like');
const { isLogged } = require('../middleware/auth');
 
router.post('/', isLogged, addLike);

module.exports = router;