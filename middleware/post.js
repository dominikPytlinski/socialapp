//Models
const postModel = require('../models/Post');
const userModel = require('../models/User');

exports.getAllPosts = async (req, res, next) => {
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
        level: 'Success',
        message: 'Posts found',
        data: posts
    });
}

exports.addPost = async (req, res, next) => {
    try {
        const { title, body } = req.body;
        if(!title || !body ) return res.status(400).json({
            level: 'Error',
            message: 'All fields are required'
        });
        const newPost = new postModel({
            title: title,
            body: body,
            creator: req.userId
        });
        let result = await newPost.save();
        result = await result.populate('creator').execPopulate();
        return res.status(201).json({
            level: 'Success',
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
        console.log(error);
        res.status(500).json(error);
    }
}

exports.deletePost = async (req, res, next) => {
    try {
        if(req.role == 'admin') await postModel.findByIdAndDelete(req.params.id)
        else await postModel.findOneAndDelete({
            _id: req.params.id,
            creator: req.userId
        });
        return res.status(200).json({
            level: 'Success',
            message: 'Post delted successfully'
        });
    } catch (error) {
        return res.status(500).json(error);
    }
}