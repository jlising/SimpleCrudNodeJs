import { Injectable } from '@angular/core';
import { Headers, URLSearchParams } from '@angular/http'; //Http in angular 2 resturns observable while in angular 1 it returns promise.
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { Account } from './account';

@Injectable()
export class AccountsService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private url = 'http://localhost:8181/api/accounts';  // URL to web api

    // Inject private classes via constructor
    constructor (private _http: HttpClient){}

    /**
     * Get the list of accounts
     * @param searchString : String
     */
    getList(searchString : String) : Observable<any> {
        //let params: URLSearchParams = new URLSearchParams();
        searchString = searchString || '';

        return this._http.get(this.url + '?' + searchString);
    }

    /**
     * Get account by id
     * @param id : String
     */
    getById(id : String) : Observable<any> {
        id = id || '';

        return this._http.get(this.url + "/" + id);
    }

    /**
     * Update account
     * @param id : String
     * @param body : any
     */
    update(id : String, body : any) : Observable<any> {

        return this._http.patch(this.url + "/" + id, body);
    }

    /**
     * Add new account
     * @param body : any
     */
    save( body : any) : Observable<any> {
        return this._http.post(this.url, body);
    }

    /**
     * Delete account
     * @param id : String
     */
    delete(id : String) : Observable<any> {
          return this._http.delete(this.url + "/" + id);
    }
}
