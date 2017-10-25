import { Injectable } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';

//Reference: https://ryanchenkie.com/angular-authentication-using-the-http-client-and-http-interceptors

@Injectable()
export class MyHttpInterceptor implements HttpInterceptor {
    private _router : Router;

    /**
     * Intercept requests
     * @param req : HttpRequest<any>
     * @param  next: HttpHandler
     */
    intercept(req : HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const started = Date.now();

        console.log(req);
        const changedReq = req.clone({headers: req.headers.set('My-Header', 'MyHeaderValue')});

        return next.handle(changedReq)
          .do((event : HttpEvent <any>) => {
            if (event instanceof HttpResponse) {
              const elapsed = Date.now() - started;
              console.log(`Response for ${req.urlWithParams} took ${elapsed} ms.`);
            }
          }, (err: any) => {
                 if (err instanceof HttpErrorResponse) {
                     // Another way to trap not logged in user in case auth guard is disabled
                     if(err.status == 403){
                        console.log("Unauthorized access. Redirecting to login page.");

                        //this._router.navigate(['/login']); // Doesn't work
                        window.location.hash = '#/login';
                     }
                 }

                 return Observable.throw(err)
          });
    }
}