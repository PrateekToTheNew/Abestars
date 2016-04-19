/**
 * Created by prateek on 28/2/16.
 */
angular.module('buzzAppApp')
  .directive('imageModel', function () {
    return {
      restrict: 'A',
      scope: {
        isValid: '=',
        fileSelected: '@'
      },
      require: "ngModel",
      link: function (scope, element, attrs, ngModelCtrl) {
        scope.fileSelected = "";
        element.bind('change', function () {
          var file = element[0].files[0];
          if (file === undefined) {
            element[0].files[0] = scope.fileSelected;
            file = scope.fileSelected;
          }
          element.trigger("myEvent");
          if ((file.type == 'image/jpeg' || file.type == 'image/jpg' || file.type == 'image/png') && (file.size <= 4000000)) {
            scope.isValid = true;
            scope.fileSelected = file;
            ngModelCtrl.$setViewValue(file);
            ngModelCtrl.$render();
          }
          else {
            scope.isValid = false;
          }
          scope.$apply();
          $('#postPicUpload').val("");
        });
      }
    }
  });
