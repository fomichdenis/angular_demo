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

  download(url: string, template): Observable<Blob> {
    return this.http.post(url, template, {
      responseType: 'blob'
    });
  }
  getTemplate(Name){
    console.log(Name);
    return this.http.post('http://localhost:8080/get_template_angular', {'Name': Name});
  }
  checkNameUniqueness(Name){
    return this.http.post('http://localhost:8080/check_name_uniqueness_angular', {'Name': Name});
  }
  getTemplates(){
    return this.http.post<string[]>('http://localhost:8080/get_templates_angular', {});
  }
  upload(file: File, url): Observable<HttpEvent<any>> {
    const data: FormData = new FormData();
    data.set('file', file);
    console.log('upload');
    const newRequest = new HttpRequest('POST', url, data, {
      reportProgress: true,
      responseType: 'text'
    });
    console.log(data.get('file'));
    console.log(data);
    return this.http.request(newRequest);
  }
  merge(): Observable<Blob> {
    return this.http.post('http://localhost:8080/merge_angular', {}, {
      responseType: 'blob'
    });
  }

  getFiles(url): Observable<any> {
    return this.http.get(url);
  }
}
