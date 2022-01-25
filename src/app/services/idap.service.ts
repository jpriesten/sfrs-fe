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

  /** POST: Fetch group details
   * @param {string} groupName Name of the group
   * @param {number} maxItems Maximum number of user items per page
   * @param {string} marker Where to stop and start when fetching pages
   */
  getGroup(
    groupName: string | null,
    maxItems: number = 10,
    marker?: string
  ): Promise<any> {
    // if (this.core.userHasPermission("SRAUTHCODE")) { // For when policies are to be enforced
    if (true) {
      let url = `${this.fullBaseUrl}/getGroup`;

      let params = new HttpParams();

      // These parameters are always passed
      if (!this.core.isEmptyOrNull(groupName))
        params = params.set('groupName', groupName!);

      params = params.set('maxItems', maxItems!);

      if (!this.core.isEmptyOrNull(marker))
        params = params.set('marker', marker!);

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

  /** POST: Add a user to a group
   * @param {string} groupName The name of the group
   * @param {string} userName The name of the user
   */
  addGroupUser(groupName: string, userName: string): Promise<any> {
    // if (this.core.userHasPermission("SRAUTHCODE")) { // For when policies are to be enforced
    if (true) {
      let url = `${this.fullBaseUrl}/addUserToGroup`;

      let params = new HttpParams();

      // These parameters are always passed
      if (!this.core.isEmptyOrNull(groupName))
        params = params.set('groupName', groupName);

      if (!this.core.isEmptyOrNull(userName))
        params = params.set('userName', userName);

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
   * IDAP User endpoints
   */

  /** POST: Fetch users
   * @param {number} maxItems Maximum number of items per page
   */
  getUsers(maxItems: number = 10): Promise<any> {
    // if (this.core.userHasPermission("SRAUTHCODE")) { // For when policies are to be enforced
    if (true) {
      let url = `${this.fullBaseUrl}/listUsers`;

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

  /** POST: Fetch user details
   * @param {string} userName Username of the user
   */
  getUser(userName: string | null): Promise<any> {
    // if (this.core.userHasPermission("SRAUTHCODE")) { // For when policies are to be enforced
    if (true) {
      let url = `${this.fullBaseUrl}/getUser`;

      let params = new HttpParams();

      // These parameters are always passed
      if (!this.core.isEmptyOrNull(userName))
        params = params.set('userName', userName!);

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

  /** POST: Fetch user groups
   * @param {string} userName Name of the user
   * @param {number} maxItems Maximum number of user items per page
   * @param {string} marker Where to stop and start when fetching pages
   */
  getUserGroups(
    userName: string | null,
    maxItems: number = 10,
    marker?: string
  ): Promise<any> {
    // if (this.core.userHasPermission("SRAUTHCODE")) { // For when policies are to be enforced
    if (true) {
      let url = `${this.fullBaseUrl}/listGroupsForUser`;

      let params = new HttpParams();

      // These parameters are always passed
      if (!this.core.isEmptyOrNull(userName))
        params = params.set('userName', userName!);

      params = params.set('maxItems', maxItems!);

      if (!this.core.isEmptyOrNull(marker))
        params = params.set('marker', marker!);

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

  /** POST: create a user details
   * @param {string} userName The name of the user
   * @param {array[]} tags List of tags
   */
  createUser(userName: string, tags: string): Promise<any> {
    // if (this.core.userHasPermission("SRAUTHCODE")) { // For when policies are to be enforced
    if (true) {
      let url = `${this.fullBaseUrl}/createUser`;

      let params = new HttpParams();

      // These parameters are always passed
      if (!this.core.isEmptyOrNull(userName))
        params = params.set('userName', userName);

      if (!this.core.isEmptyOrNull(tags))
        params = params.set('tags', JSON.stringify(tags));

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

  /** POST: create a user login profile
   * @param {string} userName The name of the user
   * @param {string} password Login password
   * @param {boolean} requirePasswordReset Determines if user should change password on login
   */
  createLoginProfile(
    userName: string,
    password: string,
    requirePasswordReset: boolean = true
  ): Promise<any> {
    // if (this.core.userHasPermission("SRAUTHCODE")) { // For when policies are to be enforced
    if (true) {
      let url = `${this.fullBaseUrl}/createLoginProfile`;

      let params = new HttpParams();

      // These parameters are always passed
      if (!this.core.isEmptyOrNull(userName))
        params = params.set('userName', userName);

      if (!this.core.isEmptyOrNull(password))
        params = params.set('password', password);

      params = params.set('passwordResetRequired', requirePasswordReset);

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

  /** POST: update a user login profile
   * @param {string} userName The name of the user
   * @param {string} password Login password
   * @param {boolean} requirePasswordReset Determines if user should change password on login
   */
  updateLoginProfile(
    userName: string,
    password: string,
    requirePasswordReset: boolean = false
  ): Promise<any> {
    // if (this.core.userHasPermission("SRAUTHCODE")) { // For when policies are to be enforced
    if (true) {
      let url = `${this.fullBaseUrl}/updateLoginProfile`;

      let params = new HttpParams();

      // These parameters are always passed
      if (!this.core.isEmptyOrNull(userName))
        params = params.set('userName', userName);

      if (!this.core.isEmptyOrNull(password))
        params = params.set('password', password);

      params = params.set('passwordResetRequired', requirePasswordReset);

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
