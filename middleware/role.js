const rolesModel = require('../models/Role');

exports.addRole = async (req, res, next) => {
    try {
        const newRole = new rolesModel({
            role: req.body.role
        });
        const result = await newRole.save();
        res.status(201).json({
            level: 'Success',
            message: 'Role created successfully',
            data: {result}
        });
    } catch (error) {
        if(error.name === 'ValidationError') {
            res.status(400).json({
                level: 'Error',
                message: error.message
            });
        } else {
            console.log(error)
            res.status(500).json(error)
        }
    }
}

exports.getAllRoles = async (req, res, next) => {
    const roles = await rolesModel.find({});
    if(roles) {
        res.status(200).json({
            level: 'Success',
            data: {roles}
        });
    } else {
        res.status(404).json({
            level: 'Error',
            message: 'Not found'
        })
    }
}