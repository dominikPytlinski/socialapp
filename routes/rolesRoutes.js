const express = require('express');
const router = express.Router();

//Middleware
const { addRole, getAllRoles } = require('../middleware/role');
const { isLogged } = require('../middleware/auth');

router.get('/', isLogged, getAllRoles);
router.post('/', isLogged, addRole);

module.exports = router;