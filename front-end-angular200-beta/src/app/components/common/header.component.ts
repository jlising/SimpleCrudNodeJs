import {Component} from 'angular2/core';
import {ROUTER_DIRECTIVES} from "angular2/router";

@Component({
	selector : 'app-header',
	templateUrl :'app/components/common/header.component.html',
    directives: [ ROUTER_DIRECTIVES ]
})
export class HeaderComponent {}