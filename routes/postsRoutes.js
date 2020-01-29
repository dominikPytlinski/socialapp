const express = require('express');
const router = express.Router();

//Middleware
const { getAllPosts, addPost, deletePost, updatePost, getUserPosts, likePost, unlikePost } = require('../middleware/post');
const { isLogged } = require('../middleware/auth');

router.get('/', getAllPosts);
router.get('/user/:id?', isLogged, getUserPosts);
router.post('/', isLogged, addPost);
router.delete('/:id', isLogged, deletePost);
router.put('/:id', isLogged, updatePost);
router.post('/like', isLogged, likePost);
router.post('/unlike', isLogged, unlikePost);

module.exports = router;