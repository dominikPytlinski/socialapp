//Models
const postModel = require('../models/Post');

//Helpers
const { returnErrors, setErrors } = require('../helpers/errors');
 
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
        returnErrors(error, res);
    }
}

exports.getUserPosts = async (req, res, next) => {
    try {
        const posts = [];
        const userPosts = await postModel.find({
            creator: req.params.id
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
        returnErrors(error, res);
    }
}

exports.addPost = async (req, res, next) => {
    try {
        const { title, body } = req.body;
        if(!title || !body ) setErrors(400, 'All fields are required');
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
        returnErrors(error, res);
    }
}

exports.deletePost = async (req, res, next) => {
    try {
        let deletedPost = null;
        if(req.role == 'admin') deletedPost = await postModel.findByIdAndDelete(req.params.id)
        else const post = postModel.findOne({
            ceator: req.userId
        });
        if(post) deletedPost = await postModel.findOneAndDelete({
            _id: req.params.id,
            creator: req.userId
        });
        else setErrors(401, 'Unauthorized');
        if(deletedPost) return res.status(200).json({
                level: 'Success',
                message: 'Post delted successfully'
            });
        else setErrors(500, 'Somenting went wrong');
    } catch (error) {
        returnErrors(error, res);
    }
}

exports.updatePost = async (req, res, next) => {
    try {
        const { title, body } = req.body;
        if(!title || !body) setErrors(400, 'All fields are required');
        const newPost = {
            title,
            body
        }
        let updatedPost = null;
        if(req.role == 'admin') updatedPost = await postModel.findByIdAndUpdate(req.params.id, newPost, { new: true }).populate('creator');
        else const post = await postModel.findOne({
            creator: req.userId
        });
        if(post) updatedPost = await postModel.findOneAndUpdate({
            _id: req.params.id,
            creator: req.userId
        }, 
        newPost, {
            new: true
        })
        .populate('creator');
        if(updatedPost) res.status(200).json({
                message: 'Post updated successfully',
                data: {
                    ...updatedPost._doc,
                    creator: {
                        _id: updatedPost._doc.creator._id,
                        email: updatedPost._doc.creator.email,
                        nickName: updatedPost._doc.creator.nickName
                    }
                }
            });
        else setErrors(500, 'Something went wrong');
    } catch (error) {
        returnErrors(error, res); 
    }
}