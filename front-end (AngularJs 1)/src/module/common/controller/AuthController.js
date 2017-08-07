(function(){
	'use strict';
	
	angular.module('common.module')
		.controller('AuthController', AuthController);
	
	AuthController.$inject = ['ENVIRONMENT','$scope', '$log','AuthService','ngToast', '$state'];

    function AuthController(ENVIRONMENT, $scope, $log, AuthService, ngToast, $state){
		
		var authController = this;

		angular.extend(authController, {
		    loginForm : {email : '', password : ''}
		});

        /**
         * Login
         */
		authController.login = function(){
            AuthService.login({email:authController.loginForm.email, password:authController.loginForm.password}, function(response){
                    $state.go('accounts');
                },function(error){
                      $log.error(error.status + " " + error.statusText);
                      ngToast.create({
                        className : 'danger',
                        content:  '<span class="glyphicon glyphicon-warning-sign"></span> &nbsp ' + error.status + " " + error.statusText
                       });
          });
		}
	}
})();