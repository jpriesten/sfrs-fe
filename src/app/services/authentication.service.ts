import { Injectable } from '@angular/core';
import { CoreService } from './core.service';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public fullBaseUrl = `${environment.baseUrl}/${environment.apiPath}`;

  constructor(private core: CoreService) {}

  /** POST: Login to account and assume your profile */
  login(username: any, password: any): Promise<any> {
    // if (this.core.userHasPermission("SRAUTHCODE")) { // For when policies are to be enforced
    if (true) {
      let url = `${this.fullBaseUrl}/assumeUserProfile`;

      let body: any = {};

      // These parameters are always passed
      if (!this.core.isEmptyOrNull(username)) {
        body.userName = username;
      }

      if (!this.core.isEmptyOrNull(password)) {
        body.password = password;
      }

      //caution: passing the options invalidates the form data
      return this.core.makeRemoteRequest(url, 'post', body);
    } else {
      return this.core.fakePromise(
        'error',
        "Sorry, you're not allowed to do this!"
      );
    }
  }
}
