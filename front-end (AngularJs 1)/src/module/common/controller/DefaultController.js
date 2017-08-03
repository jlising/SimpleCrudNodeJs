(function(){
	'use strict';
	
	angular.module('common.module')
		.controller('DefaultController', DefaultController);
	
	DefaultController.$inject = ['$log'];
	
	function DefaultController($log){
		
		var defaultController = this;
		
		angular.extend(defaultController, {});
	}
})();