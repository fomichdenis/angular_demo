import {Component, Input, OnInit} from '@angular/core';
import {HttpClient, HttpEventType, HttpResponse} from "@angular/common/http";
import {FileUploadService} from "../service/file-upload.service";
import {Observable} from "rxjs";
import {forkJoin} from "rxjs";
import {concat} from "rxjs";
import {Paragraph} from "../paragraph";
import {HeadingsCorrection} from "../headings-correction";

@Component({
  selector: 'app-drop-zone',
  templateUrl: './drop-zone.component.html',
  styleUrls: ['./drop-zone.component.css']
})
export class DropZoneComponent implements OnInit {

  @Input() files: File[];
  fileReadyToDownload: boolean = false;
  proposedHeadings: Paragraph[][];
  unmatchedHeadings: Paragraph[];
  headingsToSend: HeadingsCorrection[] = [];

  ngOnInit(): void {
  }
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
    var t0 = performance.now()
    this.uploadService.upload(this.files, 'http://localhost:8080/upload_angular').
      subscribe(blob => {
        console.log(blob);
        //let test = blob[Symbol.iterator]();
        for (let item of blob[Symbol.iterator]()){
          if (item['matched'] == null) {
            if (!this.unmatchedHeadings){
              this.unmatchedHeadings = [item];
            }
            else {
              this.unmatchedHeadings.push(item);
            }
          }
          else{
            if (this.proposedHeadings){
              let flag = false;
              for (let headings of this.proposedHeadings){
                if (headings[0].headingName == item['headingName']){
                  headings.push(item);
                  flag = true;
                }
              }
              if (!flag) {
                this.proposedHeadings.push([item]);
              }
            }
            else{
              this.proposedHeadings = [[item]];
            }
          }
        }
        console.log(this.unmatchedHeadings);
        console.log(this.proposedHeadings);
        this.fileReadyToDownload = true;
        // this.files = [];
        // var b: any = blob;
        // b.lastModifiedDate = new Date();
        // b.name = "Res.docx";
        // this.files.push(<File>blob);
        // this.fileReadyToDownload = true;
        // var t1 = performance.now()
        // console.log("Call to upload and download took " + (t1 - t0) + " milliseconds.")
      });
  }
  download(){
    console.log(this.unmatchedHeadings);
    if (this.fileReadyToDownload && this.unmatchedHeadings.length == 0){
      // for (let headings of this.proposedHeadings){
      //   for (let heading of headings){
      //     this.headingsToSend.push(heading);
      //   }
      // }
      for (let i = 0; i < this.proposedHeadings.length; i++) {
        if (this.proposedHeadings[i].length != 0) {
          this.headingsToSend[i] = {headings: null, finalName: null};
          this.headingsToSend[i].headings = [];
          this.headingsToSend[i].finalName = this.proposedHeadings[i][0].finalName;
          for (let j = 0; j < this.proposedHeadings[i].length; j++) {
            this.headingsToSend[i].headings.push({
              headingName: this.proposedHeadings[i][j].headingName,
              fileName: this.proposedHeadings[i][j].fileName
            });
          }
        }
      }
      console.log(this.headingsToSend);
      this.http.post(`http://localhost:8080/combine_angular`, this.headingsToSend, {responseType: "blob"})
        .subscribe( blob => {
          var b: any = blob;
          b.lastModifiedDate = new Date();
          b.name = "Res.docx";
          const a = document.createElement('a')
          // const objectUrl = URL.createObjectURL(blob)
          const objectUrl = URL.createObjectURL(blob);
          a.href = objectUrl
          a.download = 'Res.docx';
          a.click();
          URL.revokeObjectURL(objectUrl);
        }
      );
    }
    // if (this.fileReadyToDownload){
    //   const a = document.createElement('a')
    //   // const objectUrl = URL.createObjectURL(blob)
    //   const objectUrl = URL.createObjectURL(this.files[0])
    //   a.href = objectUrl
    //   a.download = 'Res.docx';
    //   a.click();
    //   URL.revokeObjectURL(objectUrl);
    // }
  }
}
