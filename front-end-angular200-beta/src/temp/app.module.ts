import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule }   from '@angular/router';

import { AppComponent, partialRootPageComponents }  from './components/app.component';
import { AppRoutingModule, routingComponents } from './app.routing';

@NgModule({
  imports:      [ BrowserModule, AppRoutingModule ],
  declarations: [ AppComponent, partialRootPageComponents, routingComponents ],
  bootstrap:    [ AppComponent ]
})

/*
@RouteConfig([
    { path: '', pathMatch: 'full', redirectTo: 'accounts' },
    { path: 'accounts', component: AccountsComponent },
    { path: 'users', component: UsersComponent }
])
*/
export class AppModule { }