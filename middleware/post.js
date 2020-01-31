//Helpers
const { setErrors, returnErrors } = require('../helpers/errors');

//Models
const postModel = require('../models/Post');
const commentModel = require('../models/Comment');

exports.addPost = async (req, res, next) => {
    try {
        const { title, body } = req.body;
        if(!title || !body) setErrors(400, 'All fields are required');
        const newPost = postModel({
            title: title,
            body: body,
            creator: req.userId
        });
        let createdPost = await newPost.save();
        createdPost = await createdPost.populate({
            path: 'creator',
            model: 'User',
            select: 'email nickName'
        }).execPopulate();
        console.log(Object.keys(createdPost._doc.likes).length);
        if(createdPost) return res.status(201).json({
            message: 'Post created successfully',
            data: {
                ...createdPost._doc,
                likes: Object.keys(createdPost._doc.likes).length
            }
        });
        else setErrors(500, 'Something went wrong');
    } catch (error) {
        returnErrors(error, res);
    }
}

exports.deletePost = async (req, res, next) => {
    try {
        const post = await postModel.findById(req.params.id);
        if(!post) return setErrors(404, 'Post not found');
        if(post.creator != req.userId && req.role != 'admin') setErrors(401, 'Unathorized');
        const deletedPost = await postModel.findByIdAndDelete(req.params.id);
        if(deletedPost) return res.status(200).json({
            message: 'Post deleted successfully'
        });
        else setErrors(500, 'Something went wrong');
    } catch (error) {
        returnErrors(error, res);
    }
}

exports.getAllPosts = async (req, res, next) => {
    try {
        const outputPosts = [];
        const posts = await postModel.find({})
            .sort('-createdAt')
            .populate([
            {
                path: 'creator',
                model: 'User',
                select: 'email nickName'
            },
            {
                path: 'comments',
                model: 'Comment',
                populate: {
                    path: 'user',
                    model: 'User',
                    select: 'email nickName'
                }
            }
        ])
        if(posts.length == 0) setErrors(404, 'Posts not found');
        posts.map(async post => {
            outputPosts.push({
                ...post._doc,
                likes: Object.keys(post._doc.likes).length
            });
        });
        return res.status(200).json({
            data: outputPosts
        })
    } catch (error) {
        returnErrors(error, res);
    }
}

exports.updatePost = async (req, res, next) => {
    try {
        const { title, body } = req.body;
        if(!title || !body) setErrors(400, 'All fields are required');
        const post = await postModel.findById(req.params.id);
        if(!post) setErrors(404, 'Post not found');
        if(post.creator != req.userId && req.role != 'admin') setErrors(401, 'Unathorized');
        const newPost = {
            title: title,
            body: body
        }
        const updatedPost = await postModel.findByIdAndUpdate(req.params.id, newPost, { new: true }).populate('creator');
        if(updatedPost) return res.status(200).json({
            ...updatedPost._doc,
            likes: Object.keys(updatedPost._doc.likes).length,
            comments: Object.keys(updatedPost._doc.comments).length,
            creator: {
                email: updatedPost._doc.creator.email,
                nickName: updatedPost._doc.creator.nickName
            }
        });
        else setErrors(500, 'Something went wrong');
    } catch (error) {
        returnErrors(error, res);
    }
}

exports.getUserPosts = async (req, res, next) => {
    try {
        const outputPosts = [];
        const posts = await postModel.find({
            creator: req.params.id
        }).populate('creator');
        if(posts.length == 0) setErrors(404, 'Posts not found');
        posts.map(post => {
            outputPosts.push({
                ...post._doc,
                creator: {
                    email: post._doc.creator.email,
                    nickName: post._doc.creator.nickName
                },
                likes: Object.keys(post._doc.likes).length,
                comments: Object.keys(post._doc.comments).length
            });
        });
        return res.status(200).json({
            data: outputPosts
        })
    } catch (error) {
        returnErrors(error, res);
    }
}

exports.likePost = async (req, res, next) => {
    try {
        const post = await postModel.findById(req.params.id);
        if(!post) setErrors(404, 'Post not found');
        if(post.likes.includes(req.userId)) setErrors(400, 'You have liked this post allready');
        post.likes.push(req.userId);
        const likedPost = await post.save();
        if(likedPost) return res.status(200).json({
            message: 'Liked'
        });
        else setErrors(500, 'Something went wrong');
    } catch (error) {
        returnErrors(error, res);
    }
}

exports.unlikePost = async (req, res, next) => {
    try {
        const post = await postModel.findById(req.params.id);
        if(!post) setErrors(404, 'Post not found');
        post.likes.pull(req.userId);
        const unlikedPost = await post.save();
        if(unlikedPost) return res.status(200).json({
            message: 'Unliked'
        });
        else setErrors(500, 'Something went wrong');
    } catch (error) {
        returnErrors(error, res);
    }
}

exports.addComment = async (req, res, next) => {
    if(!req.body.body) setErrors(400, 'All fields are required');
    const post = await postModel.findById(req.params.id);
    if(!post) setErrors(404, 'Post not found');
    const newComment = commentModel({
        user: req.userId,
        body: req.body.body
    });
    let createdComment = await newComment.save();
    createdComment = await createdComment.populate('user').execPopulate();
    if(createdComment) {
        post.comments.push(createdComment._doc._id);
        const comentedPost = await post.save();
        if(comentedPost) return res.status(200).json({
            data: {
                ...createdComment._doc,
                user: {
                    email: createdComment._doc.user.email,
                    nickName: createdComment._doc.user.nickName
                }
            }
        });
        else setErrors(500, 'Something went wrong');
    } else {
        setErrors(500, 'Something went wrong');
    }
}

exports.deleteComment = async (req, res, next) => {
    try {
        const post = await postModel.findById(req.params.id);
        if(!post) setErrors(404, 'Post not found');
        const deletedComment = await commentModel.findByIdAndDelete(req.params.commentId);
        if(deletedComment) {
            post.comments.pull(req.params.commentId);
            return res.status(200).json({
                message: 'Comment deleted successfully'
            });
        } else {
            setErrors(500, 'Somethin went wrong');
        }
    } catch (error) {
        returnErrors(error, res);
    }
}