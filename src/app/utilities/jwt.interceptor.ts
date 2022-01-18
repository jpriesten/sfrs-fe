/**
 * The JWT Interceptor intercepts http requests from the application to add a JWT auth token to the
 * Authorization header if the user is logged in.
 */

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    let currentUser = JSON.parse(localStorage.getItem('currentUser')!);
    console.log('User: ', currentUser);
    if (currentUser && currentUser.data.credentials.access) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.data.credentials.access.sessionToken}`,
        },
      });
    }

    return next.handle(request);
  }
}
