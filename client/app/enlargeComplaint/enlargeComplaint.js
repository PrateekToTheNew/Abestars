'use strict';

angular.module('buzzAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('enlargeComplaint', {
        url: '/enlargeComplaint/:complaintId',
        templateUrl: 'app/enlargeComplaint/enlargeComplaint.html',
        controller: 'EnlargeComplaintCtrl'
      });
  });
