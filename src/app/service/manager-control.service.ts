import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ManagerControlService {


  constructor(private http: HttpClient) {}

  getGroupUsers(): Observable<string[]>{
    return this.http.post<string[]>('http://localhost:8080/get_department_users_angular', {});
  }

  addUserToGroup(username){
    return this.http.post('http://localhost:8080/add_user_to_department_angular', {username},
      {headers: {'Content-Type': 'application/json'}});
  }

  deleteUserFromGroup(username){
    return this.http.post('http://localhost:8080/delete_user_from_department_angular', {username},
      {headers: {'Content-Type': 'application/json'}});
  }

  getGroup(){
    return this.http.post('http://localhost:8080/get_department_angular', {});
  }
}
