/**
 * Header component
 * @author : Jesus Lising <jess.lising@gmail.com>
 */

import {Component, OnInit } from '@angular/core';
import { AppGlobal } from '../../app.global';

@Component({
	selector : 'app-header',
	templateUrl :'./header.component.html'
})
export class HeaderComponent {
    // Inject private classes via constructor
    constructor ( public _appGlobal : AppGlobal ){}
}
