import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {FileUploadService} from "../service/file-upload.service";

@Component({
  selector: 'app-drop-zone',
  templateUrl: './drop-zone.component.html',
  styleUrls: ['./drop-zone.component.css']
})
export class DropZoneComponent implements OnInit {

  ngOnInit(): void {
  }

  files: File[] = [];

  constructor(
    private http: HttpClient,
    private fileUploadService: FileUploadService
  ) { }

  // uploadFileToActivity() {
  //   this.fileUploadService.postFile(this.files[0]).subscribe(data => {
  //     // do something, if upload success
  //   }, error => {
  //     console.log(error);
  //   });
  // }
    uploadFileToActivity() {

    }

  onSelect(event) {
    console.log(event);
    this.files.push(...event.addedFiles);

    const formData = new FormData();

    for (let i = 0; i < this.files.length; i++) {
      formData.append("file[]", this.files[i]);
    }

/*    this.http.post('http://localhost:8001/upload.php', formData)

      .subscribe(res => {

        console.log(res);

        alert('Uploaded Successfully.');

      })
*/
  }

  onRemove(event) {
    console.log(event);
    this.files.splice(this.files.indexOf(event), 1);
  }

}
