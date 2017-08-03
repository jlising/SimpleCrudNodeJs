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
            .state('404', {
                url: '/page-not-found',
                templateUrl: './module/common/view/error/404.html'
            });
	}
})();