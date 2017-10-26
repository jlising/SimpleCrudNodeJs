/**
 * Users service
 * @author : Jesus Lising <jess.lising@gmail.com>
 */

import { Injectable } from '@angular/core';
import { Headers, Response, URLSearchParams } from '@angular/http'; //Http in angular 2 resturns observable while in angular 1 it returns promise.
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class UsersService {

    private headers = new Headers({'Content-Type': 'application/json'});
    private url = 'http://localhost:8181/api/users';  // URL to web api

    // Inject private classes via constructor
    constructor (private _http: HttpClient){}

    /**
     * Get the list of accounts
     * @param searchString : String
     */
    getList(searchString : String) : Observable<any> {
        let params: URLSearchParams = new URLSearchParams();
        searchString = searchString || '';

        return this._http.get(this.url + '?' + searchString);//Todo: Use return type http.get<MyResponseType>
    }

    /**
     * Get user by id
     * @param id : String
     */
    getById(id : String) : Observable<any> {
        id = id || '';

        return this._http.get(this.url + "/" + id);
    }

    /**
     * Update user
     * @param id : String
     * @param body : any
     */
    update(id : String, body : any) : Observable<any> {

        return this._http.patch(this.url + "/" + id, body);
    }

    /**
     * Add new user
     * @param body : any
     */
    save( body : any) : Observable<any> {
        return this._http.post(this.url, body);
    }

    /**
     * Delete user
     * @param id : String
     */
    delete(id : String) : Observable<any> {
          return this._http.delete(this.url + "/" + id);
    }
}
