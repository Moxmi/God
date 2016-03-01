/**
 *
 * directive
 *
 **/

angular.module('directive', [])
  .directive("focus", function () {
    return {
        restrict: 'A',
        link: function (scope, element, attr) {
            element[0].focus();
        }
    }
  });
