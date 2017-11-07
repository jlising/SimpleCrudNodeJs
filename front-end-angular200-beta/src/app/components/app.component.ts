import {Component} from 'angular2/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import { HeaderComponent } from './common/header.component';
import { FooterComponent } from './common/footer.component';

import { AccountsComponent } from './accounts/accounts.component';
import { UsersComponent } from './users/users.component';

@Component({
    selector: 'my-app',
    templateUrl: 'app/components/app.component.html',
    directives: [ ROUTER_DIRECTIVES, HeaderComponent, FooterComponent ]
})

@RouteConfig([
    {path: '/accounts', name: 'Accounts', component: AccountsComponent, useAsDefault: true},
    {path: '/users', name: 'Users', component: UsersComponent},
    //{path: '/detail/:id', name: 'HeroDetail', component: HeroDetailComponent}
])

export class AppComponent {}

export const partialRootPageComponents = [HeaderComponent, FooterComponent];
