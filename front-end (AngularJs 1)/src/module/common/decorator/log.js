(function(){
	'use strict';

	angular.module('common.module')
		.config(decoratorConfig);

	decoratorConfig.$inject = ['$provide'];

	function decoratorConfig($provide){
		$provide.decorator('$log', [ "$delegate", "$filter", function($delegate, $filter){
				  var errorFn = $delegate.error;
                  var infoFn = $delegate.info;
                  var warnFn = $delegate.warn;

                  $delegate.error = function(){
                     var args = [].slice.call(arguments), now = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm.s.sss');

                     // Prepend timestamp
                     args[0] = now + " >> " + args[0];

                     // Call the original with the output prepended with formatted timestamp
                     errorFn.apply(null, args)
                 };

                  $delegate.info = function(){
                      var args = [].slice.call(arguments), now = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm.s.sss');

                      // Prepend timestamp
                      args[0] = now + " >> " + args[0];

                      // Call the original with the output prepended with formatted timestamp
                      infoFn.apply(null, args)
                  };

                  $delegate.warn = function(){
                     var args = [].slice.call(arguments), now = $filter('date')(new Date(), 'yyyy-MM-dd HH:mm.s.sss');

                     // Prepend timestamp
                     args[0] = now + " >> " + args[0];

                     // Call the original with the output prepended with formatted timestamp
                     warnFn.apply(null, args)
                  };

                  return $delegate;
              }]);
	}
})();