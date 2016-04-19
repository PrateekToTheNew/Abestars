/**
 * Created by prateek on 9/3/16.
 */
angular.module('buzzAppApp')
  .service('FormDataService',function(){
    return {
      convertToFormData:function(obj){
        var fd = new FormData();
        for (var key in obj) {
          fd.append(key, obj[key]);
        }
        return fd;
      }
    }
  });
