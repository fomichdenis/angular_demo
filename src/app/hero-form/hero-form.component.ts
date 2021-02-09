import { Component } from '@angular/core';
import {RegistrationService} from "../service/registration.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {TempService} from "../service/temp.service";
import {DownloadService} from "../service/download.service";

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent{

  constructor(
      private tempService: TempService,
      private router: Router,
      private downloadService: DownloadService
  ) {}

  title = ['Title Page', 'Header 1', 'Header 2', 'Header 3', 'Header 4', 'Header 5'];

  interval = ['Interval', '1.0', '2.0', '3.0'];

  font = ['Font', 'Arial', 'Times new Roman'];

  fonsize = ['Font Size', '11', '12', '14'];

  fields = ['Fields', 'narrow', 'average', 'wide'];

  alignment = ['Alignment', 'right', 'left', 'middle', 'width'];

  temp1 = ['Title page', 'Numeration', 'Footer', 'Header'];

  temp2 = ['Bold', 'Italic', 'Underline'];



  submitted = false;

  onSubmit() {
    console.log('Submit');
    this.downloadService.download('http://localhost:8080/download_angular')
      .subscribe(blob => {
        const a = document.createElement('a')
        const objectUrl = URL.createObjectURL(blob)
        a.href = objectUrl
        a.download = 'doc.docx';
        a.click();
        URL.revokeObjectURL(objectUrl);
      });
    // this.tempService.saveTemplate(this.title, this.interval, this.font, this.fonsize, this.fields,
    //   this.alignment, this.temp1, this.temp2, () => {
    //   this.router.navigate(['/temp']);
    // });
    this.submitted = true;
  }

}
