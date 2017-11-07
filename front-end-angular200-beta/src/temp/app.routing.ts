import { NgModule } from '@angular/core';
import {RouteConfig, ROUTER_DIRECTIVES} from 'angular2/router';
import { AccountsComponent } from './components/accounts/accounts.component';
import { UsersComponent } from './components/users/users.component';

const routes: Routes = [
                        { path: '', pathMatch: 'full', redirectTo: 'accounts' },
                        { path: 'accounts', component: AccountsComponent },
                        { path: 'users', component: UsersComponent }
                        ];

@NgModule({
   imports: [RouterModule.forRoot(routes, { enableTracing: false, useHash: true })],
   exports: [RouterModule],
 })

export class AppRoutingModule { }

export const routingComponents = [AccountsComponent, UsersComponent]; // Export the components so they can be accessed outside.