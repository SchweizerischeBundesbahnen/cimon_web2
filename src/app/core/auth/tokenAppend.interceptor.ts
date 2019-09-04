/**
 * Copyright (C) Schweizerische Bundesbahnen SBB, 2017.
 *
 * ESTA WebJS: Interceptor für HTTP Requests
 *
 * @author u218609 (Kevin Kreuzer)
 * @version: 5.1.0
 * @since 22.11.2017, 2017.
 */
import {Injectable} from '@angular/core';
import {AuthService} from 'esta-webjs-extensions';
import {Observable} from 'rxjs';
import {HttpEvent, HttpHandler, HttpInterceptor, HttpRequest} from '@angular/common/http';

@Injectable()
export class TokenAppendInterceptor implements HttpInterceptor {

    constructor(private authService: AuthService) {
    }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        request = request.clone({headers: this.authService.getAuthHeader()});
        return next.handle(request);
    }
}

