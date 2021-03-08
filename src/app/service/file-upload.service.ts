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
  upload(file: File[], url): Observable<Blob> {
    const data: FormData = new FormData();
    for (let i = 0; i < file.length; i++) {
      data.append('files', file[i], file[i].name);
    }
    console.log('upload');
    console.log(data);
    return this.http.post(url, data, {
      responseType: 'blob'
    });
  }

  getFiles(url): Observable<any> {
    return this.http.get(url);
  }
}
