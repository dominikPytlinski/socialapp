const express = require('express');
const router = express.Router();

//Middleware
const { getAllPosts, addPost, deletePost, updatePost, getUserPosts, likePost, unlikePost, addComment, deleteComment } = require('../middleware/post');
const { isLogged } = require('../middleware/auth');

router.get('/', getAllPosts);
// router.get('/user/:id', isLogged, getUserPosts);
router.post('/', isLogged, addPost);
router.delete('/:id', isLogged, deletePost);
router.put('/:id', isLogged, updatePost);
// router.post('/:id/like', isLogged, likePost);
// router.post('/:id/unlike', isLogged, unlikePost);
// router.post('/:id', isLogged, addComment);
// router.delete('/:id/comment/:commentId', isLogged, deleteComment);

module.exports = router;