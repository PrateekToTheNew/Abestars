/**
 * Created by prateek on 10/3/16.
 */
angular.module('buzzAppApp')
  .service('ComplaintService',['$resource',function($resource){
    return $resource('/api/v1/complaint/:role/:url/:id',{offset:'@offset',role:'@role','id':'@id'},{
      retrieveComplaints:{
        method:'GET',
        isArray:true
      },
      editComplaint:{
        method:'POST'
      },
      getSingleComplaint:{
        method:'GET'
      },
      registerComplaint:{
        method:'Post',
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      }
    });
  }]);
