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
   */

  /** POST: Fetch groups
   * @param {number} maxItems Maximum number of items per page
   */
  getGroups(maxItems: number = 10): Promise<any> {
    // if (this.core.userHasPermission("SRAUTHCODE")) { // For when policies are to be enforced
    if (true) {
      let url = `${this.fullBaseUrl}/listGroups`;

      let params = new HttpParams();

      // These parameters are always passed
      params = params.set('maxItems', maxItems);

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

  /** POST: create a group
   * @param {string} groupName The name of the group
   */
  createGroup(groupName: string): Promise<any> {
    // if (this.core.userHasPermission("SRAUTHCODE")) { // For when policies are to be enforced
    if (true) {
      let url = `${this.fullBaseUrl}/createGroup`;

      let params = new HttpParams();

      // These parameters are always passed
      if (!this.core.isEmptyOrNull(groupName))
        params = params.set('groupName', groupName);

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
}
