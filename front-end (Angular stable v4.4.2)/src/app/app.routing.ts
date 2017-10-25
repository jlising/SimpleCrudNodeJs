import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AccountsComponent } from './components/accounts/accounts.component';
import { UsersComponent } from './components/users/users.component';
import { LoginComponent } from './components/auth/login.component';
import { AuthGuard } from './components/auth/auth-guard.service';

const routes: Routes = [
{ path: '', redirectTo: '/accounts', pathMatch: 'full' },
{ path: 'accounts',  component: AccountsComponent, canActivate: [AuthGuard] },
{ path: 'users',  component: UsersComponent, canActivate: [AuthGuard]  },
{ path: 'login',  component: LoginComponent, pathMatch: 'full' }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}