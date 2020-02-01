const express = require('express');
const router = express.Router();

//Middleware
const { getAllPosts, addPost, deletePost, updatePost, getUserPosts, likePost, unlikePost, addComment, deleteComment, getSinglePost } = require('../middleware/post');
const { isLogged } = require('../middleware/auth');

router.get('/', getAllPosts);
router.get('/:id', isLogged, getSinglePost);
router.post('/', isLogged, addPost);


router.post('/like', isLogged, likePost);
router.post('/unlike', isLogged, unlikePost);
router.post('/comment', isLogged, addComment);
router.put('/:id', isLogged, updatePost);
router.delete('/:id', isLogged, deletePost);
router.delete('/:id/comment/:commentId', isLogged, deleteComment);

module.exports = router;