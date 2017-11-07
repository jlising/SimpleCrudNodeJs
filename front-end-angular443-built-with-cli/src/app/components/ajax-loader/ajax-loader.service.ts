import { Injectable } from '@angular/core';
import { LoaderState } from './loader';

//Todo: Need to fix. This line loads all rx modules
import * as Rx from "rxjs";

@Injectable()
export class AjaxLoaderService {

    // Create subject
    public loaderSubject: Rx.Subject<LoaderState> = new Rx.Subject<LoaderState>();

    //Create state variable as observable
    loaderState = this.loaderSubject.asObservable();

    // Inject private classes via constructor
    constructor() {}

    /**
     * Show loader
     */
    show() {
        this.loaderSubject.next(<LoaderState>{show: true});
    }

    /**
     * Hide loader
     */
    hide() {
        this.loaderSubject.next(<LoaderState>{show: false});
    }
}
