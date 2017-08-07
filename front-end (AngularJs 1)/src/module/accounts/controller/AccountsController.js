(function(){
	'use strict';
	
	angular.module('accounts.module')
		.controller('AccountsController', AccountsController);
	
	AccountsController.$inject = ['ENVIRONMENT', '$scope','$log','AccountsService','ngToast'];
	
	function AccountsController(ENVIRONMENT, $scope, $log, AccountsService, ngToast){
		
		var accountsController = this;

        /**
         * Extend the controller with additional variables
         */
		angular.extend(accountsController, {
						page : 1,
						size : ENVIRONMENT.rowsPerPage,
						order : 'asc',
						sort : 'name',
						searchName : '',
						accountForm : {id : '', type : '', addresses : []}
		});

        /**
         * Watch changes in pagination
         * @param oldValue
         * @param newValue
         */
        $scope.$watch('accountsController.page', function(oldValue, newValue){
           _getAccounts(accountsController.searchName);
        });

        /**
         * Search records
         */
        accountsController.search = function(){
             accountsController.page = 1;

            _getAccounts(accountsController.searchName);
        };

        /**
         * Add new account
         */
        accountsController.addAccount = function(){
             accountsController.accountForm.addresses[0].type = 'MAILING';
             AccountsService.save({
                       account : {
                                   name: accountsController.accountForm.name,
                                   type: accountsController.accountForm.type,
                                   address : accountsController.accountForm.addresses[0]
                                 }
                 }, function(response){
                        ngToast.create({
                          className : 'info',
                          content: '<span class="glyphicon glyphicon-ok"></span> &nbsp The account ' + accountsController.accountForm.name + ' has been added successfully.'
                        });
                        accountsController.search();
                        accountsController.resetForm();
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
        accountsController.updateAccount = function(){
                AccountsService.update({id : accountsController.accountForm.id}, {
                            account : { name: accountsController.accountForm.name,
                                        type: accountsController.accountForm.type,
                                        address : accountsController.accountForm.addresses[0]
                                      }
                      }, function(response){
                            accountsController.search();
                            ngToast.create({
                              className : 'info',
                              content: '<span class="glyphicon glyphicon-ok"></span> &nbsp The account ' + accountsController.accountForm.name + ' has been updated successfully.'
                            });
                            accountsController.resetForm();
                      },function(error){
                            $log.error(error.status + " " + error.statusText);

                            ngToast.create({
                             className : 'danger',
                             content:  '<span class="glyphicon glyphicon-warning-sign"></span> &nbsp ' + error.status + " " + error.statusText
                            });
                });
        };

        /**
         * Get account and show it in the form
         * @param id
         */
        accountsController.getAccount = function(id){
            AccountsService.getById({id: id}, function (response){
                  angular.extend(accountsController.accountForm, response);
            },function(error){
                  $log.error(error.status + " " + error.statusText);

                 ngToast.create({
                  className : 'danger',
                  content:  '<span class="glyphicon glyphicon-warning-sign"></span> &nbsp ' + error.status + " " + error.statusText
                 });
            });
        };

        /**
         * Delete account
         * @param id
         */
        accountsController.deleteAccount = function(id){
            AccountsService.delete({id: id}, function (response){
                  ngToast.create({
                    className : 'info',
                    content: '<span class="glyphicon glyphicon-ok"></span> &nbsp The account ' + response.name + ' has been deleted successfully.'
                  });
                  accountsController.search();
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
        accountsController.resetForm = function(){
            accountsController.accountForm = {id : '', type: 'MAILING', type : '', addresses : []};
        };

        /**
         * Reset search
         */
        accountsController.resetSearch = function(){
             accountsController.searchName = '';
             accountsController.search();
        };

        /**
         * Get accounts
         * @param search
         */
        function _getAccounts(search){
            search = search || '';

            AccountsService.get({search: search, page: accountsController.page - 1, size: accountsController.size, sort : accountsController.sort , order: accountsController.order }, function(response){
                var offset =  (accountsController.page - 1) > 0 ? ((accountsController.page * accountsController.size) - accountsController.size) + 1 : accountsController.page;

                angular.forEach(response.rows, function(row, key) {
                    row.counter = key + offset;
                });

                accountsController.totalRecords = response.count;
                accountsController.results = response.rows;
            },function(error){
                 $log.error(error.status + " " + error.statusText);

                 ngToast.create({
                  className : 'danger',
                  content:  '<span class="glyphicon glyphicon-warning-sign"></span> &nbsp ' + error.status + " " + error.statusText
                 });
            });
        };
	}
})();