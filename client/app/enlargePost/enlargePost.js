'use strict';

angular.module('buzzAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('enlargePost', {
        url:'/enlargePost/:postid',
        templateUrl: 'app/enlargePost/enlargePost.html',
        controller: 'EnlargePostCtrl'
      });
  });
