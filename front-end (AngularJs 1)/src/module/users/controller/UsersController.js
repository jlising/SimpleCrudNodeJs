(function(){
	'use strict';
	
	angular.module('users.module')
		.controller('UsersController', UsersController);
	
	UsersController.$inject = ['ENVIRONMENT','$scope', '$log','UsersService'];
	
	function UsersController(ENVIRONMENT, $scope, $log, UsersService){
		
		var usersController = this;
		
		angular.extend(usersController, {
						page : 1,
                        size : ENVIRONMENT.rowsPerPage,
                        order : 'asc',
                        sort : 'fname',
                        searchName : ''
		});

		//Watch pagination
        $scope.$watch('usersController.page', function(oldValue, newValue){
            _getUsers();
        });

        //Search
        usersController.search = function(){
            usersController.page = 1;

            _getUsers(usersController.searchName);
        };

        //Private function to get the list of accounts
        function _getUsers(search){
            search = search || '';

            UsersService.get({search: search, page: usersController.page - 1, size: usersController.size, sort : usersController.sort , order: usersController.order }, function(response){

                angular.forEach(response.rows, function(row, key) {
                    row.counter = key + 1;
                });

                usersController.totalRecords = response.count;
                usersController.results = response.rows;
            },function(error){
                 $log.debug(error.status + " " + error.statusText);
            });
        };
	}
})();