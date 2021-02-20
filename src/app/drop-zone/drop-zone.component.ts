import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpEventType, HttpResponse} from "@angular/common/http";
import {FileUploadService} from "../service/file-upload.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-drop-zone',
  templateUrl: './drop-zone.component.html',
  styleUrls: ['./drop-zone.component.css']
})
export class DropZoneComponent implements OnInit {

  ngOnInit(): void {
  }

  files: File[] = [];
  // title = 'File-Upload-Save';
  // selectedFiles: FileList;
  // currentFileUpload: File;
  // progress: { percentage: number } = { percentage: 0 };
  // selectedFile = null;
  // changeImage = false;

  constructor(
    private http: HttpClient,
    private uploadService: FileUploadService
  ) {}

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);

    const formData = new FormData();

    // for (let i = 0; i < this.files.length; i++) {
    //   formData.append("file[]", this.files[i]);
    // }
    // formData.append("file[]", this.files[0]);
    //
    // this.http.post('http://localhost:8080/upload_angular', formData)
    //   .subscribe(res => {
    //     console.log(res);
    //     alert('Uploaded Successfully.');
    //   });
    for (let i = 0; i < this.files.length; i++){
      this.uploadService.upload(this.files[i], 'http://localhost:8080/upload_angular').subscribe(res => {
        //console.log(res);
      });
      formData.append("file[]", this.files[i]);
    }
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

  upload(){
    console.log('Upload');
    this.uploadService.upload(this.files[0], 'http://localhost:8080/upload_angular').
      subscribe(response => {
      if (response) {
        console.log('Succesful upload');
      }
      console.log('Unsuccesful upload')
      });
  }

}
