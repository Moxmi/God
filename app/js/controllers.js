/**
 *
 *
 * controllers
 *
 */

angular.module('controllers', [])
  .controller("postsCtrl", ['$scope', '$http',
              function ($scope, $http) {
    $http.get('/posts')
      .success(function (data) {
        console.log(data);
        $scope.posts = data;
      })
      .error(function (err) {
        console.log(err);
      });
  }])
  .controller("postCtrl", ['$scope', '$http', '$location',
              function ($scope, $http, $location) {
    $scope.form = {};
    $scope.form.submit = function () {
      console.log($scope.form)
      $http.post('/post/add', $scope.form)
        .success(function (data) {
          $location.url('/');
        })
        .error(function (err) {
          console.log(err);
        });
    }
  }])
  .controller("contentCtrl", ['$scope', '$http', '$routeParams',
              function ($scope, $http, $routeParams) {
    $http.get('/post/' + $routeParams._id)
      .success(function (data) {
        console.log(data);
        $scope.post = data;
      });

    $scope.form = {};
    $scope.form.submit = function () {
      $http.post('/post/' + $routeParams._id + '/comment', $scope.form)
        .success(function () {
          $scope.post.comments.push({
            comment: $scope.form.comment
          });
          $scope.form.comment = '';
        });
    }
  }]);
