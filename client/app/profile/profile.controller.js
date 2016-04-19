/**
 * Created by prateek on 1/3/16.
 */
angular.module('buzzAppApp')
  .controller('ProfileCtrl', ['$scope', 'Auth', '$state', 'PostService','FormDataService','$location', function ($scope, Auth, $state, PostService,FormDataService, $location) {
    if (Auth.isLoggedIn()) {
     init();
    }
    else {
      $state.go('launch');
    }
    function init(){
      $scope.user = Auth.getCurrentUser();

      $scope.logout = function () {
        Auth.logout(function(){
          $state.go('launch');
        });
      };
    }
  }]);
