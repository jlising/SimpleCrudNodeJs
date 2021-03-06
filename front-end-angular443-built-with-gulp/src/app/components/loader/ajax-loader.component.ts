/**
 * Ajax loader component
 * Reference: https://github.com/ivanderbu2/angular-redux/
 * @author : Jesus Lising <jess.lising@gmail.com>
 */
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

import { AjaxLoaderService } from './ajax-loader.service';
import { LoaderState } from './loader';

@Component({
    selector: 'ajax-loader',
    templateUrl: './app/components/loader/ajax-loader.component.html'
})
export class AjaxLoaderComponent implements OnInit {

    public show = false;
    private subscription: Subscription;

    // Inject private classes via constructor
    constructor(private _ajaxLoaderService: AjaxLoaderService) {}

    // Subscribe to loaderState (see AjaxLoaderService defined as observable)
    ngOnInit() {
        this.subscription = this._ajaxLoaderService.loaderState
            .subscribe((state: LoaderState) => {
                // Pass on the LoaderState.show value on every change
                this.show = state.show;
            });
    }

    ngOnDestroy() {
        // Destroy subscription
        this.subscription.unsubscribe();
    }
}