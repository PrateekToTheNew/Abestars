'use strict';

var _ = require('lodash');
var Post = require('./post.model');
var PostService = require('./post.service.js');


// Get list of posts
exports.index = function (req, res) {
  //console.log("req.query----",req.query);
  var offset=req.params.offset;
  var query=req.query;

  Post.find(query).sort({'dateCreated': -1}).skip(offset).limit(8).exec(function (err, posts) {
    //console.log("Length----",posts.length);
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json(posts);
  });
};

// Get a single post
exports.showOne = function (req, res) {
  //console.log('Inside show');
  Post.findById(req.params.id,function (err, post) {
    if (err) {
      return handleError(res, err);
    }
    if (!post) {
      return res.status(404).send('Not Found');
    }
    return res.status(200).json(post);
  });
};

// Creates a new post in the DB.
exports.create = function (req, res) {
  PostService.createPost(req, function (err, post) {
    if (err)
      return handleError(res, err);
    return res.status(201).json(post);
  });
};

//handle likes dislikes
exports.handleLikesDislikes=function(req,res){
  PostService.doLikeDislike(req,function(err,likeCount,dislikeCount){
    if(err)
      throw err;
    else
    {
      return res.status(201).json({likeCount:likeCount,dislikeCount:dislikeCount});
    }
      //res.send(count);
  });
};


// Updates an existing post in the DB.
exports.update = function (req, res) {
  if (req.body._id) {
    delete req.body._id;
  }
  Post.findById(req.params.id, function (err, post) {
    if (err) {
      return handleError(res, err);
    }
    if (!post) {
      return res.status(404).send('Not Found');
    }
    var updated = _.merge(post, req.body);
    updated.save(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(200).json(post);
    });
  });
};

// Deletes a post from the DB.
exports.destroy = function (req, res) {
  Post.findById(req.params.id, function (err, post) {
    if (err) {
      return handleError(res, err);
    }
    if (!post) {
      return res.status(404).send('Not Found');
    }
    post.remove(function (err) {
      if (err) {
        return handleError(res, err);
      }
      return res.status(204).send('No Content');
    });
  });
};

//exports.showTimeline=function(req,res){
//  if(req.params.timeline){
//    var userId=req.params.id;
//    PostService.showTimelinePosts(userId,function(err,timelinePosts){
//      if (err) {
//        return handleError(res, err);
//      }
//      return res.status(200).json(timelinePosts);
//    });
//  }
//};

function handleError(res, err) {
  return res.status(500).send(err);
}
