/**
 * Users controller
 * @author : Jesus Lising <jess.lising@gmail.com>
 */
(function(){
	'use strict';
	
	angular.module('users.module')
		.controller('UsersController', UsersController);
	
	UsersController.$inject = ['ENVIRONMENT','$scope', '$log','UsersService', 'AccountsService','ngToast'];
	
	function UsersController(ENVIRONMENT, $scope, $log, UsersService, AccountsService, ngToast){
		
		var usersController = this;

		/**
         * Extend the controller with additional variables
         */
		angular.extend(usersController, {
						page : 1,
                        size : ENVIRONMENT.rowsPerPage,
                        order : 'asc',
                        sort : 'fname',
                        searchName : '',
                        userForm : {id : ''},
                        accounts : []
		});

		/**
         * Watch changes in pagination
         * @param oldValue
         * @param newValue
         */
        $scope.$watch('usersController.page', function(oldValue, newValue){
            _getUsers();
        });

         /**
         * Search records
         */
        usersController.search = function(){
            usersController.page = 1;

            _getUsers(usersController.searchName);
        };

        /**
         * Add new user
         */
        usersController.addUser = function(){
             UsersService.save({
                       user : {
                                   fname: usersController.userForm.fname,
                                   mname: usersController.userForm.mname,
                                   lname: usersController.userForm.lname,
                                   account_id: usersController.userForm.account_id,
                                   email: usersController.userForm.email
                                 }
                 }, function(response){
                        ngToast.create({
                          className : 'info',
                          content: '<span class="glyphicon glyphicon-ok"></span> &nbsp The user ' + usersController.userForm.fname + ' ' + usersController.userForm.mname + ' ' + usersController.userForm.lname + ' has been added successfully.'
                        });
                        usersController.search();
                        usersController.resetForm();
                 },function(error){
                       $log.error(error.status + " " + error.statusText);

                       ngToast.create({
                         className : 'danger',
                         content:  '<span class="glyphicon glyphicon-warning-sign"></span> &nbsp ' + error.status + " " + error.statusText
                        });
           });
        };

        /**
         * Update existing account
         */
        usersController.updateUser = function(){
            UsersService.update({id : usersController.userForm.id}, {
                        user : {fname: usersController.userForm.fname,
                                mname: usersController.userForm.mname,
                                lname: usersController.userForm.lname,
                                account_id: usersController.userForm.account_id,
                                email: usersController.userForm.email
                                }
                  }, function(response){
                        usersController.search();
                        ngToast.create({
                          className : 'info',
                          content: '<span class="glyphicon glyphicon-ok"></span> &nbsp The user ' + usersController.userForm.fname + ' ' + usersController.userForm.mname + ' ' + usersController.userForm.lname + ' has been updated successfully.'
                        });
                        usersController.resetForm();
                  },function(error){
                        $log.error(error.status + " " + error.statusText);

                        ngToast.create({
                         className : 'danger',
                         content:  '<span class="glyphicon glyphicon-warning-sign"></span> &nbsp ' + error.status + " " + error.statusText
                        });
            });
        };

        /**
         * Get user and show it in the form
         * @param id
         */
         usersController.getUser = function(id){
            UsersService.getById2({id: id}, function (response){
                 angular.extend(usersController.userForm, response);
            },function(error){
                  $log.error(error.status + " " + error.statusText);

                 ngToast.create({
                  className : 'danger',
                  content:  '<span class="glyphicon glyphicon-warning-sign"></span> &nbsp ' + error.status + " " + error.statusText
                 });
            });
        };

        /**
         * Delete user
         * @param id
         */
        usersController.deleteUser = function(id){
            UsersService.delete({id: id}, function (response){
                  ngToast.create({
                    className : 'info',
                    content: '<span class="glyphicon glyphicon-ok"></span> &nbsp The user '  + response.fname + ' ' + response.mname + ' ' + response.lname + ' has been deleted successfully.'
                  });
                  usersController.search();
            },function(error){
                  $log.error(error.status + " " + error.statusText);

                  ngToast.create({
                   className : 'danger',
                   content:  '<span class="glyphicon glyphicon-warning-sign"></span> &nbsp ' + error.status + " " + error.statusText
                  });
            });
        };

        /**
         * Reset form
         */
        usersController.resetForm = function(){
            usersController.userForm = {id : ''};
        };

        /**
         * Reset search
         */
        usersController.resetSearch = function(){
             usersController.searchName = '';
             usersController.search();
        };

        //Private function to get the list of accounts
        function _getUsers(search){
            search = search || '';

            UsersService.get({search: search, page: usersController.page - 1, size: usersController.size, sort : usersController.sort , order: usersController.order }, function(response){

                var offset =  (usersController.page - 1) > 0 ? ((usersController.page * usersController.size) - usersController.size) + 1 : usersController.page;

                angular.forEach(response.rows, function(row, key) {
                    row.counter = key + offset;
                });

                usersController.totalRecords = response.count;
                usersController.results = response.rows;
            },function(error){
                 $log.debug(error.status + " " + error.statusText);
            });
        };

        /**
         * Get the list of accounts
         */
        function _getAccounts(search){
            search = search || '';

            AccountsService.get({search: search, sort : 'name' , order: 'asc' }, function(response){
                usersController.accounts = response.rows;
            },function(error){
                 $log.error(error.status + " " + error.statusText);

                 ngToast.create({
                  className : 'danger',
                  content:  '<span class="glyphicon glyphicon-warning-sign"></span> &nbsp ' + error.status + " " + error.statusText
                 });
            });
        };

        _getAccounts();
	}
})();