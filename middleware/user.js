const bcrypt = require('bcryptjs');

//Models
const userModel = require('../models/User');

exports.addUser = async (req, res, next) => {
    try {
        const passwordHashed = await bcrypt.hash(req.body.password, 10)
        const newUser = new userModel({
            email: req.body.email,
            password: passwordHashed,
            nickName: req.body.nickName,
            roleId: req.body.roleId
        });

        const result = await newUser.save();

        res.status(201).json({
            level: 'Success',
            message: 'User created successfully',
            data: {
                ...result._doc,
                password: null
            }
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

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await userModel.find({});
        if(users) {
            res.status(200).json({
                level: 'Success',
                data: users
            });
        } else {
            res.status(404).json({
                level: 'Error',
                message: 'Not found'
            });
        }
    } catch (error) {
        res.status(500).json(error);
    }
}