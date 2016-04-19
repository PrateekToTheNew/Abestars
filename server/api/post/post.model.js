'use strict';

var User=require('../user/user.model');
var mongoose = require('mongoose'),
    Schema = mongoose.Schema;

var PostSchema = new Schema({
  category:{type:String,default:'Activity'},
  dateCreated:{type:Date,default:Date.now},
  text:{type:String,default:null},
  title:{type:String,default:null},
  createdBy:{
    id:String,
    name:String,
    email:String,
    dp:String
  },
  postImage:{
    path:{type:String,default:null},
    present:{type:Boolean,default:true},
    width:{type:Number,default:0},
    height:{type:Number,default:0}
  },
  likes:[{
      type: mongoose.Schema.Types.ObjectId,
      ref:'User'
  }],
  dislikes:[{
    type: mongoose.Schema.Types.ObjectId,
    ref:'User'
  }],
  active:{type:Boolean,default:true}
});

module.exports = mongoose.model('Post', PostSchema);
