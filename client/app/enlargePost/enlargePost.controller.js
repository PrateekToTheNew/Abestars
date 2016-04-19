'use strict';

angular.module('buzzAppApp')
  .controller('EnlargePostCtrl', ['$scope', 'PostService', '$stateParams', function ($scope, PostService, $stateParams) {
    $scope.enlargePost = {};
    //console.log('enlarge Post Ctrl');
    PostService.getSinglePost({'id': $stateParams.postid, 'offset': 0}, function (required_post) {
      $scope.enlargePost = required_post;
      //console.log(required_post);
    });
  }]);

