import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {consoleTestResultHandler} from "tslint/lib/test";

@Injectable({
  providedIn: 'root'
})
export class DownloadService {

  constructor(private http: HttpClient) {}

  download(url: string): Observable<Blob> {
    return this.http.get(url, {
      responseType: 'blob'
    })
  }
  getTemplate(url, Id, callback){
    console.log(Id);
    let headers = new HttpHeaders().set('templateId', Id);
    return this.http.get(url, { headers: {  registration: 'test' } }).subscribe(response => {
      if (response != null && response['id']) {
        console.log(response);
        return callback && callback();
      }
    });
  }
}
