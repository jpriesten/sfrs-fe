import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root',
})
export class IdapService {
  public fullBaseUrl = `${environment.baseUrl}/${environment.apiPath}`;

  public httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-stms-service': 'ida',
    }),
  };

  constructor(private core: CoreService) {}

  /** POST: Fetch account summary information for the dashboard*/
  getAccountSummary(): Promise<any> {
    // if (this.core.userHasPermission("SRAUTHCODE")) { // For when policies are to be enforced
    if (true) {
      let url = `${this.fullBaseUrl}/getAccountSummary`;

      let params = new HttpParams();

      // These parameters are always passed
      // if (!this.core.isEmptyOrNull(username)) {
      //   params = params.set('userName', username);
      // }

      // if (!this.core.isEmptyOrNull(password)) {
      //   params = params.set('password', password);
      // }

      //caution: passing the options invalidates the form data
      return this.core.makeRemoteRequest(
        url,
        'post',
        params,
        this.core.httpOptions.idapHeaders
      );
    } else {
      return this.core.fakePromise(
        'error',
        "Sorry, you're not allowed to do this!"
      );
    }
  }

  /**
   * IDAP Group endpoints
   * @param {string}
   */
}
