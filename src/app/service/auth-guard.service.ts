import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from '@angular/router';
import {AuthenticationService} from './authentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuardService implements CanActivate {
  // declare a variable 'routeURL'
  // to keep track of current active route
  routeURL: string;

  constructor(private backendService: AuthenticationService, private router: Router) {
    // initialize 'routeURL' with current route URL
    this.routeURL = this.router.url;
  }

  // the Router call canActivate() method,
  // if canActivate is registered in Routes[]
  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    if (this.backendService.isUserLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login'], {
        queryParams: {
          return: state.url
        }
      });
      return false;
    }
  }
}
