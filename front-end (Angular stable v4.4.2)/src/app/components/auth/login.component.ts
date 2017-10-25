import { Component, OnInit } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from './auth.service';
import { Router } from '@angular/router';

@Component({
    selector: 'login',
    templateUrl : './app/components/auth/login.component.html'
})

export class LoginComponent  implements OnInit {
    public pageParams = {
         loginForm : {email : '', password : ''}
    };

    // Inject private classes via constructor
    constructor (private _authService : AuthService,  private _router : Router){}

    //Apply definition since we implemented OnInit
    ngOnInit() {}

    /**
     * Login event attached to the login button
     */
     public login(){
       this._authService.login({email : this.pageParams.loginForm.email,
                                password : this.pageParams.loginForm.password})
                   .subscribe(
                        response => {
                            //On success, redirect to accounts page
                            this._router.navigate(['/accounts']);
                        },
                        (err: HttpErrorResponse) => {
                          if (err.error instanceof Error) {
                            console.log("Client-side error occured.");
                          } else {
                            console.log("Server-side error occured.");
                          }
                        }
                  );
     }
}