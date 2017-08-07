//Module specific routings
(function(){
	'use strict';
	
	angular.module('common.module')
		.config(routeConfig);
	
	routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
	
	function routeConfig($stateProvider, $urlRouterProvider){
		$urlRouterProvider
	        .when('', '/')
	        .when('/', '/accounts')
	        .otherwise('/page-not-found');
		
		$stateProvider
	        .state('default', {
                url: '/',
                templateUrl: './module/common/view/default/index.html',
                controller: "DefaultController",
                controllerAs: "defaultController"
            })
            .state('login', {
                url: '/login',
                templateUrl: './module/common/view/auth/login.html',
                controller: "AuthController",
                controllerAs: "authController"
            })
            .state('logout', {
                url: '/logout',
                resolve: {
                       logout: ['AuthService','$state', function (AuthService, $state) {
                            AuthService.logout({}, function(response){
                                   $state.go("login");
                               },function(error){
                                     $log.error(error.status + " " + error.statusText);
                                     ngToast.create({
                                       className : 'danger',
                                       content:  '<span class="glyphicon glyphicon-warning-sign"></span> &nbsp ' + error.status + " " + error.statusText
                                      });
                           });
                       }]
                }
            })
            .state('404', {
                url: '/page-not-found',
                templateUrl: './module/common/view/error/404.html'
            });
	}
})();