'use strict';

var _ = require('lodash');
var Complaint = require('./complaint.model');
var ComplaintService = require('./complaint.service');
var UserService=require('../user/user.service');

var formidable = require('formidable');
var filePath = require('../../constants/paths');
var merge=require('merge');


// Get list of complaints for admin
exports.showAll = function (req, res) {
  var query={ $or:[ {'status':'Pending'}, {'assignedTo.personId':req.user._id}]};
  var obj={};
  ComplaintService.getAllComplaints(query, function (err, complaints) {
    if(err)
      return handleError(res,err);
    return res.status(200).json(complaints);
  });
};

// Get the current user's list of complaints
exports.showMine = function (req, res) {
  var query={"postedBy.id":req.user.id};
  ComplaintService.getAllComplaints(query, function (err, complaints) {
    if (err) {
      return handleError(res, err);
    }
    return res.status(200).json(complaints);
  });
};

// Get a single complaint
exports.show = function (req, res) {
  Complaint.findById(req.params.id, function (err, complaint) {
    if (err) {
      return handleError(res, err);
    }
    if (!complaint) {
      return res.status(404).send('Not Found');
    }
    return res.json(complaint);
  });
};

// Creates a new complaint in the DB.
exports.create = function (req, res) {
  var form = new formidable.IncomingForm();
  form.uploadDir = filePath.FILE_UPLOAD_TEMP_PATH;
  form.keepExtensions = true;
  form.parse(req, function (err, fields, files) {
    ComplaintService.modifyComplaint(err, fields, files,req.user,function (error, complaint) {
      ComplaintService.saveComplaint(complaint, function (e, registeredComplaint) {
        if (e)
          return handleError(res, error);
        return res.status(201).json(registeredComplaint);
      });
    });
  });
};

//Updates a existing complaint
exports.editComplaint=function(req,res){
  var complaintId=req.body.id;
  var updation=req.body.updation;
  //console.log("req.body>>>>.",req.body);

  if(updation.assignedTo&&req.user.role=='admin'){
    updation.status='In Progress';
  }
  ComplaintService.updateComplaint(complaintId,updation,function(err,updatedComplaint){
    if (err)
      return handleError(res, error);
    return res.status(201).json(updatedComplaint);
  });
};
function handleError(res, err) {
  return res.status(500).send(err);
}
