'use strict';

angular.module('buzzAppApp')
  .controller('PostCtrl', ['$scope','ModalService',function ($scope,ModalService) {
    $scope.modalName='Buzz It';
    $scope.fileValidity = true;

    $scope.postDetails = {
      'PostedByid': $scope.user._id,
      'PostedByname': $scope.user.name,
      'PostedByemail': $scope.user.email,
      'category': 'Activity'
    };
    $scope.postDropdownItems=['Activity','Placement'];
    $scope.lostNfoundFilterBy={
      category:'Placement'
    };
    $scope.timelineFilterBy={
      'createdBy.id':$scope.user._id
    };
    $scope.offset = 0;
    $scope.loading = false;
    $scope.allLoaded = false;


    $scope.open=function(){
      ModalService.open($scope,'md');
    };
  }]);
