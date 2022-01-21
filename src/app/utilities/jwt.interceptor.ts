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
import { CoreService } from '../services/core.service';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {
  constructor(private core: CoreService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    // add authorization header with jwt token if available
    // console.log('User intercept: ', this.core.user);
    if (this.core.user !== null) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${this.core.user.data.credentials.access.sessionToken}`,
        },
      });
    }

    return next.handle(request);
  }
}
