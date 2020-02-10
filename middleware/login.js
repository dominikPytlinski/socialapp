const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { returnErrors, setErrors } = require('../helpers/errors');

//Models
const User = require('../models/User');

exports.loginUser = async (req, res, next) => {
    try {
        const user = await User.findOne({
            email: req.body.email
        }).populate('role');
        if(!user) setErrors(400, 'Wrong credentials');
        const validPassword = await bcrypt.compare(req.body.password, user.password);
        if(!validPassword) setErrors(400, 'Wrong credentials');
        const token = jwt.sign({
            userId: user._id,
            role: user.role.role
        }, process.env.JWT_KEY, {
            expiresIn: '1h'
        });
        res.status(200).json({
            data: {
                token: token,
                user: {
                    image: user._doc.image,
                    _id: user._doc._id,
                    email: user._doc.email,
                    nickName: user._doc.nickName,
                    createdAt: user._doc.createdAt,
                    updatedAt: user._doc.updatedAt,
                    role: user._doc.role
                }
            }
        })
    } catch (error) {
        returnErrors(error, res);
    }
}