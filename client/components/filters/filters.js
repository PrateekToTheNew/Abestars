/**
 * Created by prateek on 3/3/16.
 */
angular.module('buzzAppApp')
  .filter('subString',function(){
    return function(str,start,end){
      if(str)
        return str.substr(start,end);
    }
  });
