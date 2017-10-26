/**
 * The main module
 * @author : Jesus Lising <jess.lising@gmail.com>
 */

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app.routing';
import { PaginationModule } from 'ngx-bootstrap';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToasterModule, ToasterService } from 'angular2-toaster';

// Templates
import { HeaderComponent } from './components/common/header.component';
import { FooterComponent } from './components/common/footer.component';
import { PageNotFoundComponent } from './components/common/page-not-found.component';
import { DefaultPageComponent } from './components/common/default-page.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { UsersComponent } from './components/users/users.component';
import { LoginComponent } from './components/auth/login.component';

// Services
import { AccountsService } from './components/accounts/accounts.service';
import { UsersService } from './components/users/users.service';
import { MyHttpInterceptor } from './components/common/my.http.interceptor';

import { AuthService } from './components/auth/auth.service';
import { AuthGuard } from './components/auth/auth-guard.service';

import { AppGlobal } from './components/app.global';
import { AppComponent } from './components/app.component';

@NgModule({
  imports: [
        BrowserModule, //Configure browser-based application to transition from a server-rendered app. If not imported, ngIf, routings won't work.
        BrowserAnimationsModule,
        AppRoutingModule, //Routing
        HttpClientModule,
        FormsModule,
        PaginationModule.forRoot(),
        ToasterModule
  ],

  declarations: [
    HeaderComponent,
    FooterComponent,
    PageNotFoundComponent,
    DefaultPageComponent,
    AccountsComponent,
    UsersComponent,
    LoginComponent,
    AppComponent
  ],
  providers: [  AppGlobal, AccountsService, UsersService, AuthGuard, AuthService, ToasterService,
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