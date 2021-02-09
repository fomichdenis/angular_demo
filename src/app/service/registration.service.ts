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
    this.http.get(`http://localhost:8080/registration_angular`,
      { headers: { authorization: this.createBasicAuthToken('registration', 'registration'), registration: this.createBasicRegToken(credentials.username,
            credentials.password, credentials.confirmationPassword) } }).subscribe( response => {
      if (response != null && response['username']) {
        this.credentials = credentials;
        console.log("Succesful registration");
        return callback && callback();
      }
    });
  }
  createBasicRegToken(username: String, password: String, confirmationPassword: String) {
    return 'Basic ' + window.btoa(username + ":" + password + ":" + confirmationPassword);
  }
  createBasicAuthToken(username: String, password: String) {
    return 'Basic ' + window.btoa(username + ":" + password);
  }
}
