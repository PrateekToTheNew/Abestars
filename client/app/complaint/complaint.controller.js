'use strict';

//Not used anywhere
angular.module('buzzAppApp')
  .controller('ComplaintsViewCtrl', ['$scope', 'ComplaintService', 'ModalService', 'Auth', function ($scope, ComplaintService, ModalService, Auth) {
    $scope.complaints = [];
    $scope.complaint={};
    $scope.updation = {};
    $scope.modalName = 'Complaint Registration Form';
    $scope.complaintFileValidity = true;
    $scope.complaintDropdownItems = ['Admin', 'IT', 'Infrastructure', 'HR', 'Operations', 'Others'];
    $scope.adminComplaints = [];
    $scope.showAll = false;
    var query = {};

    $scope.getComplaints = function () {
      //console.log("Getting complaints");
      if ($scope.user.role == 'admin') {
        query = {role: 'admin'};
        Auth.getAdminUsers(function (admins) {
          $scope.adminUsers = admins;
        });
      }
      ComplaintService.retrieveComplaints(query, function (complaints) {
        $scope.complaints = complaints;
        complaints.forEach(function (complaint) {
          if (complaint.postedBy.id === $scope.user._id)
            $scope.adminComplaints.push(complaint);
        });
      });


    };
    $scope.getComplaints();


    $scope.assignTo = function (complaintId, admin, complaintIndex) {
      //console.log("Assigned To--", admin);
      $scope.updation = {
        assignedTo: {
          personId: admin._id,
          personName: admin.name,
          personEmail: admin.email
        }
      };
      ComplaintService.editComplaint({
        role: 'admin',
        id: complaintId,
        updation: $scope.updation
      }, function (updatedComplaint) {
        $scope.complaints[complaintIndex] = updatedComplaint;
      });
    };
    $scope.changeStatus = function (complaintId, status, complaintIndex, role) {
      //console.log("change status");
      $scope.updation = {status: status};
      ComplaintService.editComplaint({
        role: $scope.user.role,
        id: complaintId,
        updation: $scope.updation
      }, function (updatedComplaint) {
        if (role === 'admin') {
          $scope.complaints[complaintIndex] = updatedComplaint;
        }
        else {
          $scope.complaints[complaintIndex] = updatedComplaint;
        }
      });
    };
    $scope.open = function () {
      ModalService.open($scope, 'md');
    };
    $scope.getAdminComplaints = function () {
      $scope.complaints = $scope.adminComplaints;
    };
    $scope.$on('Form Submitted: Complaint',function(event,data){
      $scope.complaints.unshift(data);
      $scope.getComplaints();
    });
  }]);
