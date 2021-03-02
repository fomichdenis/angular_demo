import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpEventType, HttpResponse} from "@angular/common/http";
import {FileUploadService} from "../service/file-upload.service";
import {Observable} from "rxjs";
import {forkJoin} from "rxjs";
import {concat, concatMap} from "rxjs";

@Component({
  selector: 'app-drop-zone',
  templateUrl: './drop-zone.component.html',
  styleUrls: ['./drop-zone.component.css']
})
export class DropZoneComponent implements OnInit {

  ngOnInit(): void {
  }

  files: File[] = [];
  fileReadyToDownload: boolean = false;
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

    // for (let i = 0; i < this.files.length; i++){
    //   this.uploadService.upload(this.files[i], 'http://localhost:8080/upload_angular')
    //     .subscribe(res => {
    //     //console.log(res);
    //     });
    //   formData.append("file[]", this.files[i]);
    // }
  }

  onRemove(event) {
    //console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
    this.fileReadyToDownload = false;
  }

  upload(){
    //console.log('Upload');
    let requests = [];
    //for (let i = 0; i < this.files.length; i++){
    for(let i = 0; i < this.files.length; i++) {
      requests.push(this.uploadService.upload(this.files[i], 'http://localhost:8080/upload_angular'));
        // .subscribe(res => {
        //   console.log(res);
        // });
    }
    // concat(requests).subscribe( res => {
    //   this.files = [];
    //   this.uploadService.merge().subscribe(blob => {
    //     var b: any = blob;
    //     b.lastModifiedDate = new Date();
    //     b.name = "Res.docx";
    //     this.files.push(<File>blob);
    //     this.fileReadyToDownload = true;
    //   });
    // });
    //concatMap()
    forkJoin(requests).subscribe( res => {
      this.files = [];
      this.uploadService.merge().subscribe(blob => {
        var b: any = blob;
        b.lastModifiedDate = new Date();
        b.name = "Res.docx";
        this.files.push(<File>blob);
        this.fileReadyToDownload = true;
      });
    });
  }
  download(){
    if (this.fileReadyToDownload){
      const a = document.createElement('a')
      // const objectUrl = URL.createObjectURL(blob)
      const objectUrl = URL.createObjectURL(this.files[0])
      a.href = objectUrl
      a.download = 'Res.docx';
      a.click();
      URL.revokeObjectURL(objectUrl);
    }
  }
}
