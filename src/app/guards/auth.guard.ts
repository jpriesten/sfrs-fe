import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanLoad,
  Route,
  RouterStateSnapshot,
  UrlSegment,
  UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate, CanLoad {
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    if (localStorage.getItem('currentUser')) {
      // logged in so return true
      return true;
    }

    // not logged in so redirect to login page with the return url
    location.href = '/login';
    return false;
  }

  canLoad(route: Route, segments: UrlSegment[]): boolean {
    if (!localStorage.getItem('currentUser')) {
      // logged in so return true
      return false;
    }

    // not logged in so do not load lazy loaded modules
    location.href = '/login';
    return true;
  }
}
