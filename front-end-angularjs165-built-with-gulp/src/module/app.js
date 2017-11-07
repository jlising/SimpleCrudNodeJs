/**
 * The application bootstrap. Binds all required modules
 * @author : Jesus Lising <jess.lising@gmail.com>
 */
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
    			   	'ngStorage',

    			   	'common.module',
    			   	'accounts.module',
    			   	'users.module']);
      });
})();