/**
 * Http interceptor
 * Reference: https://ryanchenkie.com/angular-authentication-using-the-http-client-and-http-interceptors
 * @author : Jesus Lising <jess.lising@gmail.com>
 */

import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';
import { AjaxLoaderService } from '../ajax-loader/ajax-loader.service';

import { Observable } from 'rxjs/Observable';
import 'rxjs/observable/throw';
import 'rxjs/operator/catch';
import 'rxjs/add/operator/do';

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
    private _router : Router;

    // Inject private classes via constructor
    constructor(private _toasterService : ToasterService, private _ajaxLoaderService: AjaxLoaderService){}

    /**
     * Intercept requests
     * @param req : HttpRequest<any>
     * @param  next: HttpHandler
     */
    intercept(req : HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const started = Date.now();

        //console.log(req);
        const changedReq = req.clone({headers: req.headers.set('My-Header', 'MyHeaderValue')});
        this._showLoader();

        return next.handle(changedReq)
          .do((event : HttpEvent <any>) => {
            if (event instanceof HttpResponse) {
              const elapsed = Date.now() - started;
              //console.log(`Response for ${req.urlWithParams} took ${elapsed} ms.`);

              this._hideLoader();
            }
          }, (err: any) => {
                 if (err instanceof HttpErrorResponse) {
                     this._hideLoader();
                     // Another way to trap not logged in user in case path or request is not captured by auth guard. See pathMatch attribute in routings
                     if(err.status == 403){
                        //this._toasterService.pop('error', '', err.status + ' ' + err.statusText);
                        //console.log("Unauthorized access. Redirecting to login page.");

                        //this._router.navigate(['/login']); // Doesn't work
                        window.location.hash = '#/login';
                     }
                 }

                 //return Observable.throw(err)
          });
    }

    private _showLoader(): void {
        this._ajaxLoaderService.show();
    }

    private _hideLoader(): void {
        this._ajaxLoaderService.hide();
}
}
