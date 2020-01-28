//Models
const rolesModel = require('../models/Role');

//Helpers
const { returnErrors, setErrors } = require('../helpers/errors');

exports.addRole = async (req, res, next) => {
    try {
        if(req.role != 'admin') setErrors(401, 'Unauthorized');
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
            returnErrors(error, res);
        }
    }
}

exports.getAllRoles = async (req, res, next) => {
    try {
        console.log('dupa')
        if(req.role != 'admin') setErrors(401, 'Unauthorized');
        const roles = await rolesModel.find({});
        if(roles) res.status(200).json({ 
            data: {roles} 
        });
        else res.status(404).json({ 
            data: 'No results' 
        });
    } catch (error) {
        returnErrors(error, res);
    }
}