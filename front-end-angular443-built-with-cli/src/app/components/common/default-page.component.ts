/**
 * Default page component
 * @author : Jesus Lising <jess.lising@gmail.com>
 */

import {Component } from '@angular/core';
import { Router } from '@angular/router';
import { AppGlobal } from '../../app.global';

@Component({
	selector : 'default-page',
	templateUrl :'./default-page.component.html'
})
export class DefaultPageComponent {

   // Inject private classes via constructor
   constructor(public _appGlobal : AppGlobal, private _router : Router){}

   /**
    * Redirect to login
    */
   localLogin(){
        this._router.navigate(['/login']);
   }
}
