/**
 * Created by prateek on 10/3/16.
 */
var Complaint = require('./complaint.model');
var sizeOf = require("image-size");
var util = require('util');
var fs = require('fs-extra');

//Converts to the complaint mongoose model object
var setObject=function(fieldValues,isPresent,dimensions,filename,user)
{
  var complaint={};
  complaint.category = fieldValues.category;
  complaint.concern = fieldValues.text;
  complaint.title = fieldValues.title;
  complaint.postedBy = {
    "id": user._id,
    "name": user.name,
    "email": user.email,
    "dp":user.google.image.url
  };
  complaint.complaintImage = {
    "present": isPresent,
    "path": filename,
    "width": dimensions.width,
    "height": dimensions.height
  };
  complaint.status='Pending';
  return complaint;
};

//Check if an object is empty
function isEmpty(obj) {
  for (var key in obj) {
    if (obj.hasOwnProperty(key))
      return false;
  }
  return true;
};

//Save Images and return the complaint object to be saved
exports.modifyComplaint=function(err, fields, files,user,callback){
  var obj = {};
  var dimensions = {};
  var isPresent = true;
  var dir = 'ComplaintImages/' + user.name;

  if (!fs.existsSync(dir))
  {
    fs.mkdirSync(dir);
  }
  if ((!isEmpty(files))&&files.file.path)
  {
    var filename = dir + '/' + user.name+'_'+new Date().getTime() + '.jpg';
    fs.rename(files.file.path, filename, function (err)
    {
      if (err)
      {
        throw err;
      }
      dimensions = sizeOf(filename);
      dimensions = sizeOf(filename);
      obj=setObject(fields,isPresent,dimensions,filename,user);
      return callback(null, obj);
    });
  }
  else
  {
    dimensions.width = 0;
    dimensions.height = 0;
    isPresent = false;
    obj=setObject(fields,isPresent,dimensions,filename,user);
    return callback(null, obj);
  }
};

//Saves complaint in DB
exports.saveComplaint=function(complaint,callback){
  Complaint.create(complaint,function(err,registeredComplaint){
    if(err)
      callback(err,null);
    else
      callback(null,registeredComplaint);
  });
};

//Get all complaints matching a certain criteria
exports.getAllComplaints=function(query,callback){
  Complaint.find(query).sort({dateCreated:-1}).exec(function (err, complaints) {
    if(err)
      return callback(err,null);
    return callback(null,complaints);
  });
};

//Get a complaint by its Id
exports.getOneComplaint=function(id,callback){
  Complaint.findById(id,function(err,complaint){
    if(err)
      return callback(err,null);
    return callback(null,complaint);
  });
};

//Edited complaint changes are saved
exports.updateComplaint=function(complaintId,updation,callback){
  Complaint.findByIdAndUpdate(complaintId,{$set:updation},{new:true},function(err,updatedComplaint){
    if(err)
      return callback(err,null);
    return callback(null,updatedComplaint);
  });
};

