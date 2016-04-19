/**
 * Created by prateek on 9/3/16.
 */
angular.module('buzzAppApp')
  .directive('postView', function () {
    return {
      restrict: 'E',
      scope: {
        offset: '=offset',
        loading: '=loading',
        allLoaded: '=allLoaded',
        filterBy: '=filterBy'
      },
      templateUrl: 'components/directives/postView/postView.html',
      controller: "postViewCtrl"
    };
  })
  .controller('postViewCtrl', ['$scope', 'PostService', 'LikeDislikeService', 'Auth', '$timeout', function ($scope, PostService, LikeDislikeService, Auth, $timeout) {
    $scope.posts = [];

    var filter = $scope.filterBy || {};
    var loadMore = function () {
      window.removeEventListener("scroll", showScroll);
      //console.log("Loading More---");
      $timeout(function () {
        getPosts();
        $scope.loading = false;
      }, 1000);
      $scope.$apply(function () {
        $scope.loading = true;
      });
    };
    var showScroll = function () {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight - (document.body.offsetHeight * 0.05)) {
        loadMore();
      }
    };
    window.addEventListener("scroll", showScroll);
    var getPosts = function () {
      angular.extend(filter, {offset: $scope.offset});
      PostService.retrievePosts(filter, function (response) {
        //console.log(response);
        if (response.length === 0) {
          $scope.allLoaded = true;
          window.removeEventListener("scroll", showScroll);
          $('body').animate({scrollTop: document.body.offsetHeight}, 10);
        }
        else {
          window.addEventListener("scroll", showScroll);
          $scope.offset += 8;
          $scope.posts = $scope.posts.concat(response);
          response.forEach(function (post) {
            post.actualWidth = post.postImage.width;
            post.actualHeight = post.postImage.height;
            post.likeCount = post.likes.length;
            post.dislikeCount = post.dislikes.length;
            console.log(">>>>",post.likeCount);

            if (post.likes.indexOf(Auth.getCurrentUser()._id) >= 0) {
              post.hasLiked = true;
            }
            if (post.dislikes.indexOf(Auth.getCurrentUser()._id) >= 0) {
              post.hasDisLiked = true;
            }
          });
        }
        $scope.isLoading = false;
      });
    };
    getPosts();
    $scope.like = function (postId, index) {
      var likeObj = {
        postId: postId,
        type: 'Like'
      };
      LikeDislikeService.likeDislike(likeObj, function (res) {
        $scope.posts[index].likeCount = res.likeCount;
        $scope.posts[index].dislikeCount = res.dislikeCount;
        $scope.posts[index].hasLiked = true;
        $scope.posts[index].hasDisLiked = false;
      });
    };
    $scope.dislike = function (postId, index) {
      var dislikeObj = {
        postId: postId,
        type: 'Dislike'
      };
      LikeDislikeService.likeDislike(dislikeObj, function (res) {
        $scope.posts[index].likeCount = res.likeCount;
        $scope.posts[index].dislikeCount = res.dislikeCount;
        $scope.posts[index].hasDisLiked = true;
        $scope.posts[index].hasLiked = false;
      });
    };
    $scope.$on('$destroy', function () {
      window.removeEventListener("scroll", showScroll)
    });
    $scope.$on('Form Submitted: Post',function(event,data){
      data.likeCount=0;
      data.dislikeCount=0;
      if(filter.category=='Placement'&&data.category=='Placement')
        $scope.posts.unshift(data);
      else if(Object.keys(filter).length===2 && data.category=='Activity')
      {
        $scope.posts.unshift(data);
      }
      else if(Object.keys(filter).length===1)
      {
        $scope.posts.unshift(data);
      }
    });
  }]);
