import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user.model';
import { errorTypes } from '../utilities/errors';

import * as moment from 'moment';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  public user: User | null = new User();
  private httpTimeout = 60 * 1000;

  public httpOptions = {
    baseHeaders: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
    idapHeaders: new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded',
      'x-stms-service': 'ida',
    }),
  };

  public momentOffset: string = '-0100';

  // moment: any = moment;

  constructor(
    private http: HttpClient,
    private toastService: ToastrService,
    private datePipe: DatePipe
  ) {
    if (!this.isEmptyOrNull(localStorage.getItem('currentUser'))) {
      this.user = JSON.parse(localStorage.getItem('currentUser')!);
    } else {
      this.user = null;
    }
  }

  // test if a string value is null, undefined or empty
  isEmptyOrNull(value: string | null | undefined): boolean {
    if (value == '' || value == null || value == undefined) {
      return true;
    }
    return false;
  }

  formatDate(date: string) {
    if (date) {
      if (moment(date).isValid()) {
        return moment(moment(date).utcOffset(this.momentOffset)).fromNow();
      } else {
        console.error(`"${date}" is not a valid date`);
        return '';
      }
    } else {
      return '';
    }
  }

  getDateInMoment(date: string) {
    if (!this.isEmptyOrNull(date)) {
      return this.formatDate(date);
    } else {
      return '';
    }
  }

  getDate(date: any) {
    if (!this.isEmptyOrNull(date)) {
      return this.datePipe.transform(date, 'medium');
    } else {
      return '';
    }
  }

  successToast(message: string) {
    this.toastService.success(message, undefined, {
      easing: 'ease-out',
      positionClass: 'toast-top-left',
    });
  }

  errorToast(message: string) {
    this.toastService.error(message, undefined, {
      easing: 'ease-in',
      timeOut: 15000,
    });
  }

  getErrorType(errorName: string) {
    return errorTypes.find((errorType) => errorType.name == errorName);
  }

  logout() {
    return new Promise<void>((resolve, reject) => {
      localStorage.removeItem('currentUser');
      resolve();
    });
  }

  fakePromise(type: string, message: string) {
    let promise = new Promise((resolve, reject) => {
      setTimeout(() => {
        if (type == 'error') {
          reject({ msg: message });
        } else {
          // type == "success"
          resolve(message);
        }
      }, 500);
    });
    return promise;
  }

  makeRemoteRequest(
    url: string,
    method: string,
    params: any,
    options = this.httpOptions.baseHeaders,
    timeout?: number
  ) {
    if (method.toLowerCase() == 'get') {
      return new Promise<any>((resolve, reject) => {
        this.http.get<any>(url, { headers: options }).subscribe({
          next: (res) => {
            console.log('Success: ', res);
            resolve(res);
          },
          error: (err) => {
            console.log('Error: ', err);
            let error = err.status != 0 ? err.error : err.message;
            reject(error);
          },
        });
      });
    } else if (method.toLowerCase() == 'post') {
      return new Promise<any>((resolve, reject) => {
        this.http.post<any>(url, params, { headers: options }).subscribe({
          next: (res) => {
            // console.log('Success: ', res);
            resolve(res);
          },
          error: (err) => {
            // console.log('Error: ', err);
            reject(err);
          },
        });
      });
    } else if (method.toLowerCase() == 'put') {
      return new Promise<any>((resolve, reject) => {
        this.http.put<any>(url, params, { headers: options }).subscribe({
          next: (res: any) => {
            console.log('Success: ', res);
            resolve(res);
          },
          error: (err) => {
            console.log('Error: ', err);
            let error = err.status != 0 ? err.error : err.message;
            reject(error);
          },
        });
      });
    } else if (method.toLowerCase() == 'delete') {
      return new Promise<any>((resolve, reject) => {
        this.http.delete<any>(url, { headers: options }).subscribe({
          next: (res: any) => {
            console.log('Success: ', res);
            resolve(res);
          },
          error: (err) => {
            console.log('Error: ', err);
            let error = err.status != 0 ? err.error : err.message;
            reject(error);
          },
        });
      });
    } else {
      console.log(`method ${method} is not implemented`);
      return new Promise<any>(() => false);
    }
  }
}
