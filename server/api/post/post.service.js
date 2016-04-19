/**
 * Created by prateek on 28/2/16.
 */


var formidable = require('formidable');
var util = require('util');
var fs = require('fs-extra');
var sizeOf = require("image-size");
var Post=require('./post.model');
var filePath=require('../../constants/paths');
var _=require('lodash');
//var jimp=require("jimp");

//Check if an object is empty
function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
};

//Return an object which can be directly saved to the post collection, also the images are saved in folders
var modify = function (req,callback)
{
  var form = new formidable.IncomingForm();

  form.uploadDir = filePath.FILE_UPLOAD_TEMP_PATH;
  form.keepExtensions = true;

  var obj = {};
  var dimensions = {};
  var isPresent = true;

  form.parse(req, function (err, fields, files)
  {
    var setObject=function(fieldValues)
    {
      var post={};
      //console.log("Inside func",fieldValues);
      post.category = fieldValues.category;
      post.text = fieldValues.text;
      post.title = fieldValues.title;
      post.createdBy = {
        "id": fieldValues.PostedByid,
        "name": fieldValues.PostedByname,
        "email": fieldValues.PostedByemail,
        "dp":req.user.google.image.url
      };
      post.postImage = {
        "present": isPresent,
        "path": filename,
        "width": dimensions.width,
        "height": dimensions.height
      };
      return post;
    };
    //console.log("fff----",fields,"lll---",files);
    var dir = 'images/' + fields.PostedByname;
    if (!fs.existsSync(dir))
    {
      fs.mkdirSync(dir);
    }


    if ((!isEmpty(files))&&files.file.path)
    {
      var filename = dir + '/' + fields.PostedByname+'_'+new Date().getTime() + '.jpg';
      fs.rename(files.file.path, filename, function (err)
      {
        if (err)
        {
          console.log(err,">>>>>>>>>eror")
          throw err;
        }
        //jimp.read(filename,function(err,pic){
        //  console.log(pic);
        //})
        dimensions = sizeOf(filename);
        console.log('renamed complete',dimensions.width);
        obj=setObject(fields);
        //console.log("Inside if----",obj);
        return callback(null, obj);
      });
    }
    else
    {
      dimensions.width = 0;
      dimensions.height = 0;
      isPresent = false;
      obj=setObject(fields);
      //console.log("Inside else----",obj);
      return callback(null, obj);
    }
  });
};

//var printArray=function(arr,msg){
//  console.log(msg);
//  arr.forEach(function(obj){
//    console.log(obj);
//  });
//};

//Checking of like dislike functionality is done
var generalisedLikeDislike=function(array1,array2,clickedBy){
  if(_.findIndex(array1,clickedBy)===-1){      //Returns true if if the users has not clicked the button
    if(_.findIndex(array2,clickedBy)!==-1){    //Returns true if user's id is in other array
      var index=_.findIndex(array2,clickedBy); //Get the index of user's id from the array 2
      array2.splice(index, 1);                  //Remove user from the array 2
    }
    array1.push(clickedBy);                     //Add user to array 1
  }
};


//Creates a new post in DB
exports.createPost=function(req,callback){
  modify(req,function(err,post){
    Post.create(post, function (err, post) {
      if (err) {
        callback(err,null);
      }
      callback(null,post);
    });
  });

};

//Entry point for like dislike functionality
exports.doLikeDislike=function(req,callback){
  var PostId=req.body.postId;
  var clickedBy=req.user._id;
  var type=req.body.type;

  //console.log(PostId+'  '+clickedBy+'  '+type);
  Post.findById(PostId,function(err,doc){
    var likeArr=doc.likes;
    var disLikeArr=doc.dislikes;

    switch(type){
      case 'Like':{
        console.log('like');
        generalisedLikeDislike(likeArr,disLikeArr,clickedBy);
        break;
      }
      case 'Dislike':{
        console.log('Dislike');
        generalisedLikeDislike(disLikeArr,likeArr,clickedBy);
        break;
      }
      default:{
        console.log("In default case");
      }
    }
    doc.save(function(err){
      if(err)
        callback(err,null);
      else{
          callback(null,likeArr.length,disLikeArr.length);
      }
    });
  });
};
//exports.showTimelinePosts=function(userId,cb){
//  Post.find({'createdBy.id':userId}).sort({dateCreated:-1}).exec(function(err,timeline){
//    if(err)
//      return cb(err,null);
//    return cb(null,timeline);
//  });
//};
