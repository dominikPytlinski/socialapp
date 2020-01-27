//Models
const rolesModel = require('../models/Role');

//Helpers
const { setErrors } = require('../helpers/setErrors');

exports.addRole = async (req, res, next) => {
    try {
        if(req.role != 'admin') {
            const e = new Error('Unauthorized');
            e.name = 'CustomError',
            e.code = 401;
            throw e;
        }
        const newRole = new rolesModel({
            role: req.body.role
        });
        const result = await newRole.save();
        return res.status(201).json({
            message: 'Role created successfully',
            data: result
        });
    } catch (error) {
        if(error.name === 'ValidationError') {
            res.status(400).json({
                error: error.message
            });
        } else {
            setErrors(error, res);
        }
    }
}

exports.getAllRoles = async (req, res, next) => {
    try {
        if(req.role != 'admin') {
            const e = new Error('Unauthorized');
            e.name = 'CustomError';
            e.code = 401;
            throw e;
        }
        const roles = await rolesModel.find({});
        if(roles) {
            res.status(200).json({
                data: {roles}
            });
        } else {
            res.status(404).json({
                data: 'No results'
            })
        }
    } catch (error) {
        setErrors(error, res);
    }
}