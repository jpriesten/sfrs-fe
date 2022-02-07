import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { CoreService } from './core.service';

@Injectable({
  providedIn: 'root',
})
export class GeneralService {
  public fullBaseUrl = `${environment.baseUrl}/${environment.apiPath}`;

  constructor(private core: CoreService) {}

  /**
   * Province
   * /*

  /** POST: Fetch all provinces*/
  getProvinces(): Promise<any> {
    // if (this.core.userHasPermission("SRAUTHCODE")) { // For when policies are to be enforced
    if (true) {
      let url = `${this.fullBaseUrl}/listProvinces`;

      let body: any = {};

      //caution: passing the options invalidates the form data
      return this.core.makeRemoteRequest(url, 'post', body);
    } else {
      return this.core.fakePromise(
        'error',
        "Sorry, you're not allowed to do this!"
      );
    }
  }

  /** POST: Fetch province details
   * @param {string} name Province name
   * @param {string} code Province code
   */
  getProvince(name: string | null, code: string | null): Promise<any> {
    // if (this.core.userHasPermission("SRAUTHCODE")) { // For when policies are to be enforced
    if (true) {
      let url = `${this.fullBaseUrl}/getProvince`;

      let body: any = {};

      // These parameters are always passed
      if (!this.core.isEmptyOrNull(name)) body.name = name;
      if (!this.core.isEmptyOrNull(code)) body.code = code;

      //caution: passing the options invalidates the form data
      return this.core.makeRemoteRequest(url, 'post', body);
    } else {
      return this.core.fakePromise(
        'error',
        "Sorry, you're not allowed to do this!"
      );
    }
  }

  /**
   * District
   */
  /** POST: Fetch all districts*/
  getDistricts(): Promise<any> {
    // if (this.core.userHasPermission("SRAUTHCODE")) { // For when policies are to be enforced
    if (true) {
      let url = `${this.fullBaseUrl}/listDistricts`;

      let body: any = {};

      //caution: passing the options invalidates the form data
      return this.core.makeRemoteRequest(url, 'post', body);
    } else {
      return this.core.fakePromise(
        'error',
        "Sorry, you're not allowed to do this!"
      );
    }
  }

  /** POST: Fetch district details
   * @param {string} name district name
   * @param {string} code district code
   */
  getDistrict(name: string | null, code: string | null): Promise<any> {
    // if (this.core.userHasPermission("SRAUTHCODE")) { // For when policies are to be enforced
    if (true) {
      let url = `${this.fullBaseUrl}/getDistrict`;

      let body: any = {};

      // These parameters are always passed
      if (!this.core.isEmptyOrNull(name)) body.name = name;
      if (!this.core.isEmptyOrNull(code)) body.code = code;

      //caution: passing the options invalidates the form data
      return this.core.makeRemoteRequest(url, 'post', body);
    } else {
      return this.core.fakePromise(
        'error',
        "Sorry, you're not allowed to do this!"
      );
    }
  }

  /**
   * Local
   */

  /** POST: Fetch all locals */
  getLocals(): Promise<any> {
    // if (this.core.userHasPermission("SRAUTHCODE")) { // For when policies are to be enforced
    if (true) {
      let url = `${this.fullBaseUrl}/listLocals`;

      let body: any = {};

      //caution: passing the options invalidates the form data
      return this.core.makeRemoteRequest(url, 'post', body);
    } else {
      return this.core.fakePromise(
        'error',
        "Sorry, you're not allowed to do this!"
      );
    }
  }

  /** POST: Fetch local details
   * @param {string} name local name
   * @param {string} code local code
   */
  getLocal(name: string | null, code: string | null): Promise<any> {
    // if (this.core.userHasPermission("SRAUTHCODE")) { // For when policies are to be enforced
    if (true) {
      let url = `${this.fullBaseUrl}/getLocal`;

      let body: any = {};

      // These parameters are always passed
      if (!this.core.isEmptyOrNull(name)) body.name = name;
      if (!this.core.isEmptyOrNull(code)) body.code = code;

      //caution: passing the options invalidates the form data
      return this.core.makeRemoteRequest(url, 'post', body);
    } else {
      return this.core.fakePromise(
        'error',
        "Sorry, you're not allowed to do this!"
      );
    }
  }

  /**
   * Ward
   */

  /** POST: Fetch all wards */
  getWards(): Promise<any> {
    // if (this.core.userHasPermission("SRAUTHCODE")) { // For when policies are to be enforced
    if (true) {
      let url = `${this.fullBaseUrl}/listWards`;

      let body: any = {};

      //caution: passing the options invalidates the form data
      return this.core.makeRemoteRequest(url, 'post', body);
    } else {
      return this.core.fakePromise(
        'error',
        "Sorry, you're not allowed to do this!"
      );
    }
  }

  /** POST: Fetch ward details
   * @param {string} code ward code
   * @param {number} number ward code
   */
  getWard(code: string | null, number: number): Promise<any> {
    // if (this.core.userHasPermission("SRAUTHCODE")) { // For when policies are to be enforced
    if (true) {
      let url = `${this.fullBaseUrl}/getWard`;

      let body: any = {};

      // These parameters are always passed
      if (!this.core.isEmptyOrNull(code)) body.code = code;
      body.number = number;

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
