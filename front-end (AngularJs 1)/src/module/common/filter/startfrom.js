(function(){
		'use strict';
		
		angular.module('common.module')
			.filter('startFrom', startFrom);
		
		function startFrom() {
			 return function(input, start) {
		        if (!input || !input.length) { return; }
		        start = +start; //parse to int
		        return input.slice(start);
		     };
		}
})();