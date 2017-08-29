/**
 * Parent service that extends $resource
 * @author : Jesus Lising <jess.lising@gmail.com>
 */
(function(){
	'use strict';
	
	angular.module('common.module')
		.factory('ResourceFactory', ResourceFactory);
	
	ResourceFactory.$inject = ['$resource'];
	
	function ResourceFactory($resource){	
				
		//Build the class
		function ExtendedResource (){
			//Apply the arguments from the extending class to $resource
			var Resource = $resource.apply(this, arguments);

			//Common function for all extending classes
			Resource.myCommonFunction = function() {
				console.log("Common function from ResourceFactory");
		    };
		    
		    return Resource;
		}
		
		//Return as service
		return ExtendedResource;
	}	
})(); 