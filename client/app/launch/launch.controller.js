/**
 * Created by prateek on 26/2/16.
 */
angular.module('buzzAppApp')
  .controller('launchCtrl', ['$scope', '$location', '$window', function ($scope, $location, $window) {

    $scope.invalidMessage = false;
    $scope.notLoggedIn = false;

    //console.log('asdfasf');

    var param = $location.search();
    if (param.error == '111000')
      $scope.invalidMessage = true;


    $scope.loginOauth = function (provider) {
      $window.location.href = '/auth/' + provider;
    };
  }]);
