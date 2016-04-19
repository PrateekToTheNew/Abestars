'use strict';

var express = require('express');
var controller = require('./complaint.controller');
var auth = require('../../auth/auth.service');

var router = express.Router();

router.get('/', auth.hasRole('user') ,controller.showMine); //Current User's complaint
router.get('/admin', auth.hasRole('admin') ,controller.showAll); //All Complaints to be shown to the admin
router.get('/:id', controller.show); //Complaint of a specific Id
router.post('/', auth.isAuthenticated(),controller.create); //
router.post('/:role/:id', auth.isAuthenticated(), controller.editComplaint);
//router.patch('/:id', controller.update);
//router.delete('/:id', controller.destroy);

module.exports = router;
