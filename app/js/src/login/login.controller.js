(function () {
    'use strict';

    angular.module('app')
        .controller('LoginController', LoginController);

    LoginController.$inject = ['$state'];

    function LoginController($state) {
        var vm = this;
        vm.login = function () {
            if (vm.username === 'user' && vm.password === '123456') {
                $state.go('home');
            }
            else {
                vm.error = 'Please enter valid credentials';  
            }
        };
    }
})();