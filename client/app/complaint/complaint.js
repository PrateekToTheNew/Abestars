'use strict';
angular.module('buzzAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('profile.complaints', {
        url: '/complaints',
        templateUrl: 'app/complaint/complaint.html'
      })
  });
