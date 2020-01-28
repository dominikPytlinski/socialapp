//Models
const likeModel = require('../models/Like');

//Middleware
const { setErrors, returnErrors } = require('../helpers/errors');

exports.addLike = async (req, res, next) => {
    const newLike = likeModel({
        user: req.userId,
        target: req.body.target
    });
    let createdLike = await newLike.save();
    createdLike = await createdLike.populate('user').execPopulate();
    if(createdLike) res.status(201).json({
        message: 'Liked',
        data: {
            ...createdLike._doc,
            user: {
                _id: createdLike._doc.user._id,
                email: createdLike._doc.user.email,
                nickName: createdLike._doc.user.nickName,
                createdAt: createdLike._doc.user.createdAt,
                updatedAt: createdLike._doc.user.updatedAt
            }
        }
    });
    else setErrors(500, 'Something went wrong');
}