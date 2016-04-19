angular.module('demoApp', ['angularGrid'])
    .service('imageService',['$q','$http',function($q,$http){
        this.loadImages = function(){
            //return $http.jsonp("https://api.flickr.com/services/feeds/photos_public.gne?format=json&jsoncallback=JSON_CALLBACK");
            $http.get('/images').then(function(data){
                console.log(data);
                return data;
            });
        };
    }])
    .controller('demo', ['$scope','imageService', 'angularGridInstance', function ($scope,imageService,angularGridInstance) {
        imageService.loadImages().then(function(data){
            data.data.items.forEach(function(obj){
                var desc = obj.description,
                    width = desc.match(/width="(.*?)"/)[1],
                    height = desc.match(/height="(.*?)"/)[1];

                console.log(width,height);
                var ratio=1;
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
                obj.actualWidth=width;
                obj.actualHeight=height;
            });
            $scope.pics = data.data.items;

        });;
    }]);