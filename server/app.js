/**
 * Main application file
 */

'use strict';

// Set default node environment to development
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

var express = require('express');
var mongoose = require('mongoose');
var path=require("path");
var config = require('./config/environment');
global.root=__dirname;

//var multer = require('multer');
//var path=require("path");

//var up = multer({storage: multer.diskStorage({
//  destination: function (req, file, cb) {
//    cb(null, path.join(process.cwd(), 'uploads'));
//  },
//  filename: function (req, file, cb) {
//    cb(null, Date.now() + "" + Math.ceil(Math.random()*9999) + file.originalname);
//  }
//})});

// Connect to database
mongoose.connect(config.mongo.uri, config.mongo.options);
mongoose.connection.on('error', function(err) {
	console.error('MongoDB connection error: ' + err);
	process.exit(-1);
	}
);
// Populate DB with sample data
if(config.seedDB) { require('./config/seed'); }

// Setup server
var app = express();

var server = require('http').createServer(app);
require('./config/express')(app);
require('./routes')(app);

//console.log(path.join(global.root, 'images'));
//app.use(express.static(path.join(global.root, 'images')));
// Start server
server.listen(config.port, config.ip, function () {
  console.log('Express server listening on %d, in %s mode', config.port, app.get('env'));
});


  //app.post('/api/v1/post', up.single('file'), function (req,res) {
  //  console.log(req.file);
  //  console.log(req.body);
  //});

// Expose app
exports = module.exports = app;
