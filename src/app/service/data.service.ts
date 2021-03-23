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
  uHeadingsSubject: BehaviorSubject<Paragraph[]>;
  pHeadingsSubject: BehaviorSubject<Paragraph[][]>;
  styleSubject: BehaviorSubject<boolean>;
  constructor() {
    this.uHeadingsSubject = new BehaviorSubject(this.unmatchedHeadings);
    this.pHeadingsSubject = new BehaviorSubject(this.proposedHeadings);
    this.styleSubject = new BehaviorSubject(this.style);
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
}
