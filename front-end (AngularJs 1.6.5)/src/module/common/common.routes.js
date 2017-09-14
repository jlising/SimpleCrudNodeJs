/**
 * Common route configurations
 * @author : Jesus Lising <jess.lising@gmail.com>
 */
(function(){
	'use strict';
	
	angular.module('common.module')
		.config(routeConfig);
	
	routeConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
	
	function routeConfig($stateProvider, $urlRouterProvider){
		$urlRouterProvider
	        .when('', '/')
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
            /*.state('local-signup', {
                url: '/local-signup',
                templateUrl: './module/common/view/auth/local-signup.html',
                controller: "AuthController",
                controllerAs: "authController"
            })
            .state('fb-login', {
                url: '/fb-login',
                resolve : {
                    fbLogin :  ['AuthService','$state', '$rootScope', function (AuthService, $state, $rootScope) {
                      AuthService.fbLogin({}, function(response){
                            // $state.go("accounts");
                         },function(error){
                               $log.error(error.status + " " + error.statusText);
                               ngToast.create({
                                 className : 'danger',
                                 content:  '<span class="glyphicon glyphicon-warning-sign"></span> &nbsp ' + error.status + " " + error.statusText
                                });
                     });
                   }]
                }
            })*/
            .state('logout', {
                url: '/logout',
                resolve: {
                       logout: ['AuthService','$state', '$rootScope', function (AuthService, $state, $rootScope) {
                            AuthService.logout({}, function(response){
                                   delete $rootScope.$storage.session;
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