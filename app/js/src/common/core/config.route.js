(function () {
    'use strict';

    angular.module('app')
        .config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {
            $urlRouterProvider.otherwise('login');

            $stateProvider
                .state('login', {
                    url: '/login',
                    templateUrl: 'js/src/login/login.html',
                    controller: 'LoginController as vm'
                })
                .state('home', {
                    url: '/home',
                    templateUrl: 'js/src/home/home.html',
                    controller: 'HomeController as vm'
                });
        }]);
})();