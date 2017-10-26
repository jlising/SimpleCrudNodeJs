import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'my-app',
    templateUrl: '/app/components/app.component.html' //To use relative path, change to commonJs then use module.id
})

export class AppComponent {

    // Inject private classes via constructor
    constructor(){}

    //Apply definition since we implemented OnInit
    ngOnInit() {}
}
