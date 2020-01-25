const express = require('express');
const router = express.Router();

//Middleware
const { loginUser } = require('../middleware/login');

router.post('/', loginUser);

module.exports = router;