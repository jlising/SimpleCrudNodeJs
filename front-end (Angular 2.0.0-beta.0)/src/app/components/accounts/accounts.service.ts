import {Injectable} from 'angular2/core';
import { Http, Response, URLSearchParams } from 'angular2/http'; //Http in angular 2 resturns observable while in angular 1 it returns promise.
import { List } from 'immutable';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Rx';

import { HTTP_PROVIDERS } from "angular2/http";

@Injectable()
export class AccountsService {
    constructor (private _http: Http){}

    getList(searchString: String) : Observable<any> {
        let params: URLSearchParams = new URLSearchParams();
        searchString = searchString || '';

        let url = 'http://localhost:8181/api/accounts?' + searchString;

        return this._http.get(url).map((res:Response) => res.json());
    }
}