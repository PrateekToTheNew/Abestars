'use strict';

angular.module('buzzAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profile', {
        url: '/profile',
        templateUrl: 'app/profile/profile.html'
      })
      .state('profile.posts', {
        url: '/posts',
        abstract:true,
        templateUrl: 'app/post/post.html',
        controller:'PostCtrl'
      })
      .state('profile.posts.tab1', {
        url: '',
        templateUrl: 'app/post/allPosts.html'
      })
      .state('profile.posts.tab2', {
        url: '/timeline',
        templateUrl:'app/post/timeline.html'
      })
      .state('profile.posts.tab3', {
        url: '/lostNfound',
        templateUrl: 'app/post/lostNfound/lostNfound.html'
      });
  });
