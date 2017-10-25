import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing';
import { PaginationModule } from 'ngx-bootstrap';

// Templates
import { HeaderComponent } from './components/common/header.component';
import { FooterComponent } from './components/common/footer.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { UsersComponent } from './components/users/users.component';
import { LoginComponent } from './components/auth/login.component';

// Services
import { AccountsService } from './components/accounts/accounts.service';
import { UsersService } from './components/users/users.service';
import { MyHttpInterceptor } from './components/common/my.http.interceptor';

import { AuthService } from './components/auth/auth.service';
import { AuthGuard } from './components/auth/auth-guard.service';

import { AppComponent } from './components/app.component';

@NgModule({
  imports: [
        BrowserModule, //Configure browser-based application to transition from a server-rendered app. If not imported, ngIf, routings won't work.
        AppRoutingModule, //Routing
        HttpClientModule,
        FormsModule,
        PaginationModule.forRoot()
  ],

  declarations: [
    HeaderComponent,
    FooterComponent,
    AccountsComponent,
    UsersComponent,
    LoginComponent,
    AppComponent
  ],
  providers: [  AccountsService, UsersService, AuthGuard, AuthService,
				{ provide: LocationStrategy, useClass: HashLocationStrategy},
                {
                        provide: HTTP_INTERCEPTORS,
                        useClass: MyHttpInterceptor,
                        multi: true,
                }
			 ],
  bootstrap: [ AppComponent ]
})

export class AppModule {}