import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  authenticated = false;
  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
  credentials: {username: string, password: string} = {username: null, password: null};
  constructor(private http: HttpClient) {
  }



  authenticate(credentials, callback) {
    console.log(credentials);
    this.http.get(`http://localhost:8080/angular/login`,
      { headers: { authorization: this.createBasicAuthToken(credentials.username, credentials.password) } }).subscribe( response => {
      if (response && response['username']) {
        this.credentials = credentials;
        this.registerSuccessfulLogin(credentials.username, credentials.password);
      }
      console.log(this.isUserLoggedIn());
      return callback && callback();
    });
  }

  createBasicAuthToken(username: String, password: String) {
    return 'Basic ' + window.btoa(username + ":" + password);
  }

  registerSuccessfulLogin(username, password) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username)
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    this.credentials.username = null;
    this.credentials.password = null;
    this.authenticated = false;
    this.http.get('http://localhost:8080/logout');
    console.log('logout');
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return false
    return true
  }

  getLoggedInUserName() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME)
    if (user === null) return ''
    return user
  }


}

