//The application bootstrap
(function(){
	 'use strict';
	
      angular.element(document).ready(function () {
    	  angular.bootstrap(document.documentElement, 
    			  [	'ui.router',
    	            "ui.bootstrap",
    			   	'ngSanitize',
    			   	'ngResource',
    			   	'ngAnimate',
    			   	'ngToast',
    			   	
    			   	'common.module',
    			   	'accounts.module',
    			   	'users.module']);
      });
})();