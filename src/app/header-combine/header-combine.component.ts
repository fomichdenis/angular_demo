import { Component, OnInit } from '@angular/core';
import {Paragraph} from "../paragraph";
import {PreloadAllModules} from "@angular/router";
import {DataService} from "../service/data.service";

@Component({
  selector: 'app-header-combine',
  templateUrl: './header-combine.component.html',
  styleUrls: ['./header-combine.component.css']
})
export class HeaderCombineComponent implements OnInit {
  unmatchedHeadings: Paragraph[] = [];
  proposedHeadings: Paragraph[][] = [];
  constructor(
    private dataService: DataService
  ) { }

  ngOnInit(): void {
    this.proposedHeadings = this.dataService.proposedHeadings;
    this.unmatchedHeadings = this.dataService.unmatchedHeadings;
  }

}
