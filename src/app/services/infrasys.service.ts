import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root',
})
export class InfrasysService {
  public fullBaseUrl = `${environment.baseUrl}/${environment.apiPath}`;

  constructor(private core: CoreService) {}

  /**
   * Sites
  * /*


  /** POST: Fetch site summary information for the dashboard*/
  getSiteSummary(): Promise<any> {
    // if (this.core.userHasPermission("SRAUTHCODE")) { // For when policies are to be enforced
    if (true) {
      let url = `${this.fullBaseUrl}/getSiteSummary`;

      let body: any = {};

      //caution: passing the options invalidates the form data
      return this.core.makeRemoteRequest(
        url,
        'post',
        body,
        this.core.httpOptions.infrasysHeaders
      );
    } else {
      return this.core.fakePromise(
        'error',
        "Sorry, you're not allowed to do this!"
      );
    }
  }

  /** POST: Fetch all sites
   * @param {number} maxItems Maximum number of items per page
   * @param {string} marker Next page marker
   */
  getSites(
    maxItems: number = this.core.maxItems,
    marker?: string
  ): Promise<any> {
    // if (this.core.userHasPermission("SRAUTHCODE")) { // For when policies are to be enforced
    if (true) {
      let url = `${this.fullBaseUrl}/listSites`;

      let body: any = {};

      // These parameters are always passed
      body.maxItems = maxItems;
      if (!this.core.isEmptyOrNull(marker)) body.marker = marker;

      //caution: passing the options invalidates the form data
      return this.core.makeRemoteRequest(
        url,
        'post',
        body,
        this.core.httpOptions.infrasysHeaders
      );
    } else {
      return this.core.fakePromise(
        'error',
        "Sorry, you're not allowed to do this!"
      );
    }
  }

  /** POST: Fetch all user created sites*/
  getUserSites(
    maxItems: number = this.core.maxItems,
    marker?: string
  ): Promise<any> {
    // if (this.core.userHasPermission("SRAUTHCODE")) { // For when policies are to be enforced
    if (true) {
      let url = `${this.fullBaseUrl}/listSitesForUser`;

      let body: any = {};

      // These parameters are always passed
      // body.maxItems = maxItems;
      // if (!this.core.isEmptyOrNull(marker)) body.marker = marker;

      //caution: passing the options invalidates the form data
      return this.core.makeRemoteRequest(
        url,
        'post',
        body,
        this.core.httpOptions.infrasysHeaders
      );
    } else {
      return this.core.fakePromise(
        'error',
        "Sorry, you're not allowed to do this!"
      );
    }
  }

  /** POST: Fetch site details
   * @param {string} siteId Site Id
   */
  getSite(siteId: string | null): Promise<any> {
    // if (this.core.userHasPermission("SRAUTHCODE")) { // For when policies are to be enforced
    if (true) {
      let url = `${this.fullBaseUrl}/getSite`;

      let body: any = {};

      // These parameters are always passed
      if (!this.core.isEmptyOrNull(siteId)) body.siteId = siteId;

      //caution: passing the options invalidates the form data
      return this.core.makeRemoteRequest(
        url,
        'post',
        body,
        this.core.httpOptions.infrasysHeaders
      );
    } else {
      return this.core.fakePromise(
        'error',
        "Sorry, you're not allowed to do this!"
      );
    }
  }

  /** POST: Fetch site facility details
   * @param {string} siteId Site Id
   * @param {string} facilityId Facility Id
   */
  getFacilityDetails(
    siteId: string | null,
    facilityId: string | null
  ): Promise<any> {
    // if (this.core.userHasPermission("SRAUTHCODE")) { // For when policies are to be enforced
    if (true) {
      let url = `${this.fullBaseUrl}/getSiteFacility`;
      8;

      let body: any = {};

      // These parameters are always passed
      if (!this.core.isEmptyOrNull(siteId)) body.siteId = siteId;

      if (!this.core.isEmptyOrNull(facilityId)) body.facilityId = facilityId;

      //caution: passing the options invalidates the form data
      return this.core.makeRemoteRequest(
        url,
        'post',
        body,
        this.core.httpOptions.infrasysHeaders
      );
    } else {
      return this.core.fakePromise(
        'error',
        "Sorry, you're not allowed to do this!"
      );
    }
  }

  /** POST: Fetch site lookup values
   */
  getSiteLookups(): Promise<any> {
    // if (this.core.userHasPermission("SRAUTHCODE")) { // For when policies are to be enforced
    if (true) {
      let url = `${this.fullBaseUrl}/listSiteLookups`;

      let body: any = {};

      // These parameters are always passed

      //caution: passing the options invalidates the form data
      return this.core.makeRemoteRequest(
        url,
        'post',
        body,
        this.core.httpOptions.infrasysHeaders
      );
    } else {
      return this.core.fakePromise(
        'error',
        "Sorry, you're not allowed to do this!"
      );
    }
  }

  /** POST: Create a site
   * @param {string} siteData Raw json data
   */
  createSite(siteData: any): Promise<any> {
    // if (this.core.userHasPermission("SRAUTHCODE")) { // For when policies are to be enforced
    if (true) {
      let url = `${this.fullBaseUrl}/createSite`;
      8;

      let body: any = {};

      // These parameters are always passed
      body = siteData;

      //caution: passing the options invalidates the form data
      return this.core.makeRemoteRequest(
        url,
        'post',
        body,
        this.core.httpOptions.infrasysHeaders
      );
    } else {
      return this.core.fakePromise(
        'error',
        "Sorry, you're not allowed to do this!"
      );
    }
  }

  /** POST: Create a site contact
   * @param {string} siteContactData Raw json data
   */
  createSiteContact(siteContactData: any): Promise<any> {
    // if (this.core.userHasPermission("SRAUTHCODE")) { // For when policies are to be enforced
    if (true) {
      let url = `${this.fullBaseUrl}/createSiteContact`;
      8;

      let body: any = {};

      // These parameters are always passed
      body = siteContactData;

      //caution: passing the options invalidates the form data
      return this.core.makeRemoteRequest(
        url,
        'post',
        body,
        this.core.httpOptions.infrasysHeaders
      );
    } else {
      return this.core.fakePromise(
        'error',
        "Sorry, you're not allowed to do this!"
      );
    }
  }

  /** POST: Create a site contact
   * @param {string} siteActivityData Raw json data
   */
  createSiteActivity(siteActivityData: any): Promise<any> {
    // if (this.core.userHasPermission("SRAUTHCODE")) { // For when policies are to be enforced
    if (true) {
      let url = `${this.fullBaseUrl}/createSiteActivity`;
      8;

      let body: any = {};

      // These parameters are always passed
      body = siteActivityData;

      //caution: passing the options invalidates the form data
      return this.core.makeRemoteRequest(
        url,
        'post',
        body,
        this.core.httpOptions.infrasysHeaders
      );
    } else {
      return this.core.fakePromise(
        'error',
        "Sorry, you're not allowed to do this!"
      );
    }
  }
}
