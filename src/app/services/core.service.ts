import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root',
})
export class CoreService {
  public user: User | null = new User();
  private httpTimeout = 60 * 1000;

  constructor(private http: HttpClient, private toastService: ToastrService) {
    if (!this.isEmptyOrNull(localStorage.getItem('currentUser'))) {
      this.user = JSON.parse(localStorage.getItem('currentUser')!);
      console.info('User info set');
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
    options: any,
    timeout?: number
  ) {
    if (method.toLowerCase() == 'get') {
      return new Promise<any>((resolve, reject) => {
        this.http.get<any>(url, options).subscribe({
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
        this.http.post<any>(url, params, options).subscribe({
          next: (res) => {
            console.log('Success: ', res);
            resolve(res);
          },
          error: (err) => {
            console.log('Error: ', err);
            reject(err.error);
          },
        });
      });
    } else if (method.toLowerCase() == 'put') {
      return new Promise<any>((resolve, reject) => {
        this.http.put<any>(url, params, options).subscribe({
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
        this.http.delete<any>(url, options).subscribe({
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