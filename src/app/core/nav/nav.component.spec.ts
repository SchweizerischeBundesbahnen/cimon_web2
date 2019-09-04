/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2019.
 */
import {async, ComponentFixture, TestBed} from '@angular/core/testing';
import {RouterModule} from '@angular/router';
import {AuthService} from 'esta-webjs-extensions';
import {KeycloakProfile} from 'keycloak-js';

import {NavComponent} from './nav.component';
import {Observable, of} from 'rxjs';

describe('NavbarComponent', () => {
    let component: NavComponent;
    let fixture: ComponentFixture<NavComponent>;

    class MockAuthService {
        public authenticated() {
            return true;
        }

        public getUserInfo(): Observable<KeycloakProfile> {
            return of({
                id: 'user',
                username: 'test',
                email: 'test@xx.com',
                firstName: 'Test',
                lastName: 'User',
                enabled: true,
                emailVerified: true,
                totp: true,
                createdTimestamp: 1
            });
        }
    }

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [RouterModule.forRoot([], {useHash: true})],
            providers: [{provide: AuthService, useClass: MockAuthService}],
            declarations: [NavComponent]
        }).compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(NavComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it(`should declare navItems for home, about and theme`, () => {
        const expectedNavItems = [
            {displayName: 'Home', routerLink: 'home'},
            {displayName: 'About', routerLink: 'about'},
            {displayName: 'Theme', routerLink: 'theme'}
        ];
        expect(expectedNavItems).toEqual(component.navItems);
    });
});
