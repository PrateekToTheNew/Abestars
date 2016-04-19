/**
 * Created by prateek on 9/3/16.
 */
angular.module('buzzAppApp')
  .directive('postSender',['PostService','ComplaintService','FormDataService','$rootScope',function(PostService,ComplaintService,FormDataService,$rootScope){
    var formSenderCtrl=['$scope',function($scope){
      $scope.removePic = function () {
        $scope.fileValidity=true;
        $scope.modelObj.file = '';
      };
      $scope.sendDetails = function () {
        var formData = FormDataService.convertToFormData($scope.modelObj);

        if($scope.registeringService==='ComplaintService')
        {
          ComplaintService.registerComplaint(formData,function(res){
            $rootScope.$broadcast('Form Submitted: Complaint',res);
            $scope.modelObj.title = "";
            $scope.modelObj.text = "";
            $scope.modelObj.file = "";
            $scope.modelObj.category="";
          });
        }
        else{
          PostService.sendPost(formData, function (res) {
            $rootScope.$broadcast('Form Submitted: Post',res);
            $scope.modelObj.title = "";
            $scope.modelObj.text = "";
            $scope.modelObj.file = "";
            $scope.modelObj.category="Activity";
          });
        }
      };
    }];
    return{
      restrict:'E',
      scope:{
        modelObj:'=modelObj',
        inputBoxTitle:'@inputBoxTitle',
        titlePlaceholder:'@titlePlaceholder',
        textPlaceholder:'@textPlaceholder',
        dropdownItems:'=dropdownItems',
        fileValidity:'=',
        registeringService:'=registeringService',
        submitText:'@submitText'
      },
      templateUrl:'components/directives/postSender/postSender.html',
      controller:formSenderCtrl,
      link:function(scope,element,attrs){
        if(scope.modelObj.file!==undefined)
          scope.modelObj.file="";
      }
    };
  }]);
