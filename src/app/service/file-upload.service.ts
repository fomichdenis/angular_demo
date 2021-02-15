import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient, HttpEvent, HttpHeaders, HttpRequest} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(
    private http: HttpClient
  ) { }

  download(url: string): Observable<Blob> {
    return this.http.post(url, {}, {
      responseType: 'blob'
    })
  }
  getTemplate(url, Id, callback){
    console.log(Id);
    return this.http.post(url, {Id}).subscribe(response => {
      if (response != null) {
        console.log(response);
      }
      else{
        console.log('Error');
      }
      return callback && callback();
    });
  }

  // upload(file: File, url): Observable<HttpEvent<any>> {
  //   const formData: FormData = new FormData();
  //
  //   formData.append('file', file, file.name);
  //
  //   const req = new HttpRequest('POST', url, formData, {
  //     reportProgress: true,
  //     responseType: 'json'
  //   });
  //
  //   return this.http.request(req);
  // }
  upload(file: File, url): Observable<HttpEvent<any>> {
    const data: FormData = new FormData();
    data.append('file', file);
    const newRequest = new HttpRequest('POST', url, data, {
      reportProgress: true,
      responseType: 'text'
    });
    return this.http.request(newRequest);
  }

  getFiles(url): Observable<any> {
    return this.http.get(url);
  }
}
