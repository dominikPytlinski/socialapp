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
        const post = await postModel.findById(req.params.id);
        if(!post) return res.status(404).json({
            data: 'No result'
        });
        if(post.creator != req.userId && req.role != 'admin') setErrors(401, 'Unathorized');
        const deltedPost = await postModel.findByIdAndDelete(req.params.id);
        if(deltedPost) return res.status(200).json({
            message: 'Post deleted successfully'
        });
        else setErrors(500, 'Something went wrong');
    } catch (error) {
        returnErrors(error, res);
    }
}

exports.updatePost = async (req, res, next) => {
    try {
        const post = await postModel.findById(req.params.id);
        if(!post) return res.status(404).json({
            data: 'No results'
        });
        if(post.creator != req.userId && req.role != 'admin') setErrors(401, 'Unathorized');
        const { title, body } = req.body;
        if(!title || !body) setErrors(400, 'All fields are required');
        const newPost = {
            title,
            body
        }
        const updatedPost = await postModel.findByIdAndUpdate(req.params.id, newPost, { new: true }).populate('creator');
        if(updatedPost) return res.status(200).json({
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