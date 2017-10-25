import { Injectable }     from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

import { HttpErrorResponse } from '@angular/common/http';
import { AuthService }  from './auth.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private _authService: AuthService, private _router: Router) {}

    /**
     * Check the route if can be activated. See route settings in app.routing.ts
     * @param route : ActivatedRouteSnapshot
     * @param state : RouterStateSnapshot
     */
    canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot): Observable<boolean> {

        return this._authService.ping().map(response => { // Map is used to return this http request as Observable
                  return true;
               }).catch(error => {
                 console.log('Unauthorized access. Redirecting to login page.');

                 // View login page if not logged in
                 this._router.navigate(['/login']);

                 return Observable.throw(error);
                });
    }
}