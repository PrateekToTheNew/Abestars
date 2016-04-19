'use strict';

var mongoose = require('mongoose'),
    Schema = mongoose.Schema;
var User=require('../user/user.model');

var ComplaintSchema = new Schema({
  category:{type:String,default:'Other'},
  dateCreated:{type:Date,default:Date.now},
  concern:{type:String,default:null},
  title:{type:String,default:null},
  postedBy:{
    id:String,
    name:String,
    email:String,
    dp:String
  },
  complaintImage:{
    path:{type:String,default:null},
    present:{type:Boolean,default:true},
    width:{type:Number,default:0},
    height:{type:Number,default:0}
  },
  status:{
    type:String,
    enum:['Pending','In Progress','Resolved','Cancelled','Ok']
  },
  assignedTo:{
    personId:{type:Schema.Types.ObjectId,ref:'User'},
    personName:{type:String,default:'Not Assigned'},
    personEmail:{type:String}
  }
});

module.exports = mongoose.model('Complaint', ComplaintSchema);
