import { Injectable } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';

import { AuthService } from './components/auth/auth.service';
import { Router } from '@angular/router';
import { ToasterService } from 'angular2-toaster';

@Injectable()
export class AppGlobal {
    public userSession : any = {};

    // Inject private classes via constructor
    constructor(private _authService : AuthService, private _router : Router, private _toasterService : ToasterService){
        //Initialize userSession. This code is needed to persists the data in the session. You can also do this in Auth guard!
        this.userSession = JSON.parse(localStorage.getItem("userSession"));
    }

    /**
     * Login event attached to the login button. In globals in case we put login anywhere else.
     * @param email : String
     * @param password : String
     */
     public login(email : String, password : String){
       this._authService.login({email : email,
                                password : password})
                   .subscribe(
                        response => {
                            //On success, store login session then redirect to accounts page
                            this.userSession = { isAuthenticated : true,  user : response };

                            //Strip password from response
                            delete response.password;

                            //Put in local storage to persists
                            localStorage.setItem("userSession",JSON.stringify({
                                                                                    isAuthenticated : true,
                                                                                    user : response
                                                                                }));

                            this._router.navigate(['/accounts']);
                        },
                        (err : HttpErrorResponse) => {
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
      * Terminate login session
      */
     public logout(){
         this._authService.logout().subscribe(
                                response => {
                                    //On success, redirect to accounts page
                                    localStorage.removeItem("userSession");
                                    this.userSession = {};
                                    this._router.navigate(['/']);
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
