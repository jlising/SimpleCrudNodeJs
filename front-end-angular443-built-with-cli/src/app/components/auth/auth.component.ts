import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';

import { AppGlobal } from '../../app.global';
import { AuthService } from './auth.service';

@Component({
    selector: 'app-auth',
    templateUrl : './auth.component.html',
    encapsulation: ViewEncapsulation.None
})

export class AuthComponent  implements OnInit {
    public pageParams = {
         loginForm : {email : 'lisingj@ph.ibm.com', password : '1234567'}
    };

    // Inject private classes via constructor
    constructor (public _appGlobal : AppGlobal, private _authService : AuthService,  private _router : Router){}

    //Apply definition since we implemented OnInit
    ngOnInit() {}

}
