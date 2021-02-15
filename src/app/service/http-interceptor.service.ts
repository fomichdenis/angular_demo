import { Injectable } from '@angular/core';
import {AuthenticationService} from "./authentication.service";
import {HttpEvent, HttpHandler, HttpHeaders, HttpRequest} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class HttpInterceptorService {

  constructor(private authenticationService: AuthenticationService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authenticationService.isUserLoggedIn() && req.url.indexOf('basicauth') === -1) {
      console.log(sessionStorage.getItem('basicauth'));
      console.log(req);
      const authReq = req.clone({
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          'authorization': sessionStorage.getItem('basicauth')
        })
      });
      console.log(authReq);
      return next.handle(authReq);
    } else {
      return next.handle(req);
    }
  }
}
