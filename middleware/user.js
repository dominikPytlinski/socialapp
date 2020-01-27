const bcrypt = require('bcryptjs');

//Models
const userModel = require('../models/User');
const roleModel = require('../models/Role');

//Helpers
const { setErrors } = require('../helpers/setErrors');

exports.addUser = async (req, res, next) => {
    try {
        const { email, nickName, password, confirmPassword, roleId } = req.body;
        if(!email || !nickName || !password || !confirmPassword || !roleId) {
            const e = new Error('All fields are required');
            e.name = 'CustomError';
            e.kind = 400;
            throw e;
        }
        if(password != confirmPassword) {
            const e = new Error('Passwords must match');
            e.name = 'CustomError';
            e.kind = 400;
            throw e;
        }
        const role = await roleModel.findById(roleId);
        if(role.role === 'admin' && req.role != 'admin') {
            const e = new Error('One of the params has incorrect value');
            e.name = 'CustomError';
            e.kind = 400;
            throw e;
        }
        const userEmail = await userModel.find({
            email: email
        });
        if(userEmail.length > 0) {
            const e = new Error('Email allresdy exists');
            e.name = 'CustomError';
            e.kind = 400;
            throw e;
        }
        const userNickName = await userModel.find({
            nickName: nickName
        });
        if(userNickName.length > 0) {
            const e = new Error('Nickname allready exists');
            e.name = 'CustomError';
            e.kind = 400;
            throw e;
        }
        const passwordHashed = await bcrypt.hash(password, 10)
        const newUser = new userModel({
            email: email,
            password: passwordHashed,
            nickName: nickName,
            role: roleId
        });
        let result = await newUser.save();
        result = await result.populate('role').execPopulate();
        return res.status(201).json({
            message: 'User created successfully',
            data: {
                _id: result._doc._id,
                email: result._doc.email,
                nickName: result._doc.nickName,
                role: result._doc.role,
                createdAt: result._doc.createdAt,
                updatedAt: result._doc.updatedAt
            }
        });
    } catch (error) {
        if(error.name === 'ValidationError') {
            return res.status(400).json({
                level: 'Error',
                message: error.message
            });
        } else {
            setErrors(error, res);
        }
    }
}

exports.getAllUsers = async (req, res, next) => {
    try {
        if(req.role != 'admin') {
            const e = new Error('Unauthorized');
            e.name = 'CustomError';
            e.kind = 401;
            throw e;
        }
        const users = [];
        const allUsers = await userModel.find({}).populate('role');
        if(allUsers.length > 0) {
            allUsers.map(user => {
                users.push({
                    _id: user._doc._id,
                    email: user._doc.email,
                    nickName: user._doc.nickName,
                    role: user._doc.role
                });
            });
            return res.status(200).json({
                data: users
            })
        } else {
            return res.status(404).json({
                data: 'No results'
            });
        }
    } catch (error) {
        setErrors(error, res);
    }
}

exports.getSingleUser = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.params.id).populate('role');
        if(user) {
            return res.status(200).json({
                data: {
                    _id: user._doc._id,
                    email: user._doc.email,
                    nickName: user._doc.nickName,
                    role: user._doc.role,
                    createdAt: user._doc.createdAt,
                    updatedAt: user._doc.updatedAt
                }
            });
        } else {
            return res.status(404).json({
                data: 'No result'
            });
        }
    } catch (error) {
        if(error.kind === 'ObjectId') {
            return res.status(400).json({
                level: 'Error',
                message: error.message
            });
        } else {
            setErrors(error, res);
        }
    }
}

exports.updateUser = async (req, res, next) => {
    if(req.role != 'admin' && req.userId != req.params.id) return res.status(401).json({
        level: 'Error',
        message: 'Unauthorized'
    })
    /**
     * TO DO
     * 
     * validation, permisssion
     */
    try {
        const { email, nickName, password, confirmPassword, roleId } = req.body;
        if(password != confirmPassword) return res.status(400).json({
            level: 'Error',
            message: 'Passwords must match'
        })
        const passwordHashed = await bcrypt.hash(password, 10);
        const user = {
            email: email,
            password: passwordHashed,
            nickName: nickName,
            roleId: roleId
        };
        const updatedUser = await userModel.findByIdAndUpdate(req.params.id, user, { new: true }).populate('role');
        console.log(updatedUser)
        if(updatedUser) {
            return res.status(200).json({
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
        return res.status(500).json({
            level: 'Error',
            message: error
        })
    }
}

exports.deleteUser = async (req, res, next) => {
    try {
        if(req.role != 'admin' && req.userId != req.params.id) {
            const e = new Error('Unauthorized');
            e.name = 'CustomError',
            e.kind = 401;
            throw e;
        }
        const deletedUser = await userModel.findByIdAndDelete(req.params.id);
        if(deletedUser) {
            return res.status(200).json({
                message: 'User deleted successfully'
            })
        } else {
            const e = new Error('Bad request');
            e.name = 'CustomError',
            e.kind = 400;
            throw e;
        }
    } catch (error) {
        setErrors(error, res);
    }
}