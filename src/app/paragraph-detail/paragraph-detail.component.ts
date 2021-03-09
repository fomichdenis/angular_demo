import {Component, Input, OnInit} from '@angular/core';
import {Paragraph} from "../paragraph";

@Component({
  selector: 'app-paragraph-detail',
  templateUrl: './paragraph-detail.component.html',
  styleUrls: ['./paragraph-detail.component.css']
})
export class ParagraphDetailComponent implements OnInit {
  @Input() paragraph: Paragraph;

  constructor() { }

  ngOnInit(): void {
  }

}
