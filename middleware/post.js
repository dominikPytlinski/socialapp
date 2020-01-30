//Models
const postModel = require('../models/Post');
const likeModel = require('../models/Like');
const commentModel = require('../models/Comment');

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
                });
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
            creator: req.userId,
            likeCount: 0,
            comentCount: 0
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
            data: 'Post not found'
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

exports.likePost = async (req, res, next) => {
    try {
        const like = await likeModel.findOne({
            user: req.userId,
            post: req.params.id
        });
        if(like) return res.status(400).json({
            message: 'You have liked this post allready'
        });
        const post = await postModel.findById(req.params.id);
        const newLike = likeModel({
            user: req.userId,
            post: req.params.id 
        });
        const createdLike = await newLike.save();
        await postModel.findByIdAndUpdate(req.params.id, { likeCount: post._doc.likeCount + 1 });
        if(createdLike) return res.status(201).json({
            message: 'Liked'
        });
        else setErrors(500, 'Something went wrong');
    } catch (error) {
        returnErrors(error, res);
    }
}

exports.unlikePost = async (req, res, next) => {
    try {
        const unliked = await likeModel.findOneAndDelete({
            user: req.userId,
            post: req.params.id
        });
        if(unliked) {
            const post = await postModel.findById(req.params.id);
            await postModel.findByIdAndUpdate(req.params.id, { likeCount: post._doc.likeCount - 1 });
            return res.status(200).json({
                message: 'Unliked'
            });
        } else {
            setErrors(500, 'Something went wrong');
        }
    } catch (error) {
        returnErrors(error, res);
    }
}

exports.addComment = async (req, res, next) => {
    try {
        const { body } = req.body
        if(!body) setErrors(400, 'All fields are required');
        const post = await postModel.findById(req.params.id);
        if(!post) return res.status(404).json({
            data: 'Post not found'
        });
        const newComment = commentModel({
            post: req.params.id,
            user: req.userId,
            body: req.body.body
        });
        let createdComment = await newComment.save();
        createdComment = await createdComment.populate('user').execPopulate();
        createdComment = await createdComment.populate('post').execPopulate();
        if(createdComment) {
            await postModel.findByIdAndUpdate(req.params.id, { comentCount: post._doc.comentCount + 1 });
            return res.status(201).json({
                message: 'Comment added',
                data: {
                    ...createdComment._doc,
                    user: {
                        _id: createdComment._doc.user._id,
                        email: createdComment._doc.user.email,
                        nickName: createdComment._doc.user.nickName
                    },
                    post: {
                        ...createdComment._doc.post._doc,
                        comentCount: createdComment._doc.post._doc.comentCount + 1
                    }
                }
            });
        } else {
            setErrors(500, 'Something went wrong');
        }

    } catch (error) {
        if(error.kind == 'ObjectId') return res.status(404).json({
            data: 'Post not found'
        });
        else returnErrors(error, res);
    }
}

exports.deleteComment = async (req, res, next) => {
    try {
        const post = await postModel.findById(req.params.id);
        if(!post) return res.status(404).json({
            data: 'Post not found'
        });
        const deletedComment = await commentModel.findByIdAndDelete(req.params.commentId);
        if(deletedComment) {
            await postModel.findByIdAndUpdate(req.params.id, { commentCount: post._doc.commentCount - 1 });
            return res.status(200).json({
                message: 'Comment deleted successfully'
            });
        } else {
            setErrors(500, 'Something went wrong');
        }
    } catch (error) {
        returnErrors(error, res);
    }
}