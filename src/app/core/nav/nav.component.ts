/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2019.
 */
import {Component} from '@angular/core';
import {AuthService} from 'esta-webjs-extensions';
import {Observable} from 'rxjs';
import {KeycloakProfile} from 'keycloak-js';

interface NavItem {
    displayName: string;
    routerLink: string;
}

@Component({
    selector: 'app-navbar',
    templateUrl: './nav.component.html'
})
export class NavComponent {

    public navItems: Array<NavItem> = [
        {displayName: 'Dashboard', routerLink: 'dashboard'}
    ];

    public userInfo: Observable<KeycloakProfile>;

    public isCollapsed = true;

    constructor(public authService: AuthService) {
        this.userInfo = this.authService.getUserInfo();
    }

}
