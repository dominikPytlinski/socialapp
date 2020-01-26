const bcrypt = require('bcryptjs');

//Models
const userModel = require('../models/User');
const roleModel = require('../models/Role');

exports.addUser = async (req, res, next) => {
    try {
        const { email, nickName, password, confirmPassword, roleId } = req.body;
        if(!email || !nickName || !password || !confirmPassword || !roleId) return res.status(400).json({
            level: 'Error',
            message: 'All fields are requested'
        });
        if(password != confirmPassword) return res.status(400).json({
            level: 'Error',
            message: 'Passwords must match'
        });
        const role = await roleModel.findById(roleId);
        if(role.role === 'admin' && req.role != 'admin') return res.status(400).json({
            level: 'Error',
            message: 'One of params has incorrect value'
        })
        const userEmail = await userModel.find({
            email: email
        });
        const userNickName = await userModel.find({
            nickName: nickName
        });
        if(userEmail.length > 0) return res.status(400).json({
            level: 'Error',
            message: 'Email allready exists'
        });
        if(userNickName.length > 0) return res.status(400).json({
            level: 'Error',
            message: 'Nickname allready exists'
        })
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
            level: 'Success',
            message: 'User created successfully',
            data: {
                ...result._doc,
                password: null
            }
        });
    } catch (error) {
        if(error.name === 'ValidationError') {
            return res.status(400).json({
                level: 'Error',
                message: error.message
            });
        } else {
            console.log(error)
            return res.status(500).json(error)
        }
    }
}

exports.getAllUsers = async (req, res, next) => {
    if(req.role != 'admin') return res.status(401).json({
        level: 'Error',
        message: 'Unauthorized'
    });
    try {
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
                level: 'Success',
                message: 'Users found',
                data: users
            })
        } else {
            return res.status(404).json({
                level: 'Error',
                message: 'Not found'
            });
        }
    } catch (error) {
        return res.status(500).json(error);
    }
}

exports.getSingleUser = async (req, res, next) => {
    try {
        const user = await userModel.findById(req.params.id).populate('role');
        if(user) {
            return res.status(200).json({
                level: 'Success',
                message: 'User found',
                data: {
                    ...user._doc,
                    password: null
                }
            })
        } else {
            return res.status(404).json({
                level: 'Error',
                message: 'Not foud'
            });
        }
    } catch (error) {
        if(error.kind === 'ObjectId') {
            return res.status(400).json({
                level: 'Error',
                message: error.message
            });
        } else {
            return res.status(500).json({
                level: 'Error',
                message: error
            });
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
    if(req.role != 'admin' && req.userId != req.params.id) return res.status(401).json({
        level: 'Error',
        message: 'Unauthorized'
    })
    try {
        const deletedUser = await userModel.findByIdAndDelete(req.params.id);
        if(deletedUser) {
            return res.status(200).json({
                level: 'Success',
                message: 'User deleted successfully'
            })
        } else {
            return res.status(404).json({
                level: 'Error',
                message: 'Not found'
            })
        }
    } catch (error) {
        return res.status(500).json({
            level: 'Error',
            message: error
        })
    }
}