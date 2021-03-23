import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {HttpClient, HttpEventType, HttpResponse} from "@angular/common/http";
import {FileUploadService} from "../service/file-upload.service";
import {Observable, of, Subscribable, Subscription} from "rxjs";
import {forkJoin} from "rxjs";
import {concat} from "rxjs";
import {Paragraph} from "../paragraph";
import {HeadingsCorrection} from "../headings-correction";
import {DataService} from "../service/data.service";
import {Router, ActivatedRoute} from "@angular/router";

@Component({
  selector: 'app-drop-zone',
  templateUrl: './drop-zone.component.html',
  styleUrls: ['./drop-zone.component.css']
})
export class DropZoneComponent implements OnInit, OnDestroy {

  @Input() files: File[];
  @Input() mode: string = 'combine'; //combine or download
  @Input() fileReadyToDownload: boolean = false;
  proposedHeadings: Paragraph[][];
  unmatchedHeadings: Paragraph[];
  headingsToSend: HeadingsCorrection[] = [];
  readyToStyle: boolean = false;
  public subscriptionUnmatchedHeaders: Observable<Paragraph[]>;

  // title = 'File-Upload-Save';
  // selectedFiles: FileList;
  // currentFileUpload: File;
  // progress: { percentage: number } = { percentage: 0 };
  // selectedFile = null;
  // changeImage = false;

  constructor(
    private http: HttpClient,
    private uploadService: FileUploadService,
    private dataService: DataService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {
  }

  ngOnInit(): void {
    this.dataService.uHeadingsSubject.subscribe(u => {
      this.unmatchedHeadings = u;
    });
    this.dataService.pHeadingsSubject.subscribe(p => {
      this.proposedHeadings = p;
    });
    this.dataService.styleSubject.subscribe(s => {
      this.readyToStyle = s;
    });
    this.dataService.fileSubject.subscribe( f => {
      this.files = f;
    });
  }
  ngOnDestroy() {
    // this.unmatchedHeadersSubscription.unsubscribe();
    // this.matchedHeadersSubscription.unsubscribe();
  }
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

  deleteStyle() {
    this.http.post(`http://localhost:8080/delete_style_angular`, {})
      .subscribe( response => {
          this.readyToStyle = false;
          this.dataService.styleSubject.next(this.readyToStyle);
        }
      );
  }

  combineHeaders(){
    this.router.navigate(['/header_combine']);
  }
  backToTemp(){
    this.router.navigate(['/templater']);
  }
  upload(){
    //console.log('Upload');
    let requests = [];
    var t0 = performance.now();
    this.unmatchedHeadings = [];
    this.proposedHeadings = [];
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
        // this.unmatchedHeadingContainerService.changeMessage(this.unmatchedHeadings);
        // this.matchedHeadingContainerService.changeMessage(this.proposedHeadings);
        // this.unmatchedHeadingContainerService.currentMessage.subscribe(
        //   message => console.log(message.length)
        // );
        //this.dataService.unmatchedHeadings = this.unmatchedHeadings;
        //this.subscriptionUnmatchedHeaders = of(this.unmatchedHeadings);
        this.dataService.nextUHeadings(this.unmatchedHeadings);
        this.dataService.nextPHeadings(this.proposedHeadings);
        this.dataService.nextFile(this.files);
        //this.dataService.proposedHeadings = this.proposedHeadings;
        this.fileReadyToDownload = true;
        //this.router.navigate(['/header_combine']);
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
      // this.unmatchedHeadings = [];
      // this.proposedHeadings = [];
      // this.files = [];
      this.dataService.nextUHeadings(this.unmatchedHeadings);
      this.dataService.nextPHeadings(this.proposedHeadings);
      // this.router.navigate(['/templater']);
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
