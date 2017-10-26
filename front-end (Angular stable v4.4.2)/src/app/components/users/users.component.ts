/**
 * Users component
 * @author : Jesus Lising <jess.lising@gmail.com>
 */

import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { ToasterService } from 'angular2-toaster';

import { UsersService } from './users.service';
import { AccountsService } from '../accounts/accounts.service';

import { User } from './user';

@Component({
    selector: 'users',
    templateUrl : './app/components/users/users.component.html'
})
export class UsersComponent {
	public accounts : Account[];
	public users : User[];

    public totalRecords : number;

    public pageParams = {
						page : 1,
						size :10,
						order : 'asc',
						sort : 'lname',
						searchString : '',
						userForm : {id : '', fname: '', mname: '', lname: '', account_id: '', email: ''}
		};

    // Inject private classes via constructor
    constructor (private _usersService : UsersService, private _accountsService : AccountsService, private _toasterService : ToasterService){}

    //Apply definition since we implemented OnInit
    ngOnInit() {
        this._getUsers(this.pageParams.searchString);
		this._getAccounts();
    }

    /**
     * Get user by ID
     * @param id : String
     */
    public getUserByID(id : String){
        id = id || '';
        this._usersService.getById(id).subscribe(
                  response => {
                    // Extend the result to the accountForm
                    Object.assign(this.pageParams.userForm, this.pageParams.userForm, response);
                  },
                  (err: HttpErrorResponse) => {
                    this._toasterService.pop('error', '', err.status + ' ' + err.statusText);
                    if (err.error instanceof Error) {
                      console.log("Client-side error occured.");
                    } else {
                      console.log("Server-side error occured.");
                    }
                  }
            );
    }

    /**
     * Get the list of users
     * @param searchName : String
     */
    private _getUsers(searchName : String){
        searchName = searchName || '';

        //Build params
        let urlParams = 'search=' + searchName;
        urlParams += '&page=' + (this.pageParams.page - 1);
        urlParams += '&size=' + this.pageParams.size;
        urlParams += '&sort=' + this.pageParams.sort;
        urlParams += '&order=' + this.pageParams.order;

        let offset =  (this.pageParams.page - 1) > 0 ? ((this.pageParams.page * this.pageParams.size) - this.pageParams.size) + 1 : this.pageParams.page;

        this._usersService.getList(urlParams).subscribe(
                  response => {
                    //Just add a counter field
					response.rows.forEach(function(row, key){
						row.counter = key + offset;
					});

                    this.users = response.rows;
					this.totalRecords = response.count;
                  },
                  (err: HttpErrorResponse) => {
                    this._toasterService.pop('error', '', err.status + ' ' + err.statusText);
                    if (err.error instanceof Error) {
                      console.log("Client-side error occured.");
                    } else {
                      console.log("Server-side error occured.");
                    }
                  }
            );
    }

	/**
     * Update existing user
     */
     public updateUser(){
           this._usersService.update(this.pageParams.userForm.id, {  user : {
                                                                              fname: this.pageParams.userForm.fname,
                                                                              mname: this.pageParams.userForm.mname,
                                                                              lname: this.pageParams.userForm.lname,
                                                                              account_id: this.pageParams.userForm.account_id,
                                                                              email: this.pageParams.userForm.email
                                                                            }})
                .subscribe(
                     response => {
                        this._toasterService.pop('info', '', 'The user ' + this.pageParams.userForm.fname + ' ' + this.pageParams.userForm.mname + ' ' + this.pageParams.userForm.lname + ' has been updated successfully.');
                        this.resetForm();
                        this.search();
                     },
                     (err: HttpErrorResponse) => {
                       this._toasterService.pop('error', '', err.status + ' ' + err.statusText);
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
        this._getUsers(this.pageParams.searchString);
    }

	/**
     * Add new user
     */
    public addUser = function(){
        this._usersService.save({ user : {
                                            fname: this.pageParams.userForm.fname,
                                            mname: this.pageParams.userForm.mname,
                                            lname: this.pageParams.userForm.lname,
                                            account_id: this.pageParams.userForm.account_id,
                                            email: this.pageParams.userForm.email
                                          }})
                        .subscribe(
                             response => {
                                this._toasterService.pop('info', '', 'The user ' + this.pageParams.userForm.fname + ' ' + this.pageParams.userForm.mname + ' ' + this.pageParams.userForm.lname + ' has been added successfully.');
                                this.resetForm();
                                this.search();
                             },
                             (err: HttpErrorResponse) => {
                               this._toasterService.pop('error', '', err.status + ' ' + err.statusText);
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
    public deleteUser = function(id){
         this._usersService.delete(id)
                        .subscribe(
                             response => {
                                this._toasterService.pop('info', '', 'The user ' + response.fname + ' ' + response.mname + ' ' + response.lname + ' has been deleted successfully.');
                                this.resetForm();
                                this.search();
                             },
                             (err: HttpErrorResponse) => {
                               this._toasterService.pop('error', '', err.status + ' ' + err.statusText);
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
        this.pageParams.userForm =  {id : '', fname: '', mname: '', lname: '', account_id: '', email: ''}
    }

	/**
	 * Page changed
	 * @param event : any
	 */
    public pageChanged(event : any):void {
        console.log('Page changed to: ' + event.page);
        console.log('Number items per page: ' + event.itemsPerPage);
		
		this.pageParams.page = event.page;
		this._getUsers(this.pageParams.searchString);
    }
	
	/**
	 * Get the list of accounts
	 */
	private _getAccounts(){
		this._accountsService.getList('').subscribe(
                  response => {
                    this.accounts = response.rows;
                  },
                  (err: HttpErrorResponse) => {
                    this._toasterService.pop('error', '', err.status + ' ' + err.statusText);
                    if (err.error instanceof Error) {
                      console.log("Client-side error occured.");
                    } else {
                      console.log("Server-side error occured.");
                    }
                  }
            );
	}
}