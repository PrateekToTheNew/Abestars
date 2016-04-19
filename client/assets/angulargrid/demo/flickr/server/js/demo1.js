angular.module('demoApp', ['angularGrid'])
    .service('imageService',['$q','$http',function($q,$http){
        //this.loadImages = function(){
        //    //return $http.jsonp("https://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=JSON_CALLBACK");
        //    var promise=$http.get('/images').then(function(data){
        //        //console.log(data.data);
        //        return data.data;
        //    });
        //
        //    console.log("The promise is-- "+promise);
        //    return promise;



        var myService =
        {
            async: function()
            {
                var promise = $http.get('/images').then(function (response)
                {
                    // The then function here is an opportunity to modify the response
                    //console.log(response.data);
                    // The return value gets picked up by the then in the controller.
                    return response.data;
                });
                // Return the promise to the controller
                return promise;
            }
        };
        return myService;
    }])
    .controller('demo', ['$scope','imageService', 'angularGridInstance', function ($scope,imageService,angularGridInstance)
    {
        imageService.async().then(function(data){
            //data.data.items.forEach(function(obj){
            //    var desc = obj.description,
            //        width = desc.match(/width="(.*?)"/)[1],
            //        height = desc.match(/height="(.*?)"/)[1];
            //
            //    console.log(width,height);
            //    var ratio=1;
                //if(height>width)
                //{
                //    ratio=height/width;
                //    obj.actualHeight  = 1*ratio;
                //    obj.actualWidth = 1;
                //}
                //else
                //{
                //    ratio=width/height;
                //    obj.actualWidth = 1*ratio;
                //    obj.actualHeight = 1;
                //}
                //obj.actualWidth=width;
                //obj.actualHeight=height;
            $scope.pics=data;
            console.log(data);
            });
        //$scope.pics = data.data.items;

    }]);