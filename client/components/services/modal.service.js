/**
 * Created by prateek on 11/3/16.
 */
angular.module('buzzAppApp')
  .service('ModalService', ['$uibModal', function ($uibModal) {

    this.open = function (scope,size) {
      var modalInstance = $uibModal.open({
        animation: true,
        templateUrl: 'components/modal/myModalContent.html',
        size: size,
        scope: scope
      });
      modalInstance.result.then(function (selectedItem) {
        $scope.selected = selectedItem;
      }, function (err) {
        // $log.info('Modal dismissed at: ' + new Date());
      });

      //return modalInstance;
    };
    return this;
  }])
  //.controller('PopupCtrl', function ($scope, $uibModalInstance) {
  //  $scope.ok = function () {
  //    $uibModalInstance.dismiss('cancel');
  //  };
  //});
