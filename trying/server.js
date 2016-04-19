var express = require('express');
var mongoose = require('mongoose');
//var Post=require('../server/api/post/post.model');
//var User=require('../server/api/user/user.model');

var app = express();

mongoose.connect('mongodb://localhost/trying');
mongoose.connection.on('error', function (err) {
  console.log(err);
  process.exit(-1);
});

//Schemas


var UserSchema = new mongoose.Schema({
  name: String
});
var User = mongoose.model('User', UserSchema);
var PostSchema = new mongoose.Schema({
  title: String,
  postedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  comments: [{
    text: String,
    postedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }
  }]
});
var Post = mongoose.model('Post', PostSchema);


//Instances

var alex = new User({
  name: "Alex"
});
var joe = new User({
  name: "Joe"
})
//alex.save();
joe.save();


var post = new Post({
  title: "Hello World",
  postedBy: alex._id,
  comments: [{
    text: "Nice post!Done by joe",
    postedBy: joe._id
  }, {
    text: "Thanks :) Done by alex",
    postedBy: alex._id
  }]
});

app.get('/show', function (req, res) {

  post.save(function (error) {
    if (!error) {
      Post.find({})
        .populate('postedBy')
        .populate('comments.postedBy')
        .exec(function (error, posts) {
          res.send(posts)
        })
    }
  });

});

app.listen(3000, function () {
  console.log('server started at port 3000');
});
