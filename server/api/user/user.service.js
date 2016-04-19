/**
 * Created by prateek on 10/3/16.
 */
var User=require('./user.model');
exports.filterUsers=function(filter,callback){
  User.find(filter,function(err,users){
    if(err)
      return callback(err,null);
    return callback(null,users);
  });
};
