import { HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root',
})
export class IdapService {
  public fullBaseUrl = `${environment.baseUrl}/${environment.apiPath}`;

  constructor(private core: CoreService) {}

  /** POST: Fetch account summary information for the dashboard*/
  getAccountSummary(): Promise<any> {
    // if (this.core.userHasPermission("SRAUTHCODE")) { // For when policies are to be enforced
    if (true) {
      let url = `${this.fullBaseUrl}/getAccountSummary`;

      let body: any = {};

      //caution: passing the options invalidates the form data
      return this.core.makeRemoteRequest(
        url,
        'post',
        body,
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

      let body: any = {};

      // These parameters are always passed
      body.maxItems = maxItems;

      //caution: passing the options invalidates the form data
      return this.core.makeRemoteRequest(
        url,
        'post',
        body,
        this.core.httpOptions.idapHeaders
      );
    } else {
      return this.core.fakePromise(
        'error',
        "Sorry, you're not allowed to do this!"
      );
    }
  }

  /** POST: Fetch attached group policies
   * @param {string} groupName Group name
   * @param {number} maxItems Maximum number of items per page
   */
  getGroupPolicies(
    groupName: string | null,
    maxItems: number = 10
  ): Promise<any> {
    // if (this.core.userHasPermission("SRAUTHCODE")) { // For when policies are to be enforced
    if (true) {
      let url = `${this.fullBaseUrl}/listAttachedGroupPolicies`;

      let body: any = {};

      // These parameters are always passed
      if (!this.core.isEmptyOrNull(groupName)) body.groupName = groupName;

      body.maxItems = maxItems;

      //caution: passing the options invalidates the form data
      return this.core.makeRemoteRequest(
        url,
        'post',
        body,
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

      let body: any = {};

      // These parameters are always passed
      if (!this.core.isEmptyOrNull(groupName)) body.groupName = groupName;

      body.maxItems = maxItems;

      if (!this.core.isEmptyOrNull(marker)) body.marker = marker;

      //caution: passing the options invalidates the form data
      return this.core.makeRemoteRequest(
        url,
        'post',
        body,
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

      let body: any = {};

      // These parameters are always passed
      if (!this.core.isEmptyOrNull(groupName)) body.groupName = groupName;

      //caution: passing the options invalidates the form data
      return this.core.makeRemoteRequest(
        url,
        'post',
        body,
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
  addGroupUser(groupName: string | null, userName: string): Promise<any> {
    // if (this.core.userHasPermission("SRAUTHCODE")) { // For when policies are to be enforced
    if (true) {
      let url = `${this.fullBaseUrl}/addUserToGroup`;

      let body: any = {};

      // These parameters are always passed
      if (!this.core.isEmptyOrNull(groupName)) body.groupName = groupName;

      if (!this.core.isEmptyOrNull(userName)) body.userName = userName;

      //caution: passing the options invalidates the form data
      return this.core.makeRemoteRequest(
        url,
        'post',
        body,
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

      let body: any = {};

      // These parameters are always passed
      body.maxItems = maxItems;

      //caution: passing the options invalidates the form data
      return this.core.makeRemoteRequest(
        url,
        'post',
        body,
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

      let body: any = {};

      // These parameters are always passed
      if (!this.core.isEmptyOrNull(userName)) body.userName = userName;

      //caution: passing the options invalidates the form data
      return this.core.makeRemoteRequest(
        url,
        'post',
        body,
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

      let body: any = {};

      // These parameters are always passed
      if (!this.core.isEmptyOrNull(userName)) body.userName = userName;

      body.maxItems = maxItems;

      if (!this.core.isEmptyOrNull(marker)) body.marker = marker;

      //caution: passing the options invalidates the form data
      return this.core.makeRemoteRequest(
        url,
        'post',
        body,
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

      let body: any = {};

      // These parameters are always passed
      if (!this.core.isEmptyOrNull(userName)) body.userName = userName;

      if (!this.core.isEmptyOrNull(tags)) body.tags = tags;

      //caution: passing the options invalidates the form data
      return this.core.makeRemoteRequest(
        url,
        'post',
        body,
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

      let body: any = {};

      // These parameters are always passed
      if (!this.core.isEmptyOrNull(userName)) body.userName = userName;

      if (!this.core.isEmptyOrNull(password)) body.password = password;

      body.passwordResetRequired = requirePasswordReset;

      //caution: passing the options invalidates the form data
      return this.core.makeRemoteRequest(
        url,
        'post',
        body,
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

      let body: any = {};

      // These parameters are always passed
      if (!this.core.isEmptyOrNull(userName)) body.userName = userName;

      if (!this.core.isEmptyOrNull(password)) body.password = password;

      body.passwordResetRequired = requirePasswordReset;

      //caution: passing the options invalidates the form data
      return this.core.makeRemoteRequest(
        url,
        'post',
        body,
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
   * IDAP Policy endpoints
   */

  /** POST: Fetch policies
   * @param {number} maxItems Maximum number of items per page
   */
  getPolicies(maxItems: number = 10): Promise<any> {
    // if (this.core.userHasPermission("SRAUTHCODE")) { // For when policies are to be enforced
    if (true) {
      let url = `${this.fullBaseUrl}/listPolicies`;

      let body: any = {};

      // These parameters are always passed
      body.maxItems = maxItems;

      //caution: passing the options invalidates the form data
      return this.core.makeRemoteRequest(
        url,
        'post',
        body,
        this.core.httpOptions.idapHeaders
      );
    } else {
      return this.core.fakePromise(
        'error',
        "Sorry, you're not allowed to do this!"
      );
    }
  }

  /** POST: Fetch policy details
   * @param {string} policyId Policy Id
   */
  getPolicy(policyId: string | null): Promise<any> {
    // if (this.core.userHasPermission("SRAUTHCODE")) { // For when policies are to be enforced
    if (true) {
      let url = `${this.fullBaseUrl}/getPolicy`;

      let body: any = {};

      // These parameters are always passed
      if (!this.core.isEmptyOrNull(policyId)) body.policyId = policyId;

      //caution: passing the options invalidates the form data
      return this.core.makeRemoteRequest(
        url,
        'post',
        body,
        this.core.httpOptions.idapHeaders
      );
    } else {
      return this.core.fakePromise(
        'error',
        "Sorry, you're not allowed to do this!"
      );
    }
  }

  /** POST: Attach policies to a group
   * @param {string} policyId ID of the policy
   * @param {string} groupName name of group
   */
  attachPolicies(policyId: string, groupName: string | null): Promise<any> {
    // if (this.core.userHasPermission("SRAUTHCODE")) { // For when policies are to be enforced
    if (true) {
      let url = `${this.fullBaseUrl}/attachGroupPolicy`;

      let body: any = {};

      // These parameters are always passed
      if (!this.core.isEmptyOrNull(policyId)) body.policyId = policyId;

      if (!this.core.isEmptyOrNull(groupName)) body.groupName = groupName;

      //caution: passing the options invalidates the form data
      return this.core.makeRemoteRequest(
        url,
        'post',
        body,
        this.core.httpOptions.idapHeaders
      );
    } else {
      return this.core.fakePromise(
        'error',
        "Sorry, you're not allowed to do this!"
      );
    }
  }

  /** POST: Detach policies from group
   * @param {string} policyId ID of the policy
   * @param {string} groupName name of group
   */
  detachPolicies(policyId: string, groupName: string | null): Promise<any> {
    // if (this.core.userHasPermission("SRAUTHCODE")) { // For when policies are to be enforced
    if (true) {
      let url = `${this.fullBaseUrl}/detachGroupPolicy`;

      let body: any = {};

      // These parameters are always passed
      if (!this.core.isEmptyOrNull(policyId)) body.policyId = policyId;

      if (!this.core.isEmptyOrNull(groupName)) body.groupName = groupName;

      //caution: passing the options invalidates the form data
      return this.core.makeRemoteRequest(
        url,
        'post',
        body,
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
