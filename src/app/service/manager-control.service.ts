import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ManagerControlService {

  constructor(private http: HttpClient) {}

  getGroupUsers(url, callback){
    return this.http.get(url).subscribe(response => {
      if (response != null) {
        console.log(response);
        return callback && callback();
      }
      return callback && callback();
    });
  }

  addUserToGroup(url, username, callback){
    return this.http.get(url, {headers: {name: username}}).subscribe(response => {
      if (response != null) {
        console.log(response);
        return callback && callback();
      }
      return callback && callback();
    });
  }

  deleteUserFromGroup(url, username, callback){
    return this.http.get(url, {headers: {'username': username}}).subscribe(response => {
      if (response != null) {
        console.log(response);
        return callback && callback();
      }
      return callback && callback();
    });
  }
}
