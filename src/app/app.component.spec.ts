/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2017.
 *
 * ESTA WebJS: App Component
 *
 * @author u218609 (Kevin Kreuzer)
 * @version: 2.0.0
 * @since 10.05.2017, 2017.
 */
import {async, inject, TestBed} from '@angular/core/testing';
import {RouterModule} from '@angular/router';
import {TranslateService} from '@ngx-translate/core';
import {AppComponent} from './app.component';
import {CoreModule} from './core/core.module';
import {Observable, of} from 'rxjs';
import {AuthService} from 'esta-webjs-extensions';
import {KeycloakProfile} from 'keycloak-js';

describe('AppComponent', () => {
    beforeEach(() => {

        class TranslationMock {
            public setDefaultLang() {
            }

            public use() {
            }
        }

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


        TestBed.configureTestingModule({
            imports: [
                CoreModule,
                RouterModule.forRoot([], {useHash: true})
            ],
            declarations: [
                AppComponent
            ],
            providers: [
                {provide: TranslateService, useClass: TranslationMock},
                {provide: AuthService, useClass: MockAuthService}
            ]
        });
        TestBed.compileComponents();
    });

    it('should create the app', async(() => {
        const fixture = TestBed.createComponent(AppComponent);
        const app = fixture.debugElement.componentInstance;
        expect(app).toBeTruthy();
    }));

    it('should call the set and use of the Translationservice',
        inject([TranslateService], (translationService: TranslateService) => {
            // given
            spyOn(translationService, 'use');
            spyOn(translationService, 'setDefaultLang');
            // when
            TestBed.createComponent(AppComponent);
            // then
            expect(translationService.use).toHaveBeenCalledWith('de');
            expect(translationService.setDefaultLang).toHaveBeenCalledWith('de');
        })
    );
});
