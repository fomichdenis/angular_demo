import { Component } from '@angular/core';
import {RegistrationService} from "../service/registration.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {TempService} from "../service/temp.service";
import {ManagerControlService} from "../service/manager-control.service";
import {FileUploadService} from "../service/file-upload.service";

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent {

  constructor(
      private tempService: TempService,
      private router: Router,
      private fileUploadService: FileUploadService,
      private http: HttpClient,
      private managerControlService: ManagerControlService
  ) {}

  title = ['Title Page', 'Header 1', 'Header 2', 'Header 3', 'Header 4', 'Header 5'];

  interval = ['Interval', '1.0', '2.0', '3.0'];

  font = ['Font', 'Arial', 'Times new Roman'];

  fonsize = ['Font Size', '11', '12', '14'];

  fields = ['Fields', 'narrow', 'average', 'wide'];

  alignment = ['Alignment', 'right', 'left', 'middle', 'width'];

  temp1 = ['Title page', 'Numeration', 'Footer', 'Header'];

  temp2 = ['Bold', 'Italic', 'Underline'];

  templateId = '';

  usernameToAdd = '';

  usernameToDelete = '';

  submitted = false;

  template = {
    title_alignment: '',
    name_font: '',
    name_fontsize: '',
    name_temp2: '',
    name_colour: '',
    name_highlight_colour: '',
    org_font: '',
    org_fontsize: '',
    org_temp2: '',
    org_colour: '',
    org_highlight_colour: '',
    desc_font: '',
    desc_fontsize: '',
    desc_temp2: '',
    desc_colour: '',
    desc_highlight_colour: '',
    type_font: '',
    type_fontsize: '',
    type_temp2: '',
    type_colour: '',
    type_highlight_colour: '',
    type_alignment: '',
    h1_font: '',
    h1_fontsize: '',
    h1_temp2: '',
    h1_colour: '',
    h1_highlight_colour: '',
    h1_alignment: '',
    h2_font: '',
    h2_fontsize: '',
    h2_temp2: '',
    h2_colour: '',
    h2_highlight_colour: '',
    h2_alignment: '',
    h3_font: '',
    h3_fontsize: '',
    h3_temp2: '',
    h3_colour: '',
    h3_highlight_colour: '',
    h3_alignment: '',
    h4_font: '',
    h4_fontsize: '',
    h4_temp2: '',
    h4_colour: '',
    h4_highlight_colour: '',
    h4_alignment: '',
    h5_font: '',
    h5_fontsize: '',
    h5_temp2: '',
    h5_colour: '',
    h5_highlight_colour: '',
    h5_alignment: '',
    table_font: '',
    table_fontsize: '',
    table_temp2: '',
    table_Heading_cell_colour: '',
    table_Heading_cell_text_colour: '',
    table_Cell_border_colour: '',
    table_Common_cell_colour: '',
    global_temp1: '',
    global_interval: '',
    global_head: '',
    global_field: '',
  };

  download() {
    console.log('Download');
    this.fileUploadService.download('http://localhost:8080/download_angular')
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

  onSubmit() {
    console.log('Submit')
    this.tempService.saveTemplate(this.title, this.interval, this.font, this.fonsize, this.fields,
      this.alignment, this.temp1, this.temp2, () => {
        this.router.navigate(['/temp']);
      });
  }

  getTemplate() {
    console.log('TemplateId ' + this.templateId);
    this.fileUploadService.getTemplate('http://localhost:8080/get_template_angular', this.templateId, () => {
      this.router.navigate(['/temp']);
    });
  }

  getTemplates() {
    this.fileUploadService.getTemplate('http://localhost:8080/get_templates_angular', this.templateId, () => {
      this.router.navigate(['/temp']);
    });
  }

  getGroupUsers(){
    if (sessionStorage.getItem('manager')) {
      this.managerControlService.getGroupUsers('http://localhost:8080/get_department_users_angular', () => {
        this.router.navigate(['/temp']);
      });
    }
  }


  addUserToGroup(){
    if (sessionStorage.getItem('manager')) {
      this.managerControlService.addUserToGroup('http://localhost:8080/add_user_to_department_angular', this.usernameToAdd, () => {
        this.router.navigate(['/temp']);
      });
    }
  }

  deleteUserFromGroup(){
    if (sessionStorage.getItem('manager')) {
      this.managerControlService.deleteUserFromGroup('http://localhost:8080/delete_user_from_department_angular', this.usernameToDelete, () => {
        this.router.navigate(['/temp']);
      });
    }
  }
}
