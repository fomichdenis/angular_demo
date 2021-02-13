import { Injectable } from '@angular/core';
import {Observable} from "rxjs";
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  constructor(
    private httpClient: HttpClient
  ) { }
  // postFile(fileToUpload: File): Observable<boolean> {
  //   const endpoint = 'http://localhost:8080/upload_angular';
  //   const formData: FormData = new FormData();
  //   formData.append('fileKey', fileToUpload, fileToUpload.name);
  //   return this.httpClient.get(endpoint, formData,{ headers: { } })
  //     .subscribe(() => { return true; });
  //     // .get(endpoint, formData, {headers: {}})
  //     // .map(() => { return true; })
  //     // .catch((e) => this.handleError(e));
  // }
}
