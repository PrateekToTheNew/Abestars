
angular.module('buzzAppApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('launch', {
        url: '/launch',
        templateUrl: 'app/launch/launch.html'
      });
  });
