import { Injectable } from '@angular/core';
import { CoreService } from './core.service';
import { environment } from 'src/environments/environment';
import { HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class AuthenticationService {
  public fullBaseUrl = `${environment.baseUrl}/${environment.apiPath}`;

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
  };

  constructor(private core: CoreService) {}

  /** POST: Login to account and assume your profile */
  login(username: any, password: any): Promise<any> {
    // if (this.core.userHasPermission("SRAUTHCODE")) { // For when policies are to be enforced
    if (true) {
      let url = `${this.fullBaseUrl}/assumeUserProfile`;

      let params = new HttpParams();

      // These parameters are always passed
      if (!this.core.isEmptyOrNull(username)) {
        params = params.set('userName', username);
      }

      if (!this.core.isEmptyOrNull(password)) {
        params = params.set('password', password);
      }

      //caution: passing the options invalidates the form data
      return this.core.makeRemoteRequest(url, 'post', params, this.httpOptions);
    } else {
      return this.core.fakePromise(
        'error',
        "Sorry, you're not allowed to do this!"
      );
    }
  }
}
