/**
 * Routing module
 * @author : Jesus Lising <jess.lising@gmail.com>
 */

import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './components/accounts/accounts.component';
import { UsersComponent } from './components/users/users.component';
import { LoginComponent } from './components/auth/login.component';
import { AuthGuard } from './components/auth/auth-guard.service';
import { PageNotFoundComponent } from './components/common/page-not-found.component';
import { DefaultPageComponent } from './components/common/default-page.component';

const routes: Routes = [
{ path: '', component: DefaultPageComponent, pathMatch: 'full' },
{ path: 'accounts',  component: AccountsComponent, canActivate: [AuthGuard], pathMatch: 'full' }, // match full in searching path so accounts/:id is not included
{ path: 'users',  component: UsersComponent, canActivate: [AuthGuard], pathMatch: 'full'  },
{ path: 'login',  component: LoginComponent},
{ path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}