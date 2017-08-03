(function(){
	'use strict';
	
	angular.module('common.module')
		.config(decoratorConfig);

	decoratorConfig.$inject = ['$provide'];

	function decoratorConfig($provide){
		$provide.decorator('$log', [ "$delegate", "$filter", function($delegate, $filter){
				  // Save the original $log.debug()
                  var debugFn = $delegate.debug;
   
                  $delegate.debug = function(){
                      var args = [].slice.call(arguments),
                       	  now = $filter('date')(new Date(), 'EEEE, MMMM dd yyyy HH:mm');
   
                     // Prepend timestamp
                     args[0] = now + " >> " + args[0];
   
                     // Call the original with the output prepended with formatted timestamp
                     debugFn.apply(null, args)
                  };
   
                  return $delegate;
              }]);
	}
})();