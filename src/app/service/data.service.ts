import { Injectable } from '@angular/core';
import {Paragraph} from "../paragraph";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DataService {
  public proposedHeadings: Paragraph[][] = [];
  public unmatchedHeadings: Paragraph[] = [];
  public style: boolean = false;
  public files: File[] = [];
  uHeadingsSubject: BehaviorSubject<Paragraph[]>;
  pHeadingsSubject: BehaviorSubject<Paragraph[][]>;
  styleSubject: BehaviorSubject<boolean>;
  fileSubject: BehaviorSubject<File[]>;
  constructor() {
    this.uHeadingsSubject = new BehaviorSubject(this.unmatchedHeadings);
    this.pHeadingsSubject = new BehaviorSubject(this.proposedHeadings);
    this.styleSubject = new BehaviorSubject(this.style);
    this.fileSubject = new BehaviorSubject(this.files);
  }
  nextUHeadings(uHeadings: Paragraph[]){
    this.uHeadingsSubject.next(uHeadings);
  }
  nextPHeadings(pHeadings: Paragraph[][]){
    this.pHeadingsSubject.next(pHeadings);
  }
  nextStyle(style: boolean){
    this.styleSubject.next(style);
  }
  nextFile(files: File[]){
    this.fileSubject.next(files);
  }
}
