const express = require('express');
const router = express.Router();

//Middleware
const { 
    getAllPosts,
    addPost,
    deletePost,
    updatePost,
    likePost,
    unlikePost,
    addComment,
    deleteComment,
    getSinglePost,
    updateComment
} = require('../middleware/post');
const { isLogged } = require('../middleware/auth');

router.get('/', getAllPosts);
router.get('/:id', isLogged, getSinglePost);
router.post('/', isLogged, addPost);


router.post('/like', isLogged, likePost);
router.post('/unlike', isLogged, unlikePost);
router.post('/:id/comment', isLogged, addComment);
router.put('/:id', isLogged, updatePost);
router.delete('/:id', isLogged, deletePost);
router.delete('/:id/comment/:commentId', isLogged, deleteComment);
router.put('/:id/comment/:commentId', isLogged, updateComment)

module.exports = router;