import { Component, OnInit } from 'angular2/core';
import { AccountsService } from './accounts.service';
import { Account } from './account';
import { List } from 'immutable';

@Component({
    selector: 'accounts',
    templateUrl : 'app/components/accounts/accounts.component.html',
    providers : [ AccountsService ]
})

export class AccountsComponent implements OnInit{
    public accounts = List<Account>();
    public totalRecords : number;

    public pageParams = {
						page : 1,
						size :1,
						order : 'asc',
						sort : 'name',
						searchString : '',
						accountForm : {id : '', type : '', addresses : []}
		};

    //This will inject AccountsService
    constructor (private _accountsSerivice : AccountsService){}

    //Apply definition since we implemented OnInit
    ngOnInit():any {
        this._getAccounts(this.pageParams.searchString);
    }

    /**
     * Get the list of accounts
     */
    private _getAccounts(searchName : String){
        searchName = searchName || '';

        //Build params
        let urlParams = 'search=' + searchName;
        urlParams += '&page=' + (this.pageParams.page - 1);
        urlParams += '&size=' + this.pageParams.size;
        urlParams += '&sort=' + this.pageParams.sort;
        urlParams += '&order=' + this.pageParams.order;

        let offset =  (this.pageParams.page - 1) > 0 ? ((this.pageParams.page * this.pageParams.size) - this.pageParams.size) + 1 : this.pageParams.page;

        this._accountsSerivice.getList(urlParams)
             .subscribe(response => {
                            //Just add a counter field
                            response.rows.forEach(function(row, key){
                                row.counter = key + offset;
                            });

                            this.accounts = response.rows;
                            this.totalRecords = response.count;
                        });
    }

    public search(){
        this.pageParams.page = 1;
        this._getAccounts(this.pageParams.searchString);
    }

    public resetSearch(){
        this.pageParams.searchString = '';
        this.search();
    }
}