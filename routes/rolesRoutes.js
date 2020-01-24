const express = require('express');
const router = express.Router();

//Models
const rolesModel = require('../models/Role');

//Middleware
const { addRole, getAllRoles } = require('../middleware/role');

router.get('/', getAllRoles);

router.post('/', addRole);

module.exports = router;