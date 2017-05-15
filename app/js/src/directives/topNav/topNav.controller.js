(function () {
    'use strict';
    
    angular.module('app')
        .directive('topNav', [function () {
            return {
                restrict: 'E',
                controller: 'TopNavController',
                controllerAs: 'TopNavCtrl',
                templateUrl: 'js/src/directives/topNav/topNav.html'
            };
        }])
        .controller('TopNavController', [function () {

        }]);
})();