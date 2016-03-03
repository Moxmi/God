/**
 *  AngularJS boot script
 *
 *
 *
 *
 */

var modules = ['directive', 'ngRoute', 'controllers'];
var app = angular.module('God', modules);

// set route info.
app.config(function ($routeProvider) {
    $routeProvider.
        when('/', {
            templateUrl: 'posts.html',
            controller: 'postsCtrl'
        }).
        when('/post/add', {
            templateUrl: 'add.html',
            controller: 'postCtrl'
        }).
        when('/post/:_id', {
            templateUrl: 'content.html',
            controller: 'contentCtrl'
        }).
        otherwise({
            redirectTo: '/'
        });
});


angular.bootstrap(document, ['God']);
