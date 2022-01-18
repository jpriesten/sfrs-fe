import { HttpHeaders } from '@angular/common/http';
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
}
