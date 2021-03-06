import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './components/accounts/accounts.component';
import { UsersComponent } from './components/users/users.component';
import { AuthComponent } from './components/auth/auth.component';
import { AuthGuardService } from './components/auth/auth-guard.service';
import { PageNotFoundComponent } from './components/common/page-not-found.component';
import { DefaultPageComponent } from './components/common/default-page.component';

const routes: Routes = [
{ path: '', component: DefaultPageComponent, pathMatch: 'full' },
{ path: 'accounts',  component: AccountsComponent, canActivate: [AuthGuardService], pathMatch: 'full' }, // match full in searching path so accounts/:id is not included
{ path: 'users',  component: UsersComponent, canActivate: [AuthGuardService], pathMatch: 'full'  },
{ path: 'login',  component: AuthComponent},
{ path: '**', component: PageNotFoundComponent}
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
