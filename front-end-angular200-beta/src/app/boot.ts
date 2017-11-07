import { bootstrap } from 'angular2/platform/browser';
import { ROUTER_PROVIDERS } from 'angular2/router';
import { LocationStrategy, HashLocationStrategy } from 'angular2/platform/common';
import { AppComponent } from './components/app.component';
import { provide } from 'angular2/core';
import { HTTP_PROVIDERS } from "angular2/http";

bootstrap(AppComponent, [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  provide(LocationStrategy, {useClass: HashLocationStrategy}) //Use hash(#) format because slash won't work e.g: /accounts is 404
]);

