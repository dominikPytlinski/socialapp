const express = require('express');
const router = express.Router();

//Middleware
const { getAllPosts, addPost, deletePost, updatePost, getUserPosts } = require('../middleware/post');
const { isLogged } = require('../middleware/auth');

router.get('/', getAllPosts);
router.get('/user/:id?', isLogged, getUserPosts);
router.post('/', isLogged, addPost);
router.delete('/:id', isLogged, deletePost);
router.put('/:id', isLogged, updatePost);

module.exports = router;