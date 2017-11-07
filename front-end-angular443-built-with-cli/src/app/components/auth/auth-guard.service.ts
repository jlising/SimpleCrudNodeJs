import { Injectable }     from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

import { HttpErrorResponse } from '@angular/common/http';
import { AuthService }  from './auth.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import { AppGlobal } from '../../app.global';

@Injectable()
export class AuthGuard implements CanActivate {

    // Inject private classes via constructor
    constructor(private _authService: AuthService, private _router: Router, private _appGlobal : AppGlobal, private _toasterService : ToasterService) {}

    /**
     * Check the route if can be activated. See route settings in app.routing.ts
     * @param route : ActivatedRouteSnapshot
     * @param state : RouterStateSnapshot
     */
    canActivate(route : ActivatedRouteSnapshot, state : RouterStateSnapshot): Observable<boolean> {

        return this._authService.ping().map(response => { // Map is used to return this http request as Observable
                 if(this._appGlobal.userSession.user == undefined || this._appGlobal.userSession.user == null){
                    // View login page if not logged in
                    this._router.navigate(['/login']);
                    return false;
                 }else{
                    return true;
                 }
               }).catch(err  => {
                 console.log(err)
                 this._toasterService.pop('error', '', err.status + ' ' + err.statusText);
                 //console.log('Unauthorized access. Redirecting to login page.');
                 this._appGlobal.userSession = {}; // Empty userSession in case not empty due to simultaneous login and the recent session logs out
                 // View login page if not logged in
                 this._router.navigate(['/login']);

                 return Observable.throw(err);
                });
    }
}
