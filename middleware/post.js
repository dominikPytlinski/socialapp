//Models
const postModel = require('../models/Post');

//Helpers
const { setErrors } = require('../helpers/setErrors');
 
exports.getAllPosts = async (req, res, next) => {
    try {
        const posts = [];
        const allPosts = await postModel.find({}).populate('creator');
        allPosts.map((post) => {
            posts.push({
                ...post._doc,
                creator: {
                    _id: post._doc.creator._id,
                    email: post._doc.creator.email,
                    nickName: post._doc.creator.nickName
                }
            })
        })
        return res.status(200).json({
            data: posts
        });
    } catch (error) {
        setErrors(error, res);
    }
}

exports.getUserPosts = async (req, res, next) => {
    try {
        const requestedUserId = (req.role == 'admin' && req.params.id) ? req.params.id : req.userId;
        const posts = [];
        const userPosts = await postModel.find({
            creator: requestedUserId
        }).populate('creator');
        if(userPosts.length > 0) {
            userPosts.map(post => {
                posts.push({
                    ...post._doc,
                    creator: {
                        _id: post._doc.creator._id,
                        email: post._doc.creator.email,
                        nickName: post._doc.creator.nickName
                    }
                })
            });
            return res.status(200).json({
                data: posts
            });
        } else {
            return res.status(404).json({
                data: 'No results'
            });
        }
    } catch (error) {
        setErrors(error, res);
    }
}

exports.addPost = async (req, res, next) => {
    try {
        const { title, body } = req.body;
        if(!title || !body ) {
            const e = new Error('All fields are required');
            e.name = 'CustomError',
            e.code = 400;
            throw e;
        }
        const newPost = new postModel({
            title: title,
            body: body,
            creator: req.userId
        });
        let result = await newPost.save();
        result = await result.populate('creator').execPopulate();
        return res.status(201).json({
            message: 'Post created successfully',
            data: {
                ...result._doc,
                creator: {
                    _id: result._doc.creator._id,
                    email: result._doc.creator.email,
                    nickName: result._doc.creator.nickName
                }
            }
        });
    } catch (error) {
        setErrors(error, res);
    }
}

exports.deletePost = async (req, res, next) => {
    try {
        let deletedPost = null;
        if(req.role == 'admin') deletedPost = await postModel.findByIdAndDelete(req.params.id)
        else deletedPost = await postModel.findOneAndDelete({
            _id: req.params.id,
            creator: req.userId
        });
        if(deletedPost) {
            return res.status(200).json({
                level: 'Success',
                message: 'Post delted successfully'
            });
        } else {
            const e = new Error('Something went wrong');
            e.name = 'CustomError',
            e.code = 500;
            throw e;
        }
    } catch (error) {
        setErrors(error, res);
    }
}

exports.updatePost = async (req, res, next) => {
    try {
        const { title, body } = req.body;
        if(!title || !body) {
            const e = new Error('All fields are required');
            e.name = 'CustomError',
            e.code = 400;
            throw e;
        }
        const post = {
            title,
            body
        }
        let updatedPost = null;
        if(req.role == 'admin') updatedPost = await postModel.findByIdAndUpdate(req.params.id, post, { new: true }).populate('creator');
        else updatedPost = await postModel.findOneAndUpdate({
            _id: req.params.id,
            creator: req.userId
        }, {
            new: true
        }).populate('creator');
        if(updatedPost) {
            res.status(200).json({
                message: 'Post updated successfully',
                data: {
                    ...updatedPost._doc,
                    creator: {
                        _id: updatedPost._doc.creator._id,
                        email: updatedPost._doc.creator.email,
                        nickName: updatedPost._doc.creator.nickName
                    }
                }
            })
        } else {
            const e = new Error('Something went wrong');
            e.name = 'CustomError';
            e.code = 500;
            throw e;
        }
    } catch (error) {
        setErrors(error, res); 
    }
}