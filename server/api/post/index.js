'use strict';

var express = require('express');
var controller = require('./post.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/:offset',auth.isAuthenticated(), controller.index); //Posts are returned skipping the first 'offset' number of posts
router.get('/:offset/:id', controller.showOne); //A single post is viewed
router.post('/',auth.isAuthenticated(),controller.create);  //A new post is created
router.post('/likedislike',auth.isAuthenticated() ,controller.handleLikesDislikes); //Function to handle the like or dislike functionality
router.put('/:id', controller.update);
router.patch('/:id', controller.update);
router.delete('/:id', controller.destroy);

module.exports = router;
