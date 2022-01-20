/**
 * The Error Interceptor intercepts http responses from the api to check if there were any errors. If there is a 401 Unauthorized response
 * the user is automatically logged out of the application, all other errors are re-thrown to be caught by the calling service so an alert
 * can be displayed to the user.
 */

import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

import { CoreService } from '../services/core.service';
import { AppError } from '../models/error.model';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  private appError = new AppError();
  constructor(private core: CoreService) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      tap({
        next: (value) => {},
        error: (err) => {
          this.appError = err.error;
          console.error('Error intercept: ', err);
          if (err.status === 401) {
            // auto logout if 401 response returned from api
            this.core.logout();
            location.reload();
          }

          if (err.error instanceof ProgressEvent) {
            console.log('Progress event found');
            this.core.errorToast(
              'Network error. Please check your connection and try again later.'
            );
          } else {
            const errorType = this.core.getErrorType(
              this.appError.errors[0].detail
            );
            if (errorType !== undefined) {
              this.core.errorToast(errorType.description);
            } else {
              this.core.errorToast('Network error. Please contact support.');
            }
          }
        },
      })
    );
  }
}
