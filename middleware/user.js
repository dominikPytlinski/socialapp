const bcrypt = require('bcryptjs');

//Models
const userModel = require('../models/User');

exports.addUser = async (req, res, next) => {
    try {
        if(req.body.password != req.body.confirmPassword) res.status(400).json({
            level: 'Error',
            message: 'Passwords must match'
        })
        const passwordHashed = await bcrypt.hash(req.body.password, 10)
        const newUser = new userModel({
            email: req.body.email,
            password: passwordHashed,
            nickName: req.body.nickName,
            role: req.body.roleId
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
        const users = [];
        const allUsers = await userModel.find({}).populate('role');
        if(allUsers.length > 0) {
            allUsers.map(user => {
                users.push({
                    ...user._doc,
                    password: null
                })
            })
            res.status(200).json({
                level: 'Success',
                message: 'Users found',
                data: users
            })
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

exports.getSingleUser = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.params.id).populate('role');
        if(user) {
            res.status(200).json({
                level: 'Success',
                message: 'User found',
                data: {
                    ...user._doc,
                    password: null
                }
            })
        } else {
            res.status(404).json({
                level: 'Error',
                message: 'Not foud'
            });
        }
    } catch (error) {
        if(error.kind === 'ObjectId') {
            res.status(400).json({
                level: 'Error',
                message: error.message
            });
        } else {
            res.status(500).json({
                level: 'Error',
                message: error
            });
        }
    }
}

exports.updateUser = async (req, res, next) => {
    try {
        if(req.body.password != req.body.confirmPassword) res.status(400).json({
            level: 'Error',
            message: 'Passwords must match'
        })
        const passwordHashed = await bcrypt.hash(req.body.password, 10);
        const user = {
            email: req.body.email,
            password: passwordHashed,
            nickName: req.body.nickName,
            roleId: req.body.roleId
        };
        const updatedUser = await userModel.findByIdAndUpdate(req.params.id, user, { new: true }).populate('role');
        console.log(updatedUser)
        if(updatedUser) {
            res.status(200).json({
                level: 'Success',
                message: 'User updated successfully',
                data: {
                    ...updatedUser._doc,
                    password: null
                }
            })
        }
    } catch (error) {
        console.log(error)
        res.status(500).json({
            level: 'Error',
            message: error
        })
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        const deletedUser = await userModel.findByIdAndDelete(req.params.id);
        if(deletedUser) {
            res.status(200).json({
                level: 'Success',
                message: 'User deleted successfully'
            })
        } else {
            res.status(404).json({
                level: 'Error',
                message: 'Not found'
            })
        }
    } catch (error) {
        res.status(500).json({
            level: 'Error',
            message: error
        })
    }
}