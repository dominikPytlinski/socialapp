const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

//Models
const User = require('../models/User');

exports.loginUser = async (req, res, next) => {
    const user = await User.findOne({
        email: req.body.email
    }).populate('role');
    if(!user) return res.status(400).json({
        level: 'Error',
        message: 'Wrong credentials'
    });
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).json({
        error: 'Wrong credentials'
    });
    const token = jwt.sign({
        userId: user._id,
        role: user.role.role
    }, process.env.JWT_KEY, {
        expiresIn: '1h'
    });
    res.status(200).json({
        data: {
            token: token,
            userId: user._id,
            role: user.role
        }
    })
}