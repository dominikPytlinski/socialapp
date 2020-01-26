const express = require('express');
const router = express.Router();

//Middleware
const { getAllPosts, addPost, deletePost } = require('../middleware/post');
const { isLogged } = require('../middleware/auth');

router.get('/', getAllPosts);
router.post('/', isLogged, addPost);
router.delete('/:id', isLogged, deletePost);

module.exports = router;