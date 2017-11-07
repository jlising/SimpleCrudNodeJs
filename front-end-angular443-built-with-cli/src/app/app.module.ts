import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Third party components
import { ToasterModule, ToasterService } from 'angular2-toaster';
import { PaginationModule } from 'ngx-bootstrap';

//App components
import { AppGlobal } from './app.global';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AccountsComponent } from './components/accounts/accounts.component';
import { AuthComponent } from './components/auth/auth.component';
import { UsersComponent } from './components/users/users.component';
import { AjaxLoaderComponent } from './components/ajax-loader/ajax-loader.component';

// Templates
import { HeaderComponent } from './components/common/header.component';
import { FooterComponent } from './components/common/footer.component';
import { PageNotFoundComponent } from './components/common/page-not-found.component';
import { DefaultPageComponent } from './components/common/default-page.component';

// Services
import { AccountsService } from './components/accounts/accounts.service';
import { UsersService } from './components/users/users.service';
import { MyHttpInterceptor } from './components/common/my.http.interceptor';

import { AuthService } from './components/auth/auth.service';
import { AjaxLoaderService } from './components/ajax-loader/ajax-loader.service';
import { AuthGuardService } from './components/auth/auth-guard.service';

@NgModule({
  declarations: [
   HeaderComponent,
   FooterComponent,
   PageNotFoundComponent,
   DefaultPageComponent,
   AccountsComponent,
   UsersComponent,
   AuthComponent,
   AjaxLoaderComponent,
   AppComponent
  ],
  imports: [
     BrowserModule, //Configure browser-based application to transition from a server-rendered app. If not imported, ngIf, routings won't work.
     BrowserAnimationsModule,
     AppRoutingModule, //Routing
     HttpClientModule,
     FormsModule,
     PaginationModule.forRoot(),
     ToasterModule
  ],
  providers: [  AppGlobal, AccountsService, UsersService, AuthGuardService, AuthService, ToasterService, AjaxLoaderService,
             				{ provide: LocationStrategy, useClass: HashLocationStrategy},
                             {
                                     provide: HTTP_INTERCEPTORS,
                                     useClass: MyHttpInterceptor,
                                     multi: true,
                             }
             			 ],
  bootstrap: [AppComponent]
})
export class AppModule { }
