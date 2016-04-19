/**
 * Created by prateek on 28/2/16.
 */

angular.module('buzzAppApp')
  .service('PostService',['$resource',function($resource){
    return $resource('/api/v1/post/:offset/:id',{offset:'@offset',id:'@id'},{
      retrievePosts:{
        method:'GET',
        isArray:true
      },
      getSinglePost:{
        method:'GET'
      },
      sendPost:{
        method:'Post',
        transformRequest: angular.identity,
        headers: {'Content-Type': undefined}
      }
    });
  }])
  .service('LikeDislikeService',['$resource',function($resource){
    return $resource('/api/v1/post/likeDislike',{},{
      likeDislike:{
        method:'POST'
      }
    });
  }]);
