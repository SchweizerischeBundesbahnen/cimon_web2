/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2019.
 */
import {Component} from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html'
})
export class AppComponent {

    constructor(translate: TranslateService) {
        translate.setDefaultLang('de');
        translate.use('de');
    }
}
