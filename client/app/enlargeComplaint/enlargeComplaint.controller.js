'use strict';

angular.module('buzzAppApp')
  .controller('EnlargeComplaintCtrl',['$scope','ComplaintService','$stateParams', function ($scope,ComplaintService,$stateParams) {
    $scope.enlargeComplaint = {};
    //console.log("Enlarge Complaint");
    ComplaintService.getSingleComplaint({'id': $stateParams.complaintId}, function (required_complaint) {
      $scope.enlargeComplaint = required_complaint;
    });
  }]);
