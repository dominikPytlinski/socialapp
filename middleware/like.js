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
    if(createdLike) return res.status(201).json({
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

exports.deleteLike = async (req, res, next) => {
    const like = await likeModel.findById(req.params.id);
    console.log(like)
    console.log(req.userId)
    if(!like) return res.status(400).json({
        data: 'No results'
    })
    if(like.user != req.userId && req.role != 'admin') setErrors(401, 'Unauthorized');
    const deletedLike = await likeModel.findByIdAndDelete(req.params.id);
    if(deletedLike) return res.status(200).json({
        message: 'Unliked'
    });
    else setErrors(500, 'Something went wrong');
}