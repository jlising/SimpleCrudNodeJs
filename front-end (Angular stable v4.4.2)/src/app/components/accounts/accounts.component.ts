import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { AccountsService } from'./accounts.service';
import { Account } from './account';

@Component({
    selector: 'accounts',
    templateUrl : './app/components/accounts/accounts.component.html'
})

export class AccountsComponent  implements OnInit {
    public accounts : Account[];
    public totalRecords : number;

    public pageParams = {
						page : 1,
						size :10,
						order : 'asc',
						sort : 'name',
						searchString : '',
						accountForm : {id : '', name : '', type : '', addresses : []}
		};

    // Inject private classes via constructor
    constructor (private _accountsService : AccountsService){
        //Initialize index 0 since we use this as model in the forms
        this.pageParams.accountForm.addresses[0] = {};
    }

    //Apply definition since we implemented OnInit
    ngOnInit() {
        // View list of accounts by default
        this._getAccounts(this.pageParams.searchString);
    }

    /**
     * Get account by ID
     * @param id : String
     */
    public getAccountByID(id : String){
        id = id || '';
        this._accountsService.getById(id).subscribe(
                  response => {
                    // Extend the result to the accountForm
                    Object.assign(this.pageParams.accountForm, this.pageParams.accountForm, response);
                  },
                  (err: HttpErrorResponse) => {
                    if (err.error instanceof Error) {
                      console.log("Client-side error occured.");
                    } else {
                      console.log("Server-side error occured.");
                    }
                  }
            );
    }

    /**
     * Get the list of accounts
     * @param searchName : String
     */
    private _getAccounts(searchName : String){
        searchName = searchName || '';

        //Build ur parameters
        let urlParams = 'search=' + searchName;
        urlParams += '&page=' + (this.pageParams.page - 1);
        urlParams += '&size=' + this.pageParams.size;
        urlParams += '&sort=' + this.pageParams.sort;
        urlParams += '&order=' + this.pageParams.order;

        let offset =  (this.pageParams.page - 1) > 0 ? ((this.pageParams.page * this.pageParams.size) - this.pageParams.size) + 1 : this.pageParams.page;

        this._accountsService.getList(urlParams).subscribe(
                  response => {
                    //Just add a counter field
					response.rows.forEach(function(row, key){
						row.counter = key + offset;
					});

                    this.accounts = response.rows;
					this.totalRecords = response.count;
                  },
                  (err: HttpErrorResponse) => {
                    if (err.error instanceof Error) {
                      console.log("Client-side error occured.");
                    } else {
                      console.log("Server-side error occured.");
                    }
                  }
            );
    }

    /**
     * Update existing account
     */
     public updateAccount(){
           this._accountsService.update(this.pageParams.accountForm.id, { account : { name: this.pageParams.accountForm.name,
                                                                                                type: this.pageParams.accountForm.type,
                                                                                                address : this.pageParams.accountForm.addresses[0]
                                                                                               }})
                .subscribe(
                     response => {
                        this.resetForm();
                        this.search();
                     },
                     (err: HttpErrorResponse) => {
                       if (err.error instanceof Error) {
                         console.log("Client-side error occured.");
                       } else {
                         console.log("Server-side error occured.");
                       }
                     }
               );
     }

	/**
	 * Search
	 */
    public search(){
        this.pageParams.page = 1;
        this._getAccounts(this.pageParams.searchString);
    }

	/**
	 * Add new account
	 */
	public addAccount = function(){
        this.pageParams.accountForm.addresses[0].type = 'MAILING';

        this._accountsService.save({ account : { name: this.pageParams.accountForm.name,
                                                                                            type: this.pageParams.accountForm.type,
                                                                                            address : this.pageParams.accountForm.addresses[0]
                                                                                          }})
                        .subscribe(
                             response => {
                                this.resetForm();
                                this.search();
                             },
                             (err: HttpErrorResponse) => {
                               if (err.error instanceof Error) {
                                 console.log("Client-side error occured.");
                               } else {
                                 console.log("Server-side error occured.");
                               }
                             }
                       );
	}

    /**
     * Delete account
     * @param id
     */
    public deleteAccount = function(id){
         this._accountsService.delete(id)
                        .subscribe(
                             response => {
                                this.search();
                             },
                             (err: HttpErrorResponse) => {
                               if (err.error instanceof Error) {
                                 console.log("Client-side error occured.");
                               } else {
                                 console.log("Server-side error occured.");
                               }
                             }
                       );
    }

	/**
	 * Reset search
	 */
    public resetSearch(){
        this.pageParams.searchString = '';
        this.search();
    }

    /**
	 * Reset form
	 */
    public resetForm(){
        this.pageParams.accountForm = {id : '', name : '', type : '', addresses : []};
        //Initialize index 0 since we use this as model in the forms
        this.pageParams.accountForm.addresses[0] = {};
    }

	/**
	 * Page changed
	 * @param event : any
	 */
    public pageChanged(event : any):void {
        console.log('Page changed to: ' + event.page);
        console.log('Number items per page: ' + event.itemsPerPage);
		
		this.pageParams.page = event.page;
		this._getAccounts(this.pageParams.searchString);
    }
}