const express = require('express');
const router = express.Router();

//Middleware
const { getAllPosts, addPost, deletePost, updatePost, getUserPosts, likePost, unlikePost, addComment, deleteComment } = require('../middleware/post');
const { isLogged } = require('../middleware/auth');

router.get('/', getAllPosts);
router.post('/', isLogged, addPost);
router.delete('/:id', isLogged, deletePost);
router.put('/:id', isLogged, updatePost);
router.post('/like', isLogged, likePost);
router.post('/unlike', isLogged, unlikePost);
router.post('/comment', isLogged, addComment);
router.delete('/:id/comment/:commentId', isLogged, deleteComment);

module.exports = router;