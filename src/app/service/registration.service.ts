import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  credentials : {username: string, password: string, confirmationPassword: string}
    = {username: null, password: null, confirmationPassword: null};
  constructor(private http: HttpClient) {
  }
  registrate(credentials, callback) {
    console.log(credentials)
    this.http.get(`http://localhost:8080/angular/registration`,
      { headers: { authorization: this.createBasicAuthToken(credentials.username,
            credentials.password, credentials.confirmationPassword) } }).subscribe( response => {
      if (response != null && response['username']) {
        this.credentials = credentials;
        console.log("Succesful registration");
        return callback && callback();
      }
    });
  }
  createBasicAuthToken(username: String, password: String, confirmationPassword: String) {
    return 'Basic ' + window.btoa(username + ":" + password + ":" + confirmationPassword);
  }
}
