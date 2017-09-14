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

    //This is inject AccountsService
    constructor (private _accountsSerivice : AccountsService){}

    //Apply definition since we implemented OnInit
    ngOnInit() {
         this.accounts = List<Account>();
    }
}