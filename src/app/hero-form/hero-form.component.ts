import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {RegistrationService} from "../service/registration.service";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {TempService} from "../service/temp.service";
import {ManagerControlService} from "../service/manager-control.service";
import {FileUploadService} from "../service/file-upload.service";
import { Subscription } from 'rxjs';
import {Paragraph} from "../paragraph";
import {DataService} from "../service/data.service";
import {DropZoneComponent} from "../drop-zone/drop-zone.component";

@Component({
  selector: 'app-hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.css']
})
export class HeroFormComponent implements OnInit, OnDestroy{
  private replytype: any;

  constructor(
      private tempService: TempService,
      private router: Router,
      private fileUploadService: FileUploadService,
      private http: HttpClient,
      private managerControlService: ManagerControlService,
      private dataService: DataService
  ) {}

  @ViewChild(DropZoneComponent)
  private dropZoneComponent: DropZoneComponent;

  templates = [];

  title = ['Title Page', 'Header 1', 'Header 2', 'Header 3', 'Header 4', 'Header 5'];

  interval = ['Interval', '1.0', '2.0', '3.0'];

  font = ['Font', 'Arial', 'Times_New_Roman'];

  fonsize = ['Font Size', '11', '12', '14'];

  fields = ['Fields', 'narrow', 'average', 'wide'];

  alignment = ['Alignment', 'RIGHT', 'LEFT', 'MIDDLE', 'WIDTH'];

  temp1 = ['Title page', 'Numeration', 'Footer', 'Header'];

  temp2 = ['Bold', 'Italic', 'Underline'];

  templateId = '';

  usernameToAdd = '';

  usernameToDelete = '';

  submitted = false;

  files: File[] = [];

  readyToStyle: boolean = false;


  ngOnInit(): void {
    this.getTemplates();
    this.dataService.styleSubject.subscribe(s => {
      this.readyToStyle = s;
    });
  }

  ngOnDestroy(): void {
    //this.styleSubscription.unsubscribe();
  }

  template = {
    name: '',
    title_type: '0',//нет в коде
    title_page: '0',//нет в коде
    header: '1',//нет в коде
    footer: '1', //нет в коде
    numeration: '1', //нет в коде

    title_alignment: 'RIGHT',
    title_name_font: 'Arial',
    title_name_font_size: '11',
    title_name_temp2: '',
    title_name_text_color: '#000000',
    title_name_text_highlight_color: '#000000',
    title_name_bold: '0',
    title_name_italic: '0',
    title_name_underline: '0', //нет в коде bold, italic, underline


    title_organization_font: 'Arial',
    title_organization_font_size: '11',
    title_organization_temp2: '',
    title_organization_text_color: '#000000',
    title_organization_text_highlight_color: '#000000',
    title_organization_bold: '0',
    title_organization_italic: '0',
    title_organization_underline: '0', //нет в коде bold, italic, underline

    title_description_font: 'Arial',
    title_description_font_size: '11',
    title_description_temp2: '',
    title_description_text_color: '#000000',
    title_description_text_highlight_color: '#000000',
    title_description_bold: '0',
    title_description_italic: '0',
    title_description_underline: '0', //нет в коде bold, italic, underline

    title_type_font: 'Arial',
    title_type_font_size: '11',
    title_type_temp2: '',
    title_type_text_color: '#000000',
    title_type_text_highlight_color: '#000000',
    title_type_alignment: 'LEFT',
    title_type_bold: '0',
    title_type_italic: '0',
    title_type_underline: '0', //нет в коде bold, italic, underline

    h1_font: 'Arial',
    h1_font_size: '11',
    h1_temp2: '',
    h1_text_color: '#000000',
    h1_text_highlight_color: '#000000',
    h1_alignment: 'LEFT',
    h1_bold: '0',
    h1_italic: '0',
    h1_underline: '0', //нет в коде bold, italic, underline

    h2_font: 'Arial',
    h2_font_size: '11',
    h2_temp2: '',
    h2_text_color: '#000000',
    h2_text_highlight_color: '#000000',
    h2_alignment: 'LEFT',
    h2_bold: '0',
    h2_italic: '0',
    h2_underline: '0', //нет в коде bold, italic, underline

    h3_font: 'Arial',
    h3_font_size: '11',
    h3_temp2: '',
    h3_text_color: '#000000',
    h3_text_highlight_color: '#000000',
    h3_alignment: 'LEFT',
    h3_bold: '0',
    h3_italic: '0',
    h3_underline: '0', //нет в коде bold, italic, underline

    h4_font: 'Arial',
    h4_font_size: '11',
    h4_temp2: '',
    h4_text_color: '#000000',
    h4_text_highlight_color: '#000000',
    h4_alignment: 'LEFT',
    h4_bold: '0',
    h4_italic: '0',
    h4_underline: '0', //нет в коде bold, italic, underline

    h5_font: 'Arial',
    h5_font_size: '11',
    h5_temp2: '',
    h5_text_color: '#000000',
    h5_text_highlight_color: '#000000',
    h5_alignment: 'LEFT',
    h5_bold: '0',
    h5_italic: '0',
    h5_underline: '0', //нет в коде bold, italic, underline

    table_font: 'Arial',
    table_font_size: '11',
    table_temp2: '',
    table_heading_cell_color: '#000000',
    table_heading_cell_text_color: '#000000',
    table_cell_border_color: '#000000',
    table_common_cell_color: '#000000',
    table_bold: '0', //нет в коде
    table_italic: '0', //нет в коде

    global_temp1: '',
    interval: '1.0',
    fields: 'average',
  };

  uploadStyle() {
    this.http.post(`http://localhost:8080/get_style_angular`, this.template)
      .subscribe( response => {
        this.readyToStyle = true;
        this.dataService.styleSubject.next(this.readyToStyle);
      }
    );
  }

  // deleteStyle() {
  //   this.http.post(`http://localhost:8080/delete_style_angular`, {})
  //     .subscribe( response => {
  //         this.readyToStyle = false;
  //         this.dataService.styleSubject.next(this.readyToStyle);
  //       }
  //     );
  // }

  download() {
    console.log('Download');
    this.fileUploadService.download('http://localhost:8080/download_angular', this.template)
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
    console.log(this.template);
    this.fileUploadService.checkNameUniqueness(this.template.name).subscribe( response => {
      if (response['Success'] == 'YES') {
        this.http.post(`http://localhost:8080/save_angular`, this.template).subscribe(response1 =>
          this.getTemplates()
        );
      }
      else{
        console.log(response);
      }
    });
  }

  getTemplate() {
    console.log('TemplateId ' + this.templateId);
    this.fileUploadService.getTemplate(this.templateId).subscribe(response => {
        // console.log(response['headers']);
        console.log(response);
        this.template.name = response['name'];

        this.template.h1_font = response['headers'][0]['font'];
        this.template.h1_font_size = response['headers'][0]['font_size'];
        this.template.h1_text_color = response['headers'][0]['text_color'];
        this.template.h1_text_highlight_color = response['headers'][0]['text_highlight_color'];
        this.template.h1_alignment = response['headers'][0]['alignment'];
        this.template.h1_bold = response['headers'][0]['bold'];
        this.template.h1_italic = response['headers'][0]['italic'];
        this.template.h1_underline = response['headers'][0]['underline'];


        this.template.h2_font = response['headers'][1]['font'];
        this.template.h2_font_size = response['headers'][1]['font_size'];
        this.template.h2_text_color = response['headers'][1]['text_color'];
        this.template.h2_text_highlight_color = response['headers'][1]['text_highlight_color'];
        this.template.h2_alignment = response['headers'][1]['alignment'];
        this.template.h2_bold = response['headers'][1]['bold'];
        this.template.h2_italic = response['headers'][1]['italic'];
        this.template.h2_underline = response['headers'][1]['underline'];

        this.template.h3_font = response['headers'][2]['font'];
        this.template.h3_font_size = response['headers'][2]['font_size'];
        this.template.h3_text_color = response['headers'][2]['text_color'];
        this.template.h3_text_highlight_color = response['headers'][2]['text_highlight_color'];
        this.template.h3_alignment = response['headers'][2]['alignment'];
        this.template.h3_bold = response['headers'][2]['bold'];
        this.template.h3_italic = response['headers'][2]['italic'];
        this.template.h3_underline = response['headers'][2]['underline'];

        this.template.h4_font = response['headers'][3]['font'];
        this.template.h4_font_size = response['headers'][3]['font_size'];
        this.template.h4_text_color = response['headers'][3]['text_color'];
        this.template.h4_text_highlight_color = response['headers'][3]['text_highlight_color'];
        this.template.h4_alignment = response['headers'][3]['alignment'];
        this.template.h4_bold = response['headers'][3]['bold'];
        this.template.h4_italic = response['headers'][3]['italic'];
        this.template.h4_underline = response['headers'][3]['underline'];

        this.template.h5_font = response['headers'][4]['font'];
        this.template.h5_font_size = response['headers'][4]['font_size'];
        this.template.h5_text_color = response['headers'][4]['text_color'];
        this.template.h5_text_highlight_color = response['headers'][4]['text_highlight_color'];
        this.template.h5_alignment = response['headers'][4]['alignment'];
        this.template.h5_bold = response['headers'][4]['bold'];
        this.template.h5_italic = response['headers'][4]['italic'];
        this.template.h5_underline = response['headers'][4]['underline'];

        this.template.title_alignment = response['title_alignment'];

        this.template.title_name_font = response['title_headers'][0]['font'];
        this.template.title_name_font_size = response['title_headers'][0]['font_size'];
        //this.template.name_temp2 = response['title_alignment'];
        this.template.title_name_text_color = response['title_headers'][0]['text_color'];
        this.template.title_name_text_highlight_color = response['title_headers'][0]['text_highlight_color'];

        this.template.title_name_bold = response['title_headers'][0]['bold'];
        this.template.title_name_italic = response['title_headers'][0]['italic'];
        this.template.title_name_underline = response['title_headers'][0]['underline'];

        this.template.title_organization_font = response['title_headers'][1]['font'];
        this.template.title_organization_font_size = response['title_headers'][1]['font_size'];
        //this.template.org_temp2 = response['title_alignment'];
        this.template.title_organization_text_color = response['title_headers'][1]['text_color'];
        this.template.title_organization_text_highlight_color = response['title_headers'][1]['text_highlight_color'];

        this.template.title_organization_bold = response['title_headers'][1]['bold'];
        this.template.title_organization_italic = response['title_headers'][1]['italic'];
        this.template.title_organization_underline = response['title_headers'][1]['underline'];

        this.template.title_description_font = response['title_headers'][2]['font'];
        this.template.title_description_font_size = response['title_headers'][2]['font_size'];
        //this.template.desc_temp2 = response['title_alignment'];
        this.template.title_description_text_color = response['title_headers'][2]['text_color'];
        this.template.title_description_text_highlight_color = response['title_headers'][2]['text_highlight_color'];

        this.template.title_description_bold = response['title_headers'][2]['bold'];
        this.template.title_description_italic = response['title_headers'][2]['italic'];
        this.template.title_description_underline = response['title_headers'][2]['underline'];

        this.template.title_type_font = response['title_headers'][3]['font'];
        this.template.title_type_font_size = response['title_headers'][3]['font_size'];
        //this.template.desc_temp2 = response['title_alignment'];
        this.template.title_type_text_color = response['title_headers'][3]['text_color'];
        this.template.title_type_text_highlight_color = response['title_headers'][3]['text_highlight_color'];

        this.template.title_type_bold = response['title_headers'][3]['bold'];
        this.template.title_type_italic = response['title_headers'][3]['italic'];
        this.template.title_type_underline = response['title_headers'][3]['underline'];

        this.template.title_type_alignment = response['title_type_alignment'];

        this.template.table_font = response['table']['table_font'];
        console.log(response['table']['table_font']);
        console.log(this.template.table_font);
        this.template.table_font= response['table']['table_font'];
        this.template.table_font_size = response['table']['table_font_size'];
        this.template.table_heading_cell_color = response['table']['table_heading_cell_color'];
        this.template.table_heading_cell_text_color = response['table']['table_heading_cell_text_color'];
        this.template.table_cell_border_color = response['table']['table_cell_border_color'];
        this.template.table_common_cell_color = response['table']['table_common_cell_color'];
        this.template.table_bold = response['table']['table_bold'];
        this.template.table_italic = response['table']['table_italic'];

        //this.template.global_temp1 = response['title_alignment'];
        this.template.interval = response['interval'];
        this.template.header = response['header'];
        this.template.fields = response['fields'];

        this.template.title_type = response['title_type'];//нет в коде
        this.template.title_page = response['title_page'];//нет в коде
        this.template.header = response['header'];//нет в коде
        this.template.footer = response['footer']; //нет в коде
        this.template.numeration = response['numeration']; //нет в коде

        console.log(this.template);
        //this.headers = response['headers'];
        //console.log(this.headers[0]);
      }
    );
  }

  getTemplates() {
    this.fileUploadService.getTemplates().subscribe(response => {
        console.log(response);
        this.templates = response;
      }
    );
    // this.fileUploadService.getTemplate(this.templateId, () => {
    //   this.router.navigate(['/temp']);
    // });
  }

  public show:boolean = false;
  public buttonName:any = 'Save as docx';
  public selectedType:any = 'opentype';
  onChange(event) {
    this.selectedType = event.target.value;
  }
  toggle() {
    this.show = !this.show;
    if(this.show)
      this.buttonName = "Input Name";
    else
      this.buttonName = "Save template as docx";
  }
  extractStyle() {
    if (this.dropZoneComponent.files.length > 0) {
      const formData: FormData = new FormData();
      formData.append('file', this.dropZoneComponent.files[0]);
      this.http.post('http://localhost:8080/extract_style_angular', formData, {
        responseType: 'json'
      }).subscribe(response => {
          console.log(response);
          this.template.name = response['name'];

          this.template.h1_font = response['headers'][0]['font'];
          this.template.h1_font_size = response['headers'][0]['font_size'];
          this.template.h1_text_color = response['headers'][0]['text_color'];
          this.template.h1_text_highlight_color = response['headers'][0]['text_highlight_color'];
          this.template.h1_alignment = response['headers'][0]['alignment'];
          this.template.h1_bold = response['headers'][0]['bold'];
          this.template.h1_italic = response['headers'][0]['italic'];
          this.template.h1_underline = response['headers'][0]['underline'];


          this.template.h2_font = response['headers'][1]['font'];
          this.template.h2_font_size = response['headers'][1]['font_size'];
          this.template.h2_text_color = response['headers'][1]['text_color'];
          this.template.h2_text_highlight_color = response['headers'][1]['text_highlight_color'];
          this.template.h2_alignment = response['headers'][1]['alignment'];
          this.template.h2_bold = response['headers'][1]['bold'];
          this.template.h2_italic = response['headers'][1]['italic'];
          this.template.h2_underline = response['headers'][1]['underline'];

          this.template.h3_font = response['headers'][2]['font'];
          this.template.h3_font_size = response['headers'][2]['font_size'];
          this.template.h3_text_color = response['headers'][2]['text_color'];
          this.template.h3_text_highlight_color = response['headers'][2]['text_highlight_color'];
          this.template.h3_alignment = response['headers'][2]['alignment'];
          this.template.h3_bold = response['headers'][2]['bold'];
          this.template.h3_italic = response['headers'][2]['italic'];
          this.template.h3_underline = response['headers'][2]['underline'];

          this.template.h4_font = response['headers'][3]['font'];
          this.template.h4_font_size = response['headers'][3]['font_size'];
          this.template.h4_text_color = response['headers'][3]['text_color'];
          this.template.h4_text_highlight_color = response['headers'][3]['text_highlight_color'];
          this.template.h4_alignment = response['headers'][3]['alignment'];
          this.template.h4_bold = response['headers'][3]['bold'];
          this.template.h4_italic = response['headers'][3]['italic'];
          this.template.h4_underline = response['headers'][3]['underline'];

          this.template.h5_font = response['headers'][4]['font'];
          this.template.h5_font_size = response['headers'][4]['font_size'];
          this.template.h5_text_color = response['headers'][4]['text_color'];
          this.template.h5_text_highlight_color = response['headers'][4]['text_highlight_color'];
          this.template.h5_alignment = response['headers'][4]['alignment'];
          this.template.h5_bold = response['headers'][4]['bold'];
          this.template.h5_italic = response['headers'][4]['italic'];
          this.template.h5_underline = response['headers'][4]['underline'];

          this.template.title_alignment = response['title_alignment'];

          this.template.title_name_font = response['title_headers'][0]['font'];
          this.template.title_name_font_size = response['title_headers'][0]['font_size'];
          //this.template.name_temp2 = response['title_alignment'];
          this.template.title_name_text_color = response['title_headers'][0]['text_color'];
          this.template.title_name_text_highlight_color = response['title_headers'][0]['text_highlight_color'];

          this.template.title_name_bold = response['title_headers'][0]['bold'];
          this.template.title_name_italic = response['title_headers'][0]['italic'];
          this.template.title_name_underline = response['title_headers'][0]['underline'];

          this.template.title_organization_font = response['title_headers'][1]['font'];
          this.template.title_organization_font_size = response['title_headers'][1]['font_size'];
          //this.template.org_temp2 = response['title_alignment'];
          this.template.title_organization_text_color = response['title_headers'][1]['text_color'];
          this.template.title_organization_text_highlight_color = response['title_headers'][1]['text_highlight_color'];

          this.template.title_organization_bold = response['title_headers'][1]['bold'];
          this.template.title_organization_italic = response['title_headers'][1]['italic'];
          this.template.title_organization_underline = response['title_headers'][1]['underline'];

          this.template.title_description_font = response['title_headers'][2]['font'];
          this.template.title_description_font_size = response['title_headers'][2]['font_size'];
          //this.template.desc_temp2 = response['title_alignment'];
          this.template.title_description_text_color = response['title_headers'][2]['text_color'];
          this.template.title_description_text_highlight_color = response['title_headers'][2]['text_highlight_color'];

          this.template.title_description_bold = response['title_headers'][2]['bold'];
          this.template.title_description_italic = response['title_headers'][2]['italic'];
          this.template.title_description_underline = response['title_headers'][2]['underline'];

          this.template.title_type_font = response['title_headers'][3]['font'];
          this.template.title_type_font_size = response['title_headers'][3]['font_size'];
          //this.template.desc_temp2 = response['title_alignment'];
          this.template.title_type_text_color = response['title_headers'][3]['text_color'];
          this.template.title_type_text_highlight_color = response['title_headers'][3]['text_highlight_color'];

          this.template.title_type_bold = response['title_headers'][3]['bold'];
          this.template.title_type_italic = response['title_headers'][3]['italic'];
          this.template.title_type_underline = response['title_headers'][3]['underline'];

          this.template.title_type_alignment = response['title_type_alignment'];

          this.template.table_font = response['table']['table_font'];
          console.log(response['table']['table_font']);
          console.log(this.template.table_font);
          this.template.table_font = response['table']['table_font'];
          this.template.table_font_size = response['table']['table_font_size'];
          this.template.table_heading_cell_color = response['table']['table_heading_cell_color'];
          this.template.table_heading_cell_text_color = response['table']['table_heading_cell_text_color'];
          this.template.table_cell_border_color = response['table']['table_cell_border_color'];
          this.template.table_common_cell_color = response['table']['table_common_cell_color'];
          this.template.table_bold = response['table']['table_bold'];
          this.template.table_italic = response['table']['table_italic'];

          //this.template.global_temp1 = response['title_alignment'];
          this.template.interval = response['interval'];
          this.template.header = response['header'];
          this.template.fields = response['fields'];

          this.template.title_type = '1';//нет в коде
          this.template.title_page = response['title_page'];//нет в коде
          this.template.header = response['header'];//нет в коде
          this.template.footer = response['footer']; //нет в коде
          this.template.numeration = response['numeration']; //нет в коде
          console.log(this.template);
        }
      );
    }
  }
}
