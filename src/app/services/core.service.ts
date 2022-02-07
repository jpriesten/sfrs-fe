import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user.model';
import { errorTypes } from '../utilities/errors';

import * as moment from 'moment';
import * as _ from 'lodash';
import { DatePipe } from '@angular/common';
import {
  NgbModal,
  NgbModalRef,
  ModalDismissReasons,
} from '@ng-bootstrap/ng-bootstrap';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  public user: User | null = new User();
  private httpTimeout = 60 * 1000;

  public tagPatten = /^[A-Za-z0-9_.:/=+-@]+$/;

  public httpOptions = {
    baseHeaders: new HttpHeaders({
      'Content-Type': 'application/json',
    }),
    idapHeaders: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-stms-service': 'ida',
    }),
    infrasysHeaders: new HttpHeaders({
      'Content-Type': 'application/json',
      'x-stms-service': 'infrasys',
    }),
  };

  public momentOffset: string = '-0100';

  private modalReference: NgbModalRef | undefined;
  private closeResult = '';

  constructor(
    private http: HttpClient,
    private toastService: ToastrService,
    private modalService: NgbModal,
    private datePipe: DatePipe
  ) {
    if (!this.isEmptyOrNull(localStorage.getItem('currentUser'))) {
      this.user = JSON.parse(localStorage.getItem('currentUser')!);
    } else {
      this.user = null;
    }
  }

  get _lodashRef() {
    return _;
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

  generatePassword(length: number = 12) {
    const chars =
      '0123456789abcdefghijklmnopqrstuvwxyz!@#$%^&*()ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    let password = '';
    for (var i = 0; i <= length; i++) {
      var randomNumber = Math.floor(Math.random() * chars.length);
      password += chars.substring(randomNumber, randomNumber + 1);
    }
    return password;
  }

  openModal(content: any): Promise<boolean> {
    return new Promise<boolean>((resolve, reject) => {
      this.modalReference = this.modalService.open(content, { centered: true });
      this.modalReference.result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
          if (result == true) {
            resolve(true);
          } else reject(false);
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          reject(false);
        }
      );
    });
  }

  closeModal() {
    this.modalReference?.close(true);
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
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

  getUnauthorisedErrorMessage(error: any) {
    const errorType = this.getErrorType(error.error.errors[0].detail);
    let returnedData = { authorised: true, description: '' };
    if (errorType !== undefined) {
      if (errorType.name == 'NotAuthorized') {
        returnedData.authorised = false;
        returnedData.description = errorType.description;
      }
    }
    return returnedData;
  }

  // Delete empty entries or trim entries
  sanitiseRequestObject(
    input: any,
    keyToTrim?: string,
    keyToDelete?: string,
    deleteInput?: boolean
  ) {
    Object.keys(input).forEach((key, index) => {
      if (typeof input[key] == 'string' && this.isEmptyOrNull(input[key])) {
        delete input[key];
      }
      if (
        typeof input[key] == 'string' &&
        this.isEmptyOrNull(input[key]) &&
        deleteInput == true
      ) {
        Object.keys(input).splice(index, 1);
      }
      if (key == keyToTrim && typeof input[key] == 'string') {
        const trimmedValue = String(input[key]).replace(/\s/g, '');
        input[key] = trimmedValue;
      }
      if (key == keyToDelete) {
        delete input[key];
      }
    });
    return input;
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
