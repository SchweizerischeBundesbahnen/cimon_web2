/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2017.
 *
 * ESTA WebJS: Unit-test für den TokenAppendInterceptor
 *
 * @author u218609 (Kevin Kreuzer)
 * @version: 5.1.0
 * @since 22.11.2017, 2017.
 */
import {TokenAppendInterceptor} from './tokenAppend.interceptor';
import {AuthService} from 'esta-webjs-extensions';
import {HttpHandler, HttpHeaders, HttpRequest} from '@angular/common/http';
import {NEVER} from 'rxjs/index';

describe('TokenAppendInterceptor', () => {

    let sut;
    let authService;

    beforeEach(() => {
        authService = jasmine.createSpyObj<AuthService>('authService', ['getAuthHeader', 'login']);
        sut = new TokenAppendInterceptor(authService);
    });

    describe('intercept', () => {

        it('must clone the request and add the authHeaders', () => {
            // given
            const request = jasmine.createSpyObj<HttpRequest<any>>('request', ['clone']);
            const next = jasmine.createSpyObj<HttpHandler>('next', ['handle']);
            const authToken = '324445-231456-23456-12345';
            const authHeader = new HttpHeaders().set('Authorization', `Bearer ${authToken}`);

            next.handle.and.returnValue(NEVER);
            authService.getAuthHeader.and.returnValue(authHeader);

            // when
            sut.intercept(request, next);

            // then
            expect(request.clone).toHaveBeenCalledWith({
                headers: authHeader
            });
        });
    });
});
